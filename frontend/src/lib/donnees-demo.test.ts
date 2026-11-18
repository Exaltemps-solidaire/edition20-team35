import { describe, expect, it } from "vitest";
import { pourcentageAvancement, type ModuleTroncCommun } from "./donnees-demo";

function module(statut: ModuleTroncCommun["statut"]): ModuleTroncCommun {
  return { id: "m", titre: "x", statut };
}

describe("pourcentageAvancement", () => {
  it("vaut 100 quand tous les modules sont vus", () => {
    expect(pourcentageAvancement([module("vu"), module("vu")])).toBe(100);
  });

  it("vaut 0 quand aucun module n'est vu", () => {
    expect(pourcentageAvancement([module("a-faire"), module("a-faire")])).toBe(0);
  });

  it("arrondit le pourcentage pour un mélange de statuts", () => {
    expect(pourcentageAvancement([module("vu"), module("a-faire")])).toBe(50);
  });
});
