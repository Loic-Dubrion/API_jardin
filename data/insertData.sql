Begin;

-- Insertion des données dans la table "diseases"
INSERT INTO diseases (description, prevention, treatment)
VALUES
('Maladie 1', 'Prevention 1', 'Traitement 1'),
('Maladie 2', 'Prevention 2', 'Traitement 2'),
('Maladie 3', 'Prevention 3', 'Traitement 3'),
('Maladie 4', 'Prevention 4', 'Traitement 4');

-- Insertion des données dans la table "pests"
INSERT INTO pests (name, description, prevention, treatment)
VALUES
('Pest 1', 'Description 1', 'Prevention 1', 'Traitement 1'),
('Pest 2', 'Description 2', 'Prevention 2', 'Traitement 2'),
('Pest 3', 'Description 3', 'Prevention 3', 'Traitement 3'),
('Pest 4', 'Description 4', 'Prevention 4', 'Traitement 4');

-- Insertion des données dans la table "categories"
INSERT INTO categories (name)
VALUES
('Category 1'),
('Category 2'),
('Category 3'),
('Category 4');

-- Insertion des données dans la table "soils"
INSERT INTO soils (name)
VALUES
('soil 1'),
('soil 2'),
('soil 3'),
('soil 4');

-- Insertion des données dans la table "exposures"
INSERT INTO exposures (name)
VALUES
('Exposure 1'),
('Exposure 2'),
('Exposure 3'),
('Exposure 4');

-- Insertion des données dans la table "families"
INSERT INTO families (name)
VALUES
('Family 1'),
('Family 2'),
('Family 3'),
('Family 4');

-- Insertion des données dans la table "varieties"
INSERT INTO varieties (name, cultivation_advice, characteristics)
VALUES
('Variety 1', 'Advice 1', 'Characteristics 1'),
('Variety 2', 'Advice 2', 'Characteristics 2'),
('Variety 3', 'Advice 3', 'Characteristics 3'),
('Variety 4', 'Advice 4', 'Characteristics 4');

-- Insertion des données dans la table "roles"
INSERT INTO "roles" (name)
VALUES
('Role 1'),
('Role 2');

-- Insertion des données dans la table "users"
INSERT INTO "users" (username, email, password, id_role)
VALUES
('User 1', 'user1@example.com', 'password1', 1),
('User 2', 'user2@example.com', 'password2', 1),
('User 3', 'user3@example.com', 'password3', 2),
('User 4', 'user4@example.com', 'password4', 1);

-- Insertion des données dans la table "plots"
INSERT INTO plots (name, position, availability, id_user)
VALUES
('Plot 1', 1, true, 1),
('Plot 2', 2, false, 2),
('Plot 3', 3, true, 3),
('Plot 4', 4, false, 4);

-- Insertion des données dans la table "vegetables"
INSERT INTO vegetables (name, height, sowing_period, planting_period, harvesting_period, id_exposure, id_soil, id_family, id_category, id_variety, cultivation_advice, characteristics)
VALUES
('Vegetable 1', 10, 'Period 1', 'Period 1', 'Period 1', 1, 1, 1, 1, 1, 'Advice 1', 'Characteristics 1'),
('Vegetable 2', 20, 'Period 2', 'Period 2', 'Period 2', 2, 2, 2, 2, 2, 'Advice 2', 'Characteristics 2'),
('Vegetable 3', 30, 'Period 3', 'Period 3', 'Period 3', 3, 3, 3, 3, 3, 'Advice 3', 'Characteristics 3'),
('Vegetable 4', 40, 'Period 4', 'Period 4', 'Period 4', 4, 4, 4, 4, 4, 'Advice 4', 'Characteristics 4');

-- Insertion des données dans la table "cultures"
INSERT INTO cultures (sowing, planting, harvesting, id_vegetable, id_plot, comment)
VALUES
('2023-04-01', '2023-04-05', '2023-04-30', 1, 1, 'Comment 1'),
('2023-04-02', '2023-04-06', '2023-05-01', 2, 2, 'Comment 2'),
('2023-04-03', '2023-04-07', '2023-05-02', 3, 3, 'Comment 3'),
('2023-04-04', '2023-04-08', '2023-05-03', 4, 4, 'Comment 4');

-- Insertion des données dans la table "alliance"
INSERT INTO alliance (id_alliance)
VALUES
('{1,2,3}'),
('{2,3,4}'),
('{3,4,1}'),
('{4,1,2}');

-- Insertion des données dans la table "misalliance"
INSERT INTO misalliance (id_misalliance)
VALUES
('{1,2}'),
('{2,3}'),
('{3,4}'),
('{4,1}');

-- Insertion des données dans la table "alliance_has_vegetables"
INSERT INTO alliance_has_vegetables (id_alliance, id_vegetable)
VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 2), (2, 3), (2, 4), (2, 1),
(3, 3), (3, 4), (3, 1), (3, 2),
(4, 4), (4, 1), (4, 2), (4, 3);

-- Insertion des données dans la table "misalliance_has_vegetables"
INSERT INTO misalliance_has_vegetables (id_misalliance, id_vegetable)
VALUES
(1, 1), (1, 2),
(2, 2), (2, 3),
(3, 3), (3, 4),
(4, 4), (4, 1);

-- Insertion des données dans la table "disease_has_vegetables"
INSERT INTO disease_has_vegetables (id_disease, id_vegetable)
VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 2), (2, 3), (2, 4), (2, 1),
(3, 3), (3, 4), (3, 1), (3, 2),
(4, 4), (4, 1), (4, 2), (4, 3);

-- Insertion des données dans la table "pest_has_vegetables"
INSERT INTO pest_has_vegetables (id_pest, id_vegetable)
VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 2), (2, 3), (2, 4), (2, 1),
(3, 3), (3, 4), (3, 1), (3, 2),
(4, 4), (4, 1), (4, 2), (4, 3);

-- Confirmation de la transaction
COMMIT;