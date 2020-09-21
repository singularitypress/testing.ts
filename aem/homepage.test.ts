require("dotenv").config();

const {
  AEM_LOCAL_AUTHOR_DOMAIN,
  AEM_LOCAL_AUTHOR_USER,
  AEM_LOCAL_AUTHOR_PASS,
} = process.env;

describe("AEM Home Page", () => {
  it("Should have the correct headline", async () => {
    await page.goto(`${AEM_LOCAL_AUTHOR_DOMAIN}content/org/en/home-page.html?wcmmode=disabled`);

    // Log into the AEM authoring environment
    await page.waitForSelector("#username");
    await page.type("#username", `${AEM_LOCAL_AUTHOR_USER}`);
    await page.waitForSelector("#password");
    await page.type("#password", `${AEM_LOCAL_AUTHOR_PASS}`);

    // via the toEqualText method
    await expect(page).toEqualText("h1", "Example Domain");
    // or via the Playwright text selector engine
    await expect(page).toHaveSelector("\"Example Domain\"", {
      state: "attached",
    });
  });
  it("Navigate to a debit-card page", async () => {
    await page.click("a.hero-button");
    // note: tomatch can also be regexes
    expect(page.url()).toMatch(`${AEM_LOCAL_AUTHOR_DOMAIN}content/org/en/debit-cards.html`);
  });
});
