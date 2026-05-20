import { expect, test } from "@playwright/test";

const hasSupabaseE2EEnv =
  !!process.env.E2E_EMAIL &&
  !!process.env.E2E_PASSWORD &&
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

test("creates a project, completes a quest, and shows pet rewards", async ({
  page,
}) => {
  test.skip(
    !hasSupabaseE2EEnv,
    "Set E2E_EMAIL, E2E_PASSWORD, and local SideQuest Supabase public env to run the authenticated MVP loop.",
  );

  const suffix = Date.now();
  const email = getUniqueEmail(process.env.E2E_EMAIL ?? "", suffix);
  const projectName = `E2E Project ${suffix}`;
  const questTitle = `E2E Quest ${suffix}`;

  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(process.env.E2E_PASSWORD ?? "");
  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(page.getByRole("heading", { name: "Choose a quest file." })).toBeVisible();
  await page.getByRole("link", { name: "New Local Project" }).click();
  await page.getByLabel("Project name").fill(projectName);
  await page.getByRole("button", { name: "Create project" }).click();

  await expect(page.getByRole("heading", { name: projectName })).toBeVisible();
  await page.getByLabel("Quest title").fill(questTitle);
  await page.getByRole("button", { name: "Add quest" }).click();

  await expect(page.getByRole("heading", { name: questTitle })).toBeVisible();
  await page.getByRole("button", { name: "Complete" }).click();

  await expect(page.getByRole("dialog", { name: "+30 XP" })).toBeVisible();
  await expect(page.getByText("Quest Clear")).toBeVisible();
  await expect(page.getByRole("button", { name: "Done" })).toBeVisible();
  await page.getByRole("dialog", { name: "+30 XP" }).getByRole("link", {
    name: "Pet Room",
  }).click();

  await expect(page.getByRole("heading", { name: projectName })).toBeVisible();
  await expect(page.getByText("Lifetime XP: 30")).toBeVisible();
  await expect(page.getByText("+30 XP")).toBeVisible();
});

function getUniqueEmail(email: string, suffix: number): string {
  const [name, domain] = email.split("@");

  if (!name || !domain) {
    return email;
  }

  return `${name}+${suffix}@${domain}`;
}
