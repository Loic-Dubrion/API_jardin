-- Revert connectedGarden:post_functions_plant from pg

BEGIN;

DROP FUNCTION IF EXISTS
  "insert_new_plant",
  "insert_new_family",
  "insert_new_category",
  "insert_new_alliance";

COMMIT;
