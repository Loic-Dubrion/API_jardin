-- Deploy connectedGarden:create to pg

BEGIN;

CREATE TABLE "category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "alliance" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "alliance" INT[] NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "family" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "id_alliance" INTEGER REFERENCES "alliance"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "role" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "username" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "id_role" INTEGER REFERENCES "role" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "plot" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT UNIQUE,
    "availability" BOOLEAN NOT NULL,
    "id_user" INTEGER REFERENCES "user" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "plant" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "specification" TEXT[] DEFAULT NULL,
    "culture_advice" TEXT[] DEFAULT NULL,
    "id_family" INTEGER REFERENCES "family" ("id"),
    "id_category" INTEGER REFERENCES "category"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "culture" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "sowing" TIMESTAMPTZ DEFAULT NULL,
    "planting" TIMESTAMPTZ DEFAULT NULL,
    "harvesting" TIMESTAMPTZ DEFAULT NULL,
    "id_plant" INTEGER REFERENCES "plant" ("id"),
    "id_plot" INTEGER REFERENCES "plot" ("id"),
    "comment" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);


COMMIT;
