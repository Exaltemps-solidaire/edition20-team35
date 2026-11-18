import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.getByText("Qui êtes-vous ?")).toBeVisible();
  });

  await test.step("Je me connecte en tant qu'ACTIV'", async () => {
    await page.getByRole("button", { name: /Nadia/ }).click();
    await expect(page.getByText("Tronc commun de Nadia")).toBeVisible();
  });

  await test.step("Je change de persona pour la chargée de remobilisation", async () => {
    await page.getByRole("button", { name: "Changer de persona" }).click();
    await page.getByRole("button", { name: /Sophie/ }).click();
    await expect(page.getByText("Tableau de bord")).toBeVisible();
  });

  await test.step("Je consulte l'avancement d'une ACTIV'", async () => {
    await page.getByRole("button", { name: /Fatou/ }).click();
    await expect(page.getByText("Tronc commun de Fatou")).toBeVisible();
    await page.getByRole("button", { name: "← Retour au tableau de bord" }).click();
    await expect(page.getByText("Tableau de bord")).toBeVisible();
  });
});
