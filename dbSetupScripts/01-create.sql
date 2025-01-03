CREATE TYPE "PRODUCT_CATEGORY" AS ENUM (
    'sery',
    'jogurty',
    'twarogi',
    'mleko',
    'masła',
    'inne',
    'śmietany'
);

CREATE TYPE "ORDER_STATUS" AS ENUM (
    'completed',
    'returned',
    'ready to go',
    'awaiting',
    'awaiting delivery',
    'ready to ship'
);

CREATE TYPE "DELIVERY_STATUS" AS ENUM (
    'packing',
    'ready to ship',
    'en route',
    'delivered'
);

CREATE TYPE "PAYMENT_METHOD" AS ENUM (
    'Blik',
    'Visa',
    'MasterCard',
    'Amex',
    'Wire transfer'
);

CREATE TYPE Address AS (
    street VARCHAR,
    building_num VARCHAR,
    zip_code VARCHAR,
    city VARCHAR
);

CREATE TABLE "Product" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "price" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "category" "PRODUCT_CATEGORY" NOT NULL,
    "created_at" DATE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "Depot" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "created_at" DATE,
    "updated_at" DATE,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "ProductStock" (
    "id" SERIAL PRIMARY KEY,
    -- Optional: If you want a separate identifier for each row
    "fk_product_id" INTEGER NOT NULL,
    "fk_depot_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL CHECK (quantity >= 0),
    -- Non-negative quantity
    "updated_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE ("fk_product_id", "fk_depot_id"),
    FOREIGN KEY ("fk_product_id") REFERENCES "Product" ("id") ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY ("fk_depot_id") REFERENCES "Depot" ("id") ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE "Order" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "created_at" DATE NOT NULL,
    "address" ADDRESS NOT NULL,
    "loyaltyPointsGained" INTEGER,
    "freeDelivery" BOOLEAN NOT NULL,
    "status" "ORDER_STATUS" NOT NULL,
    "price" REAL NOT NULL,
    "fk_client_id" INTEGER NOT NULL,
    "fk_employee_id" INTEGER,
    "contact_phone_num" VARCHAR(255),
    "payment_method" "PAYMENT_METHOD",
    PRIMARY KEY ("id")
);

CREATE TABLE "OrderProducts" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "fk_product_id" INTEGER NOT NULL,
    "fk_containing_order_id" INTEGER NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "Client" (
    "fk_system_user_id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "email" VARCHAR(255) NOT NULL,
    "address" ADDRESS,
    "fk_loyalty_settings_id" INTEGER,
    "fk_loyalty_stats_id" INTEGER,
    "fk_cart_id" INTEGER,
    PRIMARY KEY ("fk_system_user_id")
);

CREATE TABLE "SystemUser" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phone_num" VARCHAR(255),
    PRIMARY KEY ("id")
);

CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "name" VARCHAR(255),
    "surname" VARCHAR(255),
    PRIMARY KEY ("id")
);

CREATE TABLE "Discount" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "percentage" INTEGER,
    "value" REAL,
    PRIMARY KEY ("id")
);

CREATE TABLE "ProductDiscount" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "fk_discount_id" INTEGER NOT NULL,
    "fk_product_id" INTEGER NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "Delivery" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "delivery_status" "DELIVERY_STATUS" NOT NULL,
    "delivery_date" DATE,
    "fk_delivered_order_id" INTEGER NOT NULL,
    "fk_delivery_employee_id" INTEGER,
    PRIMARY KEY ("id")
);

CREATE TABLE "LoyaltyProgramSettings" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "fk_client_id" INTEGER NOT NULL,
    "is_greedy" BOOLEAN,
    "point_threshold" INTEGER,
    "free_delivery" BOOLEAN,
    "is_active" BOOLEAN NOT NULL DEFAULT True,
    PRIMARY KEY ("id")
);

CREATE TABLE "LoyaltyProgramStats" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "current_pts" INTEGER,
    "total_pts" INTEGER,
    "money_saved" REAL,
    "total_spent" REAL,
    PRIMARY KEY ("id")
);

CREATE TABLE "Cart" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "created_at" DATE,
    PRIMARY KEY ("id")
);

CREATE TABLE "CartProducts" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "fk_product_id" INTEGER NOT NULL,
    "fk_cart_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY ("id")
);

CREATE TABLE "Complaint" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "reason" VARCHAR(1000) NOT NULL,
    "created_at" DATE,
    "fk_order_id" INTEGER NOT NULL,
    "fk_return_id" INTEGER NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "Return" (
    "id" INTEGER NOT NULL UNIQUE GENERATED BY DEFAULT AS IDENTITY,
    "pickup_address" ADDRESS NOT NULL,
    "pickup_date" DATE NOT NULL,
    "fk_pickup_employee_id" INTEGER NOT NULL,
    PRIMARY KEY ("id")
);

ALTER TABLE
    "OrderProducts"
ADD
    FOREIGN KEY ("fk_product_id") REFERENCES "Product" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Client"
ADD
    FOREIGN KEY ("fk_system_user_id") REFERENCES "SystemUser" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Order"
ADD
    FOREIGN KEY ("fk_client_id") REFERENCES "Client" ("fk_system_user_id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "ProductDiscount"
ADD
    FOREIGN KEY ("fk_discount_id") REFERENCES "Product" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Order"
ADD
    FOREIGN KEY ("fk_employee_id") REFERENCES "Employee" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Delivery"
ADD
    FOREIGN KEY ("fk_delivered_order_id") REFERENCES "Order" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Delivery"
ADD
    FOREIGN KEY ("fk_delivery_employee_id") REFERENCES "Employee" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Client"
ADD
    FOREIGN KEY ("fk_loyalty_settings_id") REFERENCES "LoyaltyProgramSettings" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Client"
ADD
    FOREIGN KEY ("fk_loyalty_stats_id") REFERENCES "LoyaltyProgramStats" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Client"
ADD
    FOREIGN KEY ("fk_cart_id") REFERENCES "Cart" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "CartProducts"
ADD
    FOREIGN KEY ("fk_cart_id") REFERENCES "Cart" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "CartProducts"
ADD
    FOREIGN KEY ("fk_product_id") REFERENCES "Product" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Complaint"
ADD
    FOREIGN KEY ("fk_order_id") REFERENCES "Order" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Complaint"
ADD
    FOREIGN KEY ("fk_return_id") REFERENCES "Return" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "ProductDiscount"
ADD
    FOREIGN KEY ("fk_product_id") REFERENCES "Discount" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "OrderProducts"
ADD
    FOREIGN KEY ("fk_containing_order_id") REFERENCES "Order" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Employee"
ADD
    FOREIGN KEY ("id") REFERENCES "SystemUser" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE
    "Return"
ADD
    FOREIGN KEY ("fk_pickup_employee_id") REFERENCES "Employee" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;