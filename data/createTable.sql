BEGIN;

DROP TABLE IF EXISTS 
  "diseases",
  "pests",
  "categories",
  "families",
  "soils",
  "exposures",
  "vegetables",
  "varieties",
  "plots",
  "cultures",
  "users",
  "roles",
  "alliance",
  "misalliance",
  "alliance_has_vegetables",
  "misalliance_has_vegetables",
  "disease_has_vegetables",
  "pest_has_vegetables";

CREATE TABLE diseases (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "description" TEXT,
  "prevention" TEXT,
  "treatment" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE pests (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50),
  "description" TEXT,
  "prevention" TEXT,
  "treatment" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE categories (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE soils (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE exposures (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE families (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE varieties (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50),
  "cultivation_advice" TEXT,
  "characteristics" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE vegetables (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50),
  "height" INTEGER,
  "sowing_period"  VARCHAR(100),
  "planting_period" VARCHAR(100),
  "harvesting_period" VARCHAR(100),
  "id_exposure" INTEGER REFERENCES exposures("id") ON DELETE CASCADE,
  "id_soil" INTEGER REFERENCES soils("id") ON DELETE CASCADE,
  "id_family" INTEGER REFERENCES families("id") ON DELETE CASCADE,
  "id_category" INTEGER REFERENCES categories("id") ON DELETE CASCADE,
  "id_variety" INTEGER REFERENCES varieties("id") ON DELETE CASCADE,
  "cultivation_advice" TEXT,
  "characteristics" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE roles (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE users (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "username" VARCHAR(100),
  "email" VARCHAR(100),
  "password" VARCHAR(100),
  "id_role" INTEGER REFERENCES roles("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE plots (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" VARCHAR(50),
  "position" INTEGER,
  "availability" BOOLEAN,
  "id_user" INTEGER REFERENCES users("id") ON DELETE CASCADE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE cultures (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "sowing" DATE,
  "planting" DATE,
  "harvesting" DATE,
  "id_vegetable" INTEGER REFERENCES vegetables("id") ON DELETE CASCADE,
  "id_plot" INTEGER REFERENCES plots("id") ON DELETE CASCADE,
  "comment" TEXT,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ
);

CREATE TABLE alliance (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "id_alliance" INTEGER[]
);

CREATE TABLE misalliance (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "id_misalliance" INTEGER[]
);

CREATE TABLE alliance_has_vegetables (
  "id_alliance" INTEGER REFERENCES alliance(id),
  "id_vegetable" INTEGER REFERENCES vegetables(id),
  PRIMARY KEY (id_alliance, id_vegetable)
);

CREATE TABLE misalliance_has_vegetables (
  "id_misalliance" INTEGER REFERENCES misalliance(id),
  "id_vegetable" INTEGER REFERENCES vegetables(id),
  PRIMARY KEY (id_misalliance, id_vegetable)
);

CREATE TABLE disease_has_vegetables (
  "id_disease" INTEGER REFERENCES diseases(id),
  "id_vegetable" INTEGER REFERENCES vegetables(id),
  PRIMARY KEY (id_disease, id_vegetable)
);

CREATE TABLE pest_has_vegetables (
  "id_pest" INTEGER REFERENCES pests(id),
  "id_vegetable" INTEGER REFERENCES vegetables(id),
  PRIMARY KEY (id_pest, id_vegetable)
);

COMMIT;
