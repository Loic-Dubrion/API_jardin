-- Deploy connectedGarden:delete_functions to pg

BEGIN;

CREATE OR REPLACE FUNCTION "delete_category"(_id INT)
RETURNS VOID AS $$
    DELETE FROM "category" WHERE "id" = _id;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION "delete_alliance"(_id INT)
RETURNS VOID AS $$
    DELETE FROM "alliance" WHERE "id" = _id;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION "delete_family"(_id INT)
RETURNS VOID AS $$
    DELETE FROM "family" WHERE "id" = _id;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION "delete_user"(_id INT)
RETURNS VOID AS $$
    DELETE FROM "user" WHERE "id" = _id;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION "delete_plot"(_id INT)
RETURNS VOID AS $$
    DELETE FROM "plot" WHERE "id" = _id;
$$ LANGUAGE sql;

CREATE OR REPLACE FUNCTION "delete_plant"(_id INT)
RETURNS VOID AS $$
    DELETE FROM "plant" WHERE "id" = _id;
$$ LANGUAGE sql;

-- Delete from "culture"
CREATE OR REPLACE FUNCTION "delete_culture"(_id INT)
RETURNS VOID AS $$
    DELETE FROM "culture" WHERE "id" = _id;
$$ LANGUAGE sql;

COMMIT;
