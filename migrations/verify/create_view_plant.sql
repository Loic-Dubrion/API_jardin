-- Verify connectedGarden:create_view_plant on pg

BEGIN;

SELECT table_name
FROM information_schema.views
WHERE table_schema = 'public' AND table_name = 'plant_details';

ROLLBACK;
