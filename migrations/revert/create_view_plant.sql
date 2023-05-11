-- Revert connectedGarden:create_view_plant from pg

BEGIN;

DROP VIEW "plant_details";

COMMIT;
