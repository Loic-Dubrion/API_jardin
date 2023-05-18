-- Verify connectedGarden:put_functions on pg

BEGIN;

DO $$
DECLARE
    test_user JSON := '{"username": "test", "password": "newpassword", "id_role": 2}';
    test_category JSON := '{"name": "test"}';
    test_family JSON := '{"name": "Test Family", "id_alliance": 1}';
    test_role JSON := '{"name": "Test Role"}';
    test_culture JSON := '{"sowing": "2023-05-18T00:00:00Z", "planting": "2023-06-01T00:00:00Z", "harvesting": "2023-09-01T00:00:00Z", "id_plant": 1, "id_plot": 1, "comment": "Test comment"}';
    test_plot JSON := '{"name": "Test Plot", "availability": true, "id_user": 1}';
    test_plant JSON := '{"name": "Test Plant", "specification": ["Test Specification"], "culture_advice": ["Test Advice"], "id_family": 1, "id_category": 1}';

    result_user RECORD;
    result_category RECORD;
    result_alliance RECORD;
    result_family RECORD;
    result_role RECORD;
    result_culture RECORD;
    result_plot RECORD;
    result_plant RECORD;
BEGIN
    SELECT * INTO result_user FROM update_user(test_user, 1);
    IF result_user.username <> 'test' THEN
        RAISE 'Verification failed for update_user: Unexpected username %', result_user.username;
    END IF;

    SELECT * INTO result_category FROM update_category(test_category, 1);
    IF result_category.name <> 'test' THEN
        RAISE 'Verification failed for update_category: Unexpected name %', result_category.name;
    END IF;

    SELECT * INTO result_family FROM update_family(test_family, 1);
    IF result_family.name <> 'Test Family' THEN
        RAISE 'Verification failed for update_family: Unexpected name %', result_family.name;
    END IF;

    SELECT * INTO result_culture FROM update_culture(test_culture, 1);
    IF result_culture.comment <> 'Test comment' THEN
        RAISE 'Verification failed for update_culture: Unexpected comment %', result_culture.comment;
    END IF;

    SELECT * INTO result_plot FROM update_plot(test_plot, 1);
    IF result_plot.name <> 'Test Plot' THEN
        RAISE 'Verification failed for update_plot: Unexpected name %', result_plot.name;
    END IF;

    SELECT * INTO result_plant FROM update_plant(1, test_plant);
    IF result_plant.name <> 'Test Plant' THEN
        RAISE 'Verification failed for update_plot: Unexpected name %', result_plot.name;
    END IF;
  END $$;

ROLLBACK;
