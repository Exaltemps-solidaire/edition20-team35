// Données d'exemple pour l'itération 1 : aucune connexion, un persona par rôle du scénario.
export type Role = "activ" | "chargee-remobilisation" | "directrice-antenne";

export type Persona = {
  id: string;
  nom: string;
  role: Role;
  libelleRole: string;
};

export const personas: Persona[] = [
  { id: "p1", nom: "Nadia", role: "activ", libelleRole: "ACTIV'" },
  { id: "p2", nom: "Sophie", role: "chargee-remobilisation", libelleRole: "Chargée de remobilisation" },
  { id: "p3", nom: "Claire", role: "directrice-antenne", libelleRole: "Directrice d'antenne" },
];

export type StatutModule = "vu" | "a-faire";

export type ModuleTroncCommun = {
  id: string;
  titre: string;
  statut: StatutModule;
};

export const troncCommun: ModuleTroncCommun[] = [
  { id: "m1", titre: "Le rôle de l'ACTIV'", statut: "vu" },
  { id: "m2", titre: "Écoute et posture de pair-aidance", statut: "vu" },
  { id: "m3", titre: "Limites et plafond d'engagement", statut: "a-faire" },
  { id: "m4", titre: "Les numéros d'urgence et quand les utiliser", statut: "a-faire" },
];

// Avancement par ACTIV', pour le dashboard de la chargée de remobilisation.
// Données en dur, indépendantes du choix de persona : la chargée de remobilisation suit des
// ACTIV' qui ne se connectent pas elles-mêmes dans cette démo (sauf Nadia, qui reste la seule
// jouable depuis l'écran « Qui êtes-vous ? » et partage donc son tronc commun avec `troncCommun`).
export type SuiviActiv = {
  id: string;
  nom: string;
  modules: ModuleTroncCommun[];
};

export const suiviActivs: SuiviActiv[] = [
  { id: "p1", nom: "Nadia", modules: troncCommun }, // 2/4
  {
    id: "a2",
    nom: "Fatou",
    modules: [
      { id: "m1", titre: "Le rôle de l'ACTIV'", statut: "vu" },
      { id: "m2", titre: "Écoute et posture de pair-aidance", statut: "vu" },
      { id: "m3", titre: "Limites et plafond d'engagement", statut: "vu" },
      { id: "m4", titre: "Les numéros d'urgence et quand les utiliser", statut: "vu" },
    ],
  },
  {
    id: "a3",
    nom: "Lucie",
    modules: [
      { id: "m1", titre: "Le rôle de l'ACTIV'", statut: "a-faire" },
      { id: "m2", titre: "Écoute et posture de pair-aidance", statut: "a-faire" },
      { id: "m3", titre: "Limites et plafond d'engagement", statut: "a-faire" },
      { id: "m4", titre: "Les numéros d'urgence et quand les utiliser", statut: "a-faire" },
    ],
  },
];

/** Pourcentage de modules vus, arrondi à l'entier le plus proche. 0 si la liste est vide. */
export function pourcentageAvancement(modules: ModuleTroncCommun[]): number {
  if (modules.length === 0) return 0;
  const vus = modules.filter((m) => m.statut === "vu").length;
  return Math.round((vus / modules.length) * 100);
}
