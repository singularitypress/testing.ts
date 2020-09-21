import { saveVideo } from "playwright-video";
import { allowedBrowsers } from "../util";
const testName = "GitHub";

describe(testName, () => {
  it("should show the singularitypress/ts-ssr-kit project in the search if you search for it", async () => {
    await page.goto("https://github.com");
    await page.type("input[name=\"q\"]", "ts-ssr-kit");
    await page.press("input[name=\"q\"]", "Enter");
    await expect(page).toHaveText(".repo-list", "singularitypress/ts-ssr-kit");
  });
  it("should contain 'How the sausage is made' in the project title", async () => {
    let capture = null as any;
    if (browserName === "chromium") capture = await saveVideo(page, `recordings/${testName}.mp4`);
    await page.click(".repo-list-item:nth-child(1) a");
    // via the CSS selector
    await expect(page).toHaveText("#readme h1", "How the sausage is made");

    // or via the Playwright text selector engine
    await expect(page).toHaveSelector("#user-content-how-the-sausage-is-made", {
      state: "attached",
    });
    if (browserName === "chromium") await capture.stop();
  });
});
