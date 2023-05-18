-- Revert connectedGarden:post_functions_user from pg

BEGIN;

DROP FUNCTION IF EXISTS
  "insert_new_plot",
  "insert_new_culture";

COMMIT;
