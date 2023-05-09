BEGIN;

TRUNCATE TABLE "culture", "plot", "plant", "alliance", "family", "category", "user", "role" RESTART IDENTITY;

-- Insérer des rôles
INSERT INTO "role" ("name") VALUES 
('admin'), 
('free_user');

-- Insérer des catégories de plantes
INSERT INTO "category" ("name") VALUES
('Fruit'), 
('Graine'), 
('Racine');

-- Insérer des familles de plantes
INSERT INTO "family" ("name") VALUES 
('Tomates'), 
('Haricots'), 
('Carottes');

-- Insérer des utilisateurs
INSERT INTO "user" ("username", "email", "password", "id_role") 
VALUES 
('johndoe', 'johndoe@example.com', 'password123', 1),
('janesmith', 'janesmith@example.com', 'mypassword', 2);

-- Insérer des parcelles
INSERT INTO "plot" ("name", "availability", "id_user") VALUES 
('Parcelle 1', true, 1), 
('Parcelle 2', false, 2), 
('Parcelle 3', false, 1);

-- Insérer des associations de plantes
INSERT INTO "alliance" ("alliance") VALUES 
('{1, 3}'), 
('{2, 3}');

-- Insérer des plantes
INSERT INTO "plant" ("name", "specification", "culture_advice", "id_family", "id_category")
VALUES 
('Marmande', '{"Fruits de 150 à 250 g", "idéale pour confection de sauces, à farcir, en gratin."}', '{"Plein soleil", "Sol bien drainé"}', 3, 1), 
('Argus', '{"Nain", "précoce"}', '{"Mi-ombre", "Sol humide"}', 2, 1), 
('Colmar', '{"Vert", "Feuilles larges"}', '{"Plein soleil", "Sol riche"}', 1, 3);

-- Insérer des cultures
INSERT INTO "culture" ("sowing", "planting", "harvesting", "id_plant", "id_plot", "comment") 
VALUES 
('2023-04-01', '2023-04-15', '2023-06-30', 1, 1, 'Récolte abondante'), 
('2023-05-01', '2023-05-15', NULL, 2, 2, ''), 
('2023-04-01', '2023-04-15', NULL, 3, 1, '');

COMMIT;
