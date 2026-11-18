# Déploiement — Espace ACTIV' (L'BURN)

Trace la formation et l'habilitation des ACTIV' (bénévoles de L'BURN) pour l'association
L'BURN (Les BURN'ettes), qui accompagne les femmes touchées par le burn-out.

## Services

- `frontend/` : Next.js, export statique servi par nginx. **Service exposé au public.**
- `api/` : Node (`node:http`), sans framework. Routes `/health` et `/sante`, pas encore de route métier.

## Services externes

Aucun pour l'instant (itération 1 : écrans avec données en dur, aucun appel réseau).

## Connu comme fragile ou inachevé

- Toutes les données (personas, tronc commun) sont codées en dur côté front : aucune persistance,
  aucun appel à l'API.
- Seul le rôle ACTIV' a un écran ; les deux autres personas (chargée de remobilisation, directrice
  d'antenne) affichent un message d'attente.
- Les écrans de ce dépôt s'appuient sur le scénario narratif de la passation, pas sur une fiche
  écran validée par les cadreurs de l'équipe (aucun prototype fourni à ce jour).

## Contact

- Équipe : Équipe 35 (hackathon eXaltemps Solidaire).
- Association : L'BURN (Les BURN'ettes) — contact nominatif non fourni dans la passation.
