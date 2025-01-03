-- lets add seeding sql script in here
-- Step 1: Create a SystemUser
INSERT INTO
    "SystemUser" ("login", "password", "phone_num")
VALUES
    ('user123', 'securepassword123', '123-456-7890');

-- Assuming the retrieved ID is 1 for demonstration purposes
-- Step 2: Create a Client linked to the SystemUser
INSERT INTO
    "Client" (
        "fk_system_user_id",
        "email",
        "address",
        "fk_cart_id"
    )
VALUES
    (
        1,
        'user123@example.com',
        ROW('Main St', '123', '12345', 'Sample City') :: ADDRESS,
        NULL
    );

INSERT INTO
    "Cart" ("created_at")
VALUES
    (CURRENT_DATE);

-- Assuming the Cart ID is 1 for demonstration purposes
-- Update Client's cart_id
UPDATE
    "Client"
SET
    "fk_cart_id" = 1
WHERE
    "fk_system_user_id" = 1;

-- Step 4: Create Products
INSERT INTO
    "Product" (
        "price",
        "weight",
        "description",
        "category",
        "created_at",
        "name"
    )
VALUES
    (
        10.99,
        1.5,
        'Delicious cheese',
        'sery',
        CURRENT_DATE,
        'Cheddar Cheese'
    ),
    (
        5.49,
        0.5,
        'Fresh yogurt',
        'jogurty',
        CURRENT_DATE,
        'Strawberry Yogurt'
    ),
    (
        15.99,
        2.0,
        'Creamy butter',
        'masła',
        CURRENT_DATE,
        'Premium Butter'
    );

-- Assuming Product IDs are 1, 2, and 3 for demonstration purposes
-- Step 5: Add Products to the Cart with Quantities
INSERT INTO
    "CartProducts" ("fk_product_id", "fk_cart_id", "quantity")
VALUES
    (1, 1, 3),
    -- 3 units of Cheddar Cheese
    (2, 1, 2),
    -- 2 units of Strawberry Yogurt
    (3, 1, 1);

-- 1 unit of Premium Butter