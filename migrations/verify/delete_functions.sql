-- Verify connectedGarden:delete_functions on pg

BEGIN;

INSERT INTO category(name) VALUES ('Test Category');
DO $$
DECLARE
  "test_id" INTEGER;
BEGIN
  SELECT "id" INTO "test_id" FROM "category" WHERE name = 'Test Category';
  PERFORM "delete_category"("test_id");
  IF EXISTS (SELECT 1 FROM "category" WHERE "id" = "test_id") THEN
    RAISE 'delete_category verification failed: record was not deleted';
  END IF;
END $$;

ROLLBACK;
