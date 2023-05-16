-- Verify connectedGarden:post_functions_plant on pg

BEGIN;

-- Test the function with dummy data
DO $$
DECLARE
    test_family JSON := '{"name": "Test Family"}';
    result RECORD;
BEGIN
    SELECT * INTO result FROM insert_new_family(test_family);
    IF result.name <> 'Test Family' THEN
        RAISE 'Verification failed: Unexpected name %', result.name;
    END IF;
END $$;

DO $$
DECLARE
    test_category JSON := '{"name": "Test category"}';
    result RECORD;
BEGIN
    SELECT * INTO result FROM insert_new_category(test_category);
    IF result.name <> 'Test category' THEN
        RAISE 'Verification failed: Unexpected name %', result.name;
    END IF;
END $$;

DO $$
DECLARE
    test_plant JSON := '{
      "name": "Test plant",
      "specification": ["Specification 1", "Specification 2"],
      "culture_advice": ["Advice 1", "Advice 2"],
      "id_family": 1,
      "id_category": 1}';
    result RECORD;
BEGIN
    SELECT * INTO result FROM insert_new_plant(test_plant);
    IF result.name <> 'Test plant' THEN
        RAISE 'Verification failed: Unexpected name %', result.name;
    END IF;
END $$;

DO $$
DECLARE
    test_alliance JSON := '{"alliance": [1,2,3]}';
    result RECORD;
BEGIN
    SELECT * INTO result FROM insert_new_alliance(test_alliance);
    IF result.alliance <> ARRAY[1,2,3] THEN
        RAISE 'Verification failed: Unexpected alliance %', result.alliance;
    END IF;
END $$;

ROLLBACK;
