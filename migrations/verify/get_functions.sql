-- Verify connectedGarden:get_functions on pg

BEGIN;

SELECT * FROM "get_user_details"(1) WHERE FALSE;
SELECT * FROM "get_production_by_user"(1, TRUE, 2);
SELECT * FROM "get_production_by_user"(1, FALSE);
SELECT * FROM "get_plant_detail"(2);

ROLLBACK;
