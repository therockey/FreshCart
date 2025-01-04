-- Step 1: Create a SystemUser
INSERT INTO
    "SystemUser" ("login", "password", "phone_num")
VALUES
    ('user123', 'securepassword123', '123-456-7890');

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
        'esadas',
        NULL
    );

-- Step 3: Create a Cart
INSERT INTO
    "Cart" ("created_at")
VALUES
    (CURRENT_DATE);

-- Update Client's fk_cart_id
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
        200,
        'Limitowana wersja Old Rotterdam, dojrzewająca przez 100 tygodni. Dzięki wzmocnionemu aromatowi oraz wyjątkowo kruchej konsystencji podbija serca wielbicieli sera i wina, a także jest niezastąpionym elementem prawdziwej deski serów.',
        'sery',
        CURRENT_DATE,
        'Ser Old Rotterdam 100 tygodni - prezentowy'
    ),
    (
        3.29,
        950,
        'Mleko UHT, pozyskiwane na najczystszych ekologicznie terenach Polski, o najwyższej wartości odżywczej i biologicznej, jest nie tylko głównym źródłem wapnia w diecie, ale również dostarcza pełnowartościowego i łatwostrawnego białka.',
        'mleko',
        CURRENT_DATE,
        'Mleko UHT 0,5% tł. 1L'
    ),
    (
        12.99,
        1000,
        'Wypasiony twaróg sernikowy klasyczny to produkt w pełni naturalny, bez konserwantów, barwników i aromatów. Nie wymaga  mielenia.',
        'twarogi',
        CURRENT_DATE,
        'Twaróg Sernikowy Klasyczny 1kg'
    );

-- Add Products to the Cart
INSERT INTO
    "CartProducts" ("fk_product_id", "fk_cart_id", "quantity")
VALUES
    (1, 1, 3),
    (2, 1, 2),
    (3, 1, 1);

-- Step 5: Create Loyalty Program Settings
INSERT INTO
    "LoyaltyProgramSettings" (
        "is_greedy",
        "point_threshold",
        "free_delivery",
        "is_active"
    )
VALUES
    (
        false,
        -- Not greedy
        100,
        -- Points threshold for benefits
        true,
        -- Free delivery eligible
        true -- Loyalty program is active
    );

-- Step 6: Create Loyalty Program Stats
INSERT INTO
    "LoyaltyProgramStats" (
        "current_pts",
        "total_pts",
        "money_saved",
        "total_spent"
    )
VALUES
    (
        50,
        -- Current points
        150,
        -- Total points earned
        25.50,
        -- Money saved so far
        500.00 -- Total money spent
    );

-- Link Loyalty Program Settings and Stats to Client
UPDATE
    "Client"
SET
    "fk_loyalty_settings_id" = 1,
    "fk_loyalty_stats_id" = 1
WHERE
    "fk_system_user_id" = 1;

INSERT INTO
    "Order" (
        "created_at",
        "address",
        "loyaltyPointsGained",
        "freeDelivery",
        "status",
        "price",
        "fk_client_id",
        "contact_phone_num",
        "payment_method"
    )
VALUES
    (
        '2025-01-02',
        'esadas',
        10,
        TRUE,
        'completed',
        21.98,
        1,
        '987-654-3210',
        'Visa'
    );

INSERT INTO
    "Order" (
        "created_at",
        "address",
        "loyaltyPointsGained",
        "freeDelivery",
        "status",
        "price",
        "fk_client_id",
        "contact_phone_num",
        "payment_method"
    )
VALUES
    (
        '2025-01-02',
        'esadas',
        10,
        TRUE,
        'completed',
        21.98,
        1,
        '987-654-3210',
        'Visa'
    );

INSERT INTO
    "Order" (
        "created_at",
        "address",
        "loyaltyPointsGained",
        "freeDelivery",
        "status",
        "price",
        "fk_client_id",
        "contact_phone_num",
        "payment_method"
    )
VALUES
    (
        '2025-01-02',
        'esadas',
        10,
        TRUE,
        'completed',
        21.98,
        1,
        '987-654-3210',
        'Visa'
    );

INSERT INTO
    "Order" (
        "created_at",
        "address",
        "loyaltyPointsGained",
        "freeDelivery",
        "status",
        "price",
        "fk_client_id",
        "contact_phone_num",
        "payment_method"
    )
VALUES
    (
        '2025-01-02',
        'esadas',
        10,
        TRUE,
        'completed',
        21.98,
        1,
        '987-654-3210',
        'Visa'
    );