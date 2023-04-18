posséder5, 1N rôles, 11 utilisateurs
utilisateurs: id, pseudo, mail, mot_de_passe, id_role
appartenir, 11 parcelles, 0N utilisateurs
:
:
:
catégories: id, nom
:
:

rôles: id, nom
:
parcelles: id, nom, position, disponibilité, id_utilisateur
contenir, 0N parcelles, 11 cultures
cultures: id, semer, planter, récolter, id_legume, id_parcelle, commentaire
composer, 0N légumes, 11 cultures
posséder, 11 légumes, 1N catégories
associer2, 0N légumes, 0N ravageurs
ravageurs: id, nom, description, prévention, traitement

:
:
:
:
maladies: id, description, prévention, traitement
associer, 0N légumes, 0N maladies
légumes: id, nom, hauteur, semis, récoltes, conseil_culture, id_sol, id_famille, id_catégorie, id_exposition, caractéristiques
posséder7, 11 légumes, 1N expositions
expositions: id, nom

:
:
:
:
associer4, 0N alliances, 0N légumes
posséder6, 11 légumes, 1N sols
posséder2, 11 légumes, 1N familles
associer5, 0N mésalliances, 0N légumes
mésalliances: id, liste de légume

:
:
:
:
alliances: id, liste de légume
sols: id, nom
familles: id, nom
:
: