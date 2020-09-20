import { saveVideo } from "playwright-video";

describe("GitHub", () => {
  it("should show the singularitypress/ts-ssr-kit project in the search if you search for it", async () => {
    await page.goto("https://github.com/singularitypress/ts-ssr-kit");
    // await page.type("input[name=\"q\"]", "ts-ssr-kit");
    // await page.press("input[name=\"q\"]", "Enter");
    // await expect(page).toHaveText(".repo-list", "singularitypress/ts-ssr-kit");
  });
  it("should contain 'How the sausage is made' in the project title", async () => {
    const capture = await saveVideo(page, "tmp/video.mp4");
    // await page.click(".repo-list-item:nth-child(1) a");
    // via the CSS selector
    await expect(page).toHaveText("#readme h1", "How the sausage is made");

    // or via the Playwright text selector engine
    await expect(page).toHaveSelector("#user-content-how-the-sausage-is-made", {
      state: "attached",
    });
    await capture.stop();
  });
});
