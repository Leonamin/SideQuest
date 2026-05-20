import { expect, test } from "@playwright/test";

test("renders the public entry and login screens", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Turn local quests into pet growth." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Enter SideQuest" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Project Select" })).toBeVisible();

  await page.getByRole("link", { name: "Enter SideQuest" }).click();

  await expect(
    page.getByRole("heading", {
      name: "Sign in before your project pet wakes up.",
    }),
  ).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign in" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();
});
