# TODO LIST

- Cahier des charges ✅
   ✅
- MCD ✅
- MLD ✅
- MDP ✅
 ✅
- Configuration de l'environnement de travail ✅
  - eslint (configuration airBnB) ✅
  - ajout du fichier .editorConfig ✅
  - sqitch ✅
  - initialisation d'un dépôt git ✅
  - initialisation d'un projet Node.js ✅
  - installation de jsDoc ✅
  - installation de swagger pour express ✅
  - installation des dépendances : ✅
    - express ✅
    - cors ✅
    - dotenv ✅
    - pg ✅
    - bunyan ✅
    - joi ✅
    - jest ✅

- Création d'une BDD postgres ✅
  - 1ère migration ✅
    - ! Anticiper les contraintes, index, ... ✅
  - 1 seeding avec des fakes ✅

- Configuration du serveur express ✅
  - 1ère route test ✅
  - configuration de bunyan ✅
  - configuration de Swagger ✅
  - connexion à la BDD ✅

- Gestion des erreurs  ✅
  - création des middlewares ✅
    - controller handler ✅
    - api controller handler ✅
    - création d'une class NoFound' ✅

- Mise en place des tests unitaires ✅
  - Mise en place d'un fichier test ✅
  - 2nd migration ✅
    - Création des views en sql ✅
  - Création des models ✅
  - Création des controllers ✅
  - Mise en place d'une première route GET ✅
  - Lancement des tests unitaires ✅

- CRUD, pour chaque "lettre" ✅
  - Tests Unitaires ✅
  - Créations des fonctions sql ✅
  - Migrations ✅
  - Models ✅
  - Controller ✅
  - Routes ✅
  - Gestions des nouveaux types d'erreurs ✅
  - Déclenchement des tests ✅
  - Test avec client REST ou insomnia ✅
  - Commentaire swagger ✅
  - Pour Create et Update => Schémas de validation avec Joi ✅

- implémenter une authentification basée sur les rôles et un contrôle d'accès basé sur le rôle (RBAC).
  - Paramétrer les sessions ✅
  - Utiliser B-crypt pour les passwords ✅
  - Gérer les rôles (admin pour la partie plantes et CRUD user) ✅

- Sécurité
  - Mettre en place des regex pour les params des url ✅
  - Vérifier la protection contre les injections SQL ✅
  - Vérifier la protection contre les attaque XSS (Regex ✅, Joy et sanitizer ✅)
  - Vérifier la protection contre les attaques CSRF (CORS ✅, token )

- mise en ligne

- Faire un sauvegarde automatique de la BDD

- Mise en ligne
  - Chiffrement HTTPS : obtenir un certificat SSL gratuit via Let's Encrypt.
