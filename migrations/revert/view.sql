-- Revert connectedGarden:view from pg

BEGIN;

DROP VIEW "plants_details";

COMMIT;
