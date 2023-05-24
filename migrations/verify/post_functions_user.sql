-- Verify connectedGarden:post_functions_user on pg

BEGIN;

-- Test the function insert_new_user with dummy data
DO $$
DECLARE
    "test_user" JSON := '{"username": "Chuck Berry", "email": "johny@begood.com", "password": "1234", "id_role": 2}';
    result RECORD;
BEGIN
    SELECT * INTO result FROM "insert_new_user"("test_user");
    IF result.username <> 'Chuck Berry' THEN
        RAISE 'Verification failed for insert_new_user: Unexpected username %', result.username;
    END IF;
END $$;

-- Test the function insert_new_plot with dummy data
DO $$
DECLARE
    "userId" INT := 2;
    "test_plot" JSON := '{"name": "My Test Plot", "availability": true}';
    result RECORD;
BEGIN
    SELECT * INTO result FROM "insert_new_plot"("userId", "test_plot");
    IF result.name <> 'My Test Plot' THEN
        RAISE 'Verification failed for insert_new_plot: Unexpected name %', result.name;
    END IF;
END $$;

-- Test the function insert_new_culture with dummy data
DO $$
DECLARE
    "plotId" INT := 2;
    "test_culture" JSON := '{
      "sowing": "2023-06-01T00:00:00Z",
      "planting": "2023-07-01T00:00:00Z",
      "id_plant": 1,
      "id_plot": 1,
      "comment": "Test Culture"}';
    result RECORD;
BEGIN
    SELECT * INTO result FROM "insert_new_culture"("plotId", "test_culture");
    IF result.comment <> 'Test Culture' THEN
        RAISE 'Verification failed for insert_new_culture: Unexpected comment %', result.comment;
    END IF;
END $$;

ROLLBACK;
