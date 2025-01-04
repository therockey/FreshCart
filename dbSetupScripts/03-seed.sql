-- lets add seeding sql script in here
-- specjalnie dla ciebie
-- pozdrawiam serdecznie - poziomk3
INSERT INTO "Depot" ("created_at", "updated_at", "name", "address")
VALUES
    (CURRENT_DATE, CURRENT_DATE, 'Wrocław 1', 'Main St 123, 12345 Sample City'),
    (CURRENT_DATE, CURRENT_DATE, 'Wrocław 2', 'Main St 456, 12345 Sample City'),
    (CURRENT_DATE, CURRENT_DATE, 'Wrocław 3', 'Main St 789, 12345 Sample City');

INSERT INTO "ProductStock" ("fk_product_id", "fk_depot_id", "quantity")
VALUES
    (1, 1, 100),
    (1, 2, 200),
    (1, 3, 300),
    (2, 1, 400),
    (2, 2, 500),
    (2, 3, 600),
    (3, 1, 700),
    (3, 2, 800),
    (3, 3, 900);