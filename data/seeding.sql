BEGIN;

INSERT INTO "alliance" ("alliance") VALUES
('{1, 2}'),
('{3, 4}'),
('{5, 6}');

INSERT INTO "role" ("name") VALUES
('admin'),
('user');

INSERT INTO "category" ("name") VALUES
('Fruit'),
('Graine'),
('Racine'),
('Feuille'),
('Bulbe');

INSERT INTO "family" ("name", "id_alliance") VALUES
('Tomates', 1),
('Haricots', 1),
('Carottes', 2),
('Salades', 2),
('Oignons', 3),
('Courgettes', 3);

INSERT INTO "user" ("username", "email", "password", "id_role")
VALUES
('johndoe', 'johndoe@example.com', 'password123', 1),
('janesmith', 'janesmith@example.com', 'mypassword', 2),
('bob', 'bob@example.com', 'bobspassword', 2),
('alice', 'alice@example.com', 'alicespassword', 2),
('guestuser', 'guest@example.com', 'guestpassword', 2),
('testuser', 'test@example.com', 'testpassword', 2),
('newuser', 'newuser@example.com', 'newpassword', 2),
('demo', 'demo@example.com', 'demopassword', 2);

INSERT INTO "plot" ("name", "availability", "id_user") VALUES
('Parcelle 1', true, 1),
('Parcelle 2', false, 1),
('Parcelle 3', false, 1),
('Parcelle 4', true, 1),
('Parcelle 5', true, 1),
('Parcelle 6', false, 2),
('Parcelle 7', true, 2),
('Parcelle 8', false, 2),
('Parcelle 9', false, 3),
('Parcelle 10', true, 4),
('Parcelle 11', true, 4),
('Parcelle 12', false, 4),
('Parcelle 13', true, 4),
('Parcelle 14', false, 5),
('Parcelle 15', false, 6),
('Parcelle 16', true, 6),
('Parcelle 17', true, 6),
('Parcelle 18', false, 8),
('Parcelle 19', false, 8),
('Parcelle 20', true, 8);

INSERT INTO "plant" ("name", "specification", "culture_advice", "id_family", "id_category")
VALUES
('Marmande', '{"Fruits de 150 à 250 g", "idéale pour confection de sauces, à farcir, en gratin."}', '{"Plein soleil", "Sol bien drainé"}', 3, 1),
('Argus', '{"Nain", "précoce"}', '{"Mi-ombre", "Sol humide"}', 2, 1),
('Colmar', '{"Vert", "Feuilles larges"}', '{"Plein soleil", "Sol riche"}', 1, 3),
('Laitue', '{"Verte", "Feuilles tendres"}', '{"Mi-ombre", "Sol frais"}', 4, 4),
('Oignon Jaune', '{"Jaune", "Peau fine"}', '{"Plein soleil", "Sol bien drainé"}', 5, 5),
('Courgette Verte', '{"Verte", "Fruit allongé"}', '{"Plein soleil", "Sol fertile"}', 6, 1);

-- Insérer des cultures
INSERT INTO "culture" ("sowing", "planting", "harvesting", "id_plant", "id_plot", "comment")
VALUES
('2023-04-01', '2023-04-15', '2023-05-10', 1, 1, 'Récolte abondante'),
('2023-04-01', '2023-02-15', '2023-04-10', 2, 1, 'Récolte abondante'),
('2023-04-01', '2022-02-15', '2023-01-10', 3, 1, 'Récolte abondante'),
('2023-05-01', '2023-05-15', NULL, 2, 2, ''),
('2023-04-01', '2023-04-15', NULL, 3, 1, ''),
('2023-04-10', '2023-05-01', NULL, 4, 3, ''),
('2023-05-15', '2023-06-01', '2023-06-30', 5, 4, ''),
('2023-04-15', '2023-05-01', '2023-06-30', 6, 5, ''),
('2023-05-01', '2023-05-15', NULL, 1, 6, ''),
('2023-04-10', '2023-05-01', NULL, 2, 7, ''),
('2023-05-15', '2023-06-01', NULL, 3, 8, ''),
('2023-04-15', '2023-05-01', '2023-07-30', 4, 9, ''),
('2023-05-01', '2023-05-15', NULL, 5, 11, ''),
('2023-04-10', '2023-05-01', NULL, 6, 11, ''),
('2023-05-15', '2023-06-01', '2023-07-30', 1, 12, ''),
('2023-04-15', '2023-05-01', '2023-07-30', 2, 13, ''),
('2023-05-01', '2023-05-15', NULL, 3, 11, ''),
('2023-04-10', '2023-05-01', NULL, 4, 15, ''),
('2023-05-15', '2023-06-01', NULL, 5, 16, ''),
('2023-04-15', '2023-05-01', NULL, 6, 17, ''),
('2023-05-01', '2023-05-15', NULL, 1, 18, ''),
('2023-04-10', '2023-05-01', NULL, 2, 19, ''),
('2023-05-15', '2023-06-01', NULL, 3, 20, '');

COMMIT;
