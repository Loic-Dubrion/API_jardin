-- Revert connectedGarden:delete_functions from pg

BEGIN;

DROP FUNCTION IF EXISTS "delete_category",
  "delete_alliance",
  "delete_family",
  "delete_user",
  "delete_plot",
  "delete_plant",
  "delete_culture";

COMMIT;
