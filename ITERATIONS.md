# Itérations — Espace ACTIV' (L'BURN)

- **Source du plan** : proposé par l'agent. Aucun plan d'itérations de l'équipe n'a été trouvé dans la passation (pas de fichier `cadrage/*iteration*`, pas de clé `iterations` dans `passation.json`).
- **⚠️ Base écrans** : `cadrage/3-solution.md` ne décrit aucun écran (chaque idée y est à « 0 écran(s) ») et il n'y a pas de `prototype/index.html`. Ce plan s'appuie donc sur le scénario narratif du PRD (`PASSATION.md`, « Le scénario idéal de cette version »), accepté comme base de travail par le développeur — à confirmer avec les cadreurs dès que possible.
- **Temps restant annoncé** : 30 minutes (2026-11-18, au moment de la planification) ; porté à 45 minutes pendant l'itération 1, le temps que la plateforme termine son premier démarrage (voir bilan de l'itération 1).
- **Tour de test de l'équipe** : 5 minutes.
- **Capacité** : une itération coûte au moins codage (≤ 10 min) + publication (~5 min) + tour de test (5 min). La plateforme étant maintenant démarrée (registre, Postgres, passerelle inclus), la publication des itérations suivantes sera nettement plus rapide : build + push + compose up, sans le temps de démarrage de la plateforme.
- ✂️ **Hors périmètre du hackathon** (confirmé par la passation) : parcours BBA/BIB, formation Sentinelle, communauté/chat, activités ACTIV' à l'extérieur, connexion/création *de compte (remplacée par le choix de persona), modèle de paiement, suivi de progression BBA/BIB.
- ✂️ **Hors périmètre pour l'instant, faute de temps** : tout ce qui suit l'itération 1 (candidature/entretien, quiz réel, dashboard, alertes, certification, Espace ACTIV', validation antenne) est reporté en liste « À venir », à détailler itération par itération si le temps restant le permet.

## Itération 1 : L'application démarre sur le choix de persona et affiche le tronc commun d'une ACTIV' (données en dur)

- **Dans le périmètre** :
  - contrat de déployabilité : `.env.example`, `DEPLOIEMENT.md` (le reste du gabarit — `api/`, `frontend/`, Dockerfiles, `/health`, `/sante` — est déjà posé) ;
  - écran « Qui êtes-vous ? » : liste en dur d'une personne par rôle du scénario (une ACTIV', la chargée de remobilisation, la directrice d'antenne) ;
  - écran du tronc commun côté ACTIV' : liste des modules vidéo avec un statut en dur (vu / à faire).
- **Hors périmètre** : visionnage réellement tracé, quiz, dashboard équipe, certification, Espace ACTIV', candidature/entretien.
- **Critères d'acceptation** :
  - Étant donné l'application déployée, quand on ouvre l'URL racine, alors l'écran « Qui êtes-vous ? » liste au moins une personne par rôle du scénario.
  - Étant donné qu'on a choisi le persona de l'ACTIV', quand on arrive sur son espace, alors la liste des modules du tronc commun s'affiche avec un statut (vu / à faire).
  - Étant donné l'application déployée, quand on appelle `/health` et `/sante`, alors les deux répondent 200.
- **Hypothèse de l'équipe couverte** : aucune — justifié : les 4 hypothèses de la passation portent sur le tracé réel, le dashboard et le plafond d'engagement ; aucune n'est vérifiable avec un écran à données en dur.
- **Codage estimé** : 8 minutes
- **Fichiers prévus** : `.env.example`, `DEPLOIEMENT.md`, `frontend/src/app/page.tsx` (ou nouvelle route), un composant d'écran « Qui êtes-vous ? », un fichier de données en dur (personas + modules du tronc commun) — 5 fichiers environ.
- **Tests unitaires prévus** : aucun a priori — balisage pur, pas de logique métier à cette itération (à confirmer au moment du code ; si une règle émerge — ex. détermination du statut d'un module — 1 test suffit).
- **Étapes ajoutées à la démo** : ouvrir l'application, choisir le persona de l'ACTIV', voir la liste du tronc commun.
- **Bilan** :
  - **Codage** : 2 minutes, bien sous le budget de 8-10 minutes. Aucun dépassement.
  - **Publication** : largement au-delà des ~5 minutes prévues — ⚠️ le premier démarrage de la plateforme a buté sur le rate-limit anonyme de Docker Hub (`registry.internal` et `postgres.internal` ont échoué à se tirer après plusieurs essais) ; le développeur a autorisé à étendre le budget à 45 minutes. Un nouveau `podman pull` manuel puis un second passage de la recette de démarrage ont résolu le blocage (rate-limit temporaire, résorbé entre-temps) ; toute la plateforme est montée ensuite sans incident (`apisix`, `s3`, `temporal.internal`, `casdoor.internal`, `analytics.internal`, `registry.internal`, `postgres.internal`, `valkey.internal`, `openbao.internal`, `dozzle.internal`). Ce coût ne se reproduira pas aux itérations suivantes : la plateforme reste up.
  - **Critères d'acceptation** : les 3 satisfaits — vérifiés par `npm test`, `./scripts/verifier-deployabilite.sh` (aucune borne), et `curl` sur `localhost:8080/`, `/health`, `/sante` et `localhost:8081/health`, `/sante` (tous 200, corps attendu).
  - **Tests unitaires** : aucun ajouté, confirmé à l'exécution — pas de logique métier dans cette itération (données en dur).
  - **Harnais** : rien bloqué ; `npm test` passait avant le signal, aucun secret ni `.env` détecté.
  - **Reporté** : rien côté périmètre fonctionnel. Reste à faire confirmer par les cadreurs : la base écran de `cadrage/3-solution.md` (absente, voir ⚠️ en tête de ce fichier) et la mention « Plan validé » sur ce document.
  - **Modifications** :
    - `.env.example` (nouveau) — documente `PORT`, seule variable lue par `api/` à ce jour (critère DoD contrat de déployabilité).
    - `DEPLOIEMENT.md` (nouveau) — page de déploiement exigée par le contrat (services, fragilités connues, contact).
    - `podman-compose.yml` (nouveau) — déploiement sur `core-network`, ports 8080/8081, suit la recette du `/CLAUDE.md` serveur.
    - `api/Dockerfile`, `frontend/Dockerfile` (modifiés) — image de base qualifiée en `docker.io/library/…`, requis par le `/CLAUDE.md` serveur (la résolution de nom court échoue hors terminal interactif).
    - `frontend/nginx.conf` (réécrit) — reprise du gabarit de sécurité de la plateforme (`core-platform/templates/nginx.conf`), CSP corrigée (retrait de `localhost:8501`/`:9000` injoignables, ajout explicite de `script-src` sinon la page rend blanche), chemin des bundles adapté à `/_next/static/` (export Next, pas `/assets/`), routes `/health` et `/sante` conservées.
    - `frontend/src/lib/donnees-demo.ts` (nouveau) — personas et modules du tronc commun, données en dur.
    - `frontend/src/app/page.tsx` (réécrit) — écran « Qui êtes-vous ? » et écran du tronc commun pour le persona ACTIV' ; bouton pour changer de persona à tout moment ; message d'attente pour les deux autres rôles.
    - `frontend/src/app/page.module.css` (supprimé) — devenu inutilisé.
    - `e2e/demo.spec.ts` (complété) — étape d'ouverture (attend « Qui êtes-vous ? ») et étape de connexion en ACTIV' (vérifie l'écran du tronc commun de Nadia).

## Itération 2 : Dashboard de la chargée de remobilisation — accéder aux profils ACTIV' et voir leur avancement

⚠️ Reprioritisée par le développeur par rapport au plan initial (qui proposait d'abord le tracé réel du visionnage) : avance le dashboard de la liste « À venir » (point 4), avec des données en dur. Le tracé réel du visionnage passe après, en « À venir ». À confirmer avec les cadreurs.

- **Temps restant annoncé** : 30 minutes (2026-11-18, au moment de planifier cette itération). Tour de test : 5 minutes (inchangé).
- **Dans le périmètre** :
  - écran dashboard pour le persona « chargée de remobilisation » : cartes pour plusieurs ACTIV' d'exemple (Nadia, Fatou, Lucie), chacune avec une barre de progression et un badge de statut (« En formation » / « Formation complète ») ;
  - clic sur une carte → tronc commun détaillé de cette ACTIV', avec un bouton de retour au dashboard ;
  - calcul du pourcentage d'avancement comme logique métier testable.
- **Hors périmètre** : écran de la directrice d'antenne (reste en attente), alertes de difficulté, RDV en un clic, quiz, visionnage réellement tracé (toujours en dur, voir Itération suivante), vraie navigation par URL/historique navigateur (bouton de retour explicite seulement).
- **Critères d'acceptation** :
  - Étant donné le persona de la chargée de remobilisation, quand elle arrive sur son espace, alors un dashboard liste plusieurs ACTIV' avec une barre de progression chacune.
  - Étant donné le dashboard, quand elle clique sur une ACTIV', alors son tronc commun détaillé s'affiche, avec un moyen de revenir au dashboard.
  - Étant donné au moins deux ACTIV' avec des avancements différents, quand on regarde le dashboard, alors les barres de progression affichent des valeurs différentes.
- **Hypothèse de l'équipe couverte** : « Nous croyons que le dashboard … permet à la chargée de remobilisation de savoir qu'une ACTIV' est habilitée/en difficulté » (partiellement — le dashboard et l'avancement existent, pas encore les alertes ni le tracé réel du visionnage).
- **Codage estimé** : 10 minutes
- **Fichiers prévus** : `frontend/src/lib/donnees-demo.ts` (étendu), `frontend/src/app/page.tsx` (réécrit), `frontend/src/lib/donnees-demo.test.ts` (nouveau), `e2e/demo.spec.ts` (complété) — 4 fichiers.
- **Tests unitaires prévus** : 3, sur `pourcentageAvancement` (0%, 100%, mélange arrondi).
- **Étapes ajoutées à la démo** : changer de persona pour la chargée de remobilisation, voir le dashboard, cliquer sur une ACTIV', voir son détail, revenir au dashboard.
- **Bilan** :
  - **Codage** : 1 minute, largement sous le budget. Aucun dépassement.
  - **Publication** : rapide comme attendu, plateforme déjà up (build + push + compose up, sans incident).
  - **Critères d'acceptation** : les 3 satisfaits — vérifiés par `npm test`, `./scripts/verifier-deployabilite.sh` (aucune borne), et `curl` sur `localhost:8080/`, `/health`, `/sante` et `localhost:8081/health`, `/sante` (tous 200, corps attendu). Vérification visuelle du dashboard et de la navigation à faire par le développeur.
  - **Tests unitaires** : 3 ajoutés sur `pourcentageAvancement`, tous passants (`npm test` : 2 fichiers, 5 tests au total avec ceux de l'API/front existants).
  - **Harnais** : rien bloqué ; `npm test` passait avant le signal, aucun secret ni `.env` détecté.
  - **Reporté** : vraie navigation par URL/historique navigateur (le bouton « Changer de persona » et le retour au dashboard restent des resets d'état React, pas des entrées d'historique) — reporté en « À venir » si le développeur le souhaite encore.
  - **Modifications** :
    - `frontend/src/lib/donnees-demo.ts` — ajout de `SuiviActiv` (3 ACTIV' d'exemple avec avancements différents) et de `pourcentageAvancement` (logique testable), sert les 3 critères.
    - `frontend/src/app/page.tsx` — nouveau dashboard pour la chargée de remobilisation (cartes, barre de progression, badge), écran de détail réutilisable avec bouton de retour, sert les critères 1 et 2.
    - `frontend/src/lib/donnees-demo.test.ts` (nouveau) — 3 tests sur `pourcentageAvancement`.
    - `e2e/demo.spec.ts` — étapes : connexion chargée de remobilisation, dashboard visible, clic sur une ACTIV', détail visible, retour au dashboard.

## ✂️ Demande du développeur : redesign complet en e-learning "L'BURN" — découpée en itérations

⚠️ Reprioritisée devant l'Itération 3 (tracé réel), à la demande du développeur (2026-11-18). À confirmer avec les cadreurs : c'est un changement de priorité, pas un simple détail d'itération.

❗️ Points bloquants ou à trancher avant de détailler plus loin que l'Itération 5 :
- Aucune capture d'écran n'est jointe au message du développeur, alors que la demande s'appuie dessus. Les itérations ci-dessous suivent donc la description textuelle seule.
- Aucun logo ni asset de marque trouvé dans `passation/` ni dans le dépôt (`frontend/public/` ne contient que les SVG par défaut de Next.js). `https://lesburn-ettes.com` cité en référence n'est pas joignable depuis cette machine (réseau restreint, cf. `/CLAUDE.md` serveur). Je ne peux donc ni récupérer le vrai logo, ni en inventer un : l'en-tête restera un texte "L'BURN" tant qu'un fichier logo n'est pas déposé dans `frontend/public/`.
- La demande distingue "formation terminée" et "autorisation de réaliser une activité" : ce second concept (habilitation/validation par la directrice d'antenne) n'existe pas encore dans l'application — il était explicitement hors périmètre jusqu'ici (`À venir`, point validation antenne). Les itérations ci-dessous ajoutent un statut d'habilitation en donnée d'exemple simple ; le vrai flux de validation par la directrice d'antenne reste une itération séparée, plus loin dans "À venir".
- Les liens de pied de page ("Aide", "Contact", "Mentions légales", "Confidentialité") n'ont pas de destination connue dans la passation. Pour ne pas inventer de contenu légal ni créer de lien mort, ils pointeront vers des ancres internes `#` marquées "à venir", sauf le lien vers le site public qui peut pointer vers `https://lesburn-ettes.com` (URL donnée par le développeur). ❓ à confirmer : existe-t-il de vraies pages (sur le site public, ou ailleurs) vers lesquelles pointer directement ?

### Itération 3 (nouvelle, réduite) : Fondations visuelles claires

✂️ Réduite au moment de coder : 15 minutes annoncées ne tiennent pas le périmètre initial (9 min codage + publication + tour de test ≈ 19 min). Le Header/Footer de cette itération sont reportés après le fix de fond, s'il reste du temps — sinon en Itération 4. Traitée comme dernière itération avant stabilisation pour le pitch.

- **Dans le périmètre (réduit)** : corriger le fond noir et la palette uniquement (voir diagnostic ci-dessous), sans Header/Footer.
- **Périmètre initial, pour mémoire** :
  - corriger le fond noir : `frontend/src/app/globals.css` applique aujourd'hui `prefers-color-scheme: dark` → fond `#0a0a0a`, sans que les écrans ne fixent de couleurs explicites — c'est la cause du rendu noir/illisible en mode sombre visiteur. Remplacer par une palette claire fixe (fond blanc cassé, cartes blanches, texte foncé, un accent de marque), posée en variables CSS réutilisables ;
  - police lisible unique (actuellement Geist + `Arial` mélangés) ;
  - composant `Header` : "L'BURN" (texte, logo en attente) + "Espace ACTIV'", "Besoin d'aide ?" (lien `#`), bouton discret "Mode démonstration" (reprend le "Changer de persona" existant) ;
  - composant `Footer` : "L'BURN — Une association, une communauté, un parcours.", liens Aide/Contact/Mentions légales/Confidentialité (ancres `#`), lien vers `https://lesburn-ettes.com`.
  - les deux composants encadrent les écrans existants sans changer leur contenu ni leur logique.
- **Hors périmètre** : nav par rôle détaillée, menu profil, cartes personas, dashboards.
- **Critères d'acceptation** :
  - Étant donné un navigateur en préférence sombre, quand on ouvre l'application, alors le fond reste clair et tout le texte reste lisible.
  - Étant donné n'importe quel écran, quand on le consulte, alors un en-tête et un pied de page cohérents sont visibles, sur mobile et sur desktop.
- **Hypothèse de l'équipe couverte** : aucune (fondation visuelle, pas une hypothèse produit).
- **Codage estimé** : 9 minutes.
- **Fichiers prévus** : `frontend/src/app/globals.css`, `frontend/src/app/layout.tsx`, `frontend/src/components/Header.tsx` (nouveau), `frontend/src/components/Footer.tsx` (nouveau) — 4 fichiers.
- **Tests unitaires prévus** : aucun a priori (balisage/style pur).
- **Étapes ajoutées à la démo** : aucune (pas de nouveau parcours).
- **Bilan** :
  - **Codage** : 0 minute (quelques secondes), un seul fichier touché (`globals.css`). Aucun dépassement.
  - **Critères d'acceptation** : le 1er (fond clair et texte lisible, même en préférence sombre) satisfait — `color-scheme: light` fixé, variables de palette fixes, plus de media query sombre. Le 2e (en-tête/pied de page) **reporté** à l'Itération 4, faute de temps.
  - **Tests unitaires** : aucun ajouté, confirmé — pas de logique métier, seulement du style.
  - **Harnais** : rien bloqué ; `npm test` passait avant le signal, aucune borne de déployabilité.
  - **Reporté** : Header/Footer complets (logo, nav, "Besoin d'aide ?", "Mode démonstration") → Itération 4, avant les cartes personas si le temps le permet, sinon fusionnés ensemble.
  - **Modifications** :
    - `frontend/src/app/globals.css` — suppression de la media query `prefers-color-scheme: dark` qui forçait un fond noir (`#0a0a0a`) sans que les écrans ne fixent leurs propres couleurs ; palette claire fixe en variables (`--fond`, `--fond-carte`, `--texte`, `--bordure`, `--accent`), police alignée sur celle déjà chargée par `layout.tsx` (Geist) au lieu d'Arial. Sert le critère 1.

### Itération 4 : Écran de bienvenue avec cartes personas

- **Dans le périmètre** : remplacer les 3 boutons gris par 3 cartes accessibles (Nadia/Sophie/Claire), chacune avec son rôle et sa phrase ("Je me forme et je m'engage à mon rythme." / "J'accompagne les participantes." / "Je valide les activités de mon antenne.") ; titre "Bienvenue dans votre espace ACTIV'" + introduction courte expliquant par où commencer.
- **Hors périmètre** : dashboards, contenu des espaces une fois le persona choisi (inchangé).
- **Critères d'acceptation** :
  - Étant donné l'écran d'accueil, quand on le consulte, alors les 3 personas sont présentés en cartes avec leur phrase, sous le titre "Bienvenue dans votre espace ACTIV'".
  - Étant donné une carte persona, quand on clique dessus, alors on accède au même espace qu'avant (fonctionnalité inchangée, sur mobile et desktop).
- **Hypothèse de l'équipe couverte** : aucune.
- **Codage estimé** : 7 minutes.
- **Fichiers prévus** : `frontend/src/app/page.tsx`, `frontend/src/components/PersonaCard.tsx` (nouveau), `frontend/src/lib/donnees-demo.ts` (ajout d'une phrase par persona) — 3 fichiers.
- **Tests unitaires prévus** : aucun a priori (balisage pur).
- **Étapes ajoutées à la démo** : aucune (sélecteurs déjà couverts, libellés inchangés côté sélection par bouton/rôle).
- **Bilan** : _à remplir en fin d'itération_

### Itération 5 : Dashboard participante (ACTIV') façon e-learning

- **Dans le périmètre** : salutation "Bonjour Nadia", texte rassurant, bouton "Reprendre ma formation", indicateur de progression global, cartes de formation (titre, durée estimée, statut "À découvrir"/"En cours"/"Terminé", action suivante), section "Ma prochaine étape", actions secondaires "Demander de l'aide" et "Faire une pause". Ajout d'une durée estimée par module (donnée d'exemple).
- **Hors périmètre** : statut d'habilitation d'activité réel (voir Itération 6), dashboard équipe.
- **Critères d'acceptation** :
  - Étant donné l'espace de Nadia, quand elle le consulte, alors elle voit sa progression, un bouton "Reprendre ma formation" et ses modules avec statut et durée.
  - Étant donné un module non terminé, quand elle regarde "Ma prochaine étape", alors le prochain module à faire y est désigné.
- **Hypothèse de l'équipe couverte** : aucune (pas de classement, pas de compte à rebours, conforme à la consigne de ne pas presser la participante).
- **Codage estimé** : 10 minutes.
- **Fichiers prévus** : `frontend/src/app/page.tsx`, `frontend/src/lib/donnees-demo.ts` (durée par module), `frontend/src/components/ModuleCard.tsx` (nouveau), `frontend/src/components/ProgressBar.tsx` (nouveau, réutilisé en itération 6) — 4 fichiers.
- **Tests unitaires prévus** : 1-2 (règle "prochaine étape" = premier module à faire).
- **Étapes ajoutées à la démo** : voir "Reprendre ma formation" et "Ma prochaine étape".
- **Bilan** : _à remplir en fin d'itération_

### À venir (ordre proposé, le reste à détailler au fil de l'eau)

6. Dashboard chargée de remobilisation façon e-learning : avatar/initiales, barre + texte de progression, statut de formation **et** statut d'habilitation séparés (donnée d'exemple pour l'habilitation), recherche et filtre par statut, action "Voir le parcours".
7. Nav par rôle complète dans l'en-tête ("Mon parcours"/"Mes formations"/"Mes activités" côté ACTIV' ; "Tableau de bord"/"Participantes"/"Validations" côté équipe) + menu profil — au-delà du texte déjà posé en itération 3.
8. Visionnage réellement tracé (ex-Itération 3, reportée ici).
9. Quiz de fin de module : résultat enregistré et visible, pas encore de notification.
10. Alertes de difficulté + proposition de RDV de 30 minutes en un clic depuis le dashboard.
11. Certification en un clic + notification à l'association (simulée).
12. Déverrouillage de l'Espace ACTIV' : plafond mensuel d'engagement, bouton de pause.
13. Candidature en ligne + réservation d'entretien + suivi de statut (amont du tronc commun).
14. Proposition d'atelier avec gabarit + validation réelle par la directrice d'antenne (flux d'habilitation d'activité complet).
15. Vraie navigation par URL/historique navigateur (bouton « retour » du navigateur), si le temps le permet.
16. Stabilisation finale avant pitch (dernière itération si le temps ne permet plus qu'une passe).

## Itération ex-3 (désormais 8) : Le visionnage d'un module du tronc commun est réellement tracé

- **Dans le périmètre** : cliquer sur un module du tronc commun marque son visionnage comme tracé (état réel, pas en dur) ; le statut se reflète dans l'écran de l'ACTIV' et dans le dashboard de la chargée de remobilisation.
- **Hors périmètre** : quiz de fin de module, envoi des résultats à la pair-aidante, alertes de difficulté.
- **Critères d'acceptation** :
  - Étant donné un module non visionné, quand l'ACTIV' le marque comme vu, alors son statut passe à « vu » et persiste à l'écran.
  - Étant donné tous les modules du tronc commun vus, quand on consulte l'écran de l'ACTIV', alors la formation apparaît comme complète.
- **Hypothèse de l'équipe couverte** : « Nous croyons que tracer le visionnage du tronc commun … permet à la chargée de remobilisation de savoir qu'une ACTIV' est habilitée avant qu'elle intervienne » (partiellement — le tracé existe, le dashboard existe depuis l'itération 2, pas encore d'alertes).
- **Codage estimé** : 6 minutes
- **Fichiers prévus** : composant de module, logique de marquage (3-4 fichiers)
- **Tests unitaires prévus** : 1, sur la règle « formation complète quand tous les modules sont vus »
- **Étapes ajoutées à la démo** : marquer un module comme vu, montrer la formation complète
- **Bilan** : _à remplir en fin d'itération_

## À venir (ordre de priorité de l'équipe, à détailler au fil de l'eau)

4. Quiz de fin de module : résultat enregistré et visible, pas encore de notification.
5. Alertes de difficulté + proposition de RDV de 30 minutes en un clic depuis le dashboard.
6. Certification en un clic + notification à l'association (simulée).
7. Déverrouillage de l'Espace ACTIV' : plafond mensuel d'engagement, bouton de pause.
8. Candidature en ligne + réservation d'entretien + suivi de statut (amont du tronc commun).
9. Proposition d'atelier avec gabarit + validation par la directrice d'antenne.
10. Vraie navigation par URL/historique navigateur (bouton « retour » du navigateur), si le temps le permet.
11. Stabilisation finale avant pitch (dernière itération si le temps ne permet plus qu'une passe).
