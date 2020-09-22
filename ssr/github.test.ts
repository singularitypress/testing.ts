import { saveVideo } from "playwright-video";

const testName = "GitHub";
describe(testName, () => {
  let capture = null as any;
  it("should show the singularitypress/ts-ssr-kit project in the search if you search for it", async () => {
    if (browserName === "chromium") {
      capture = await saveVideo(page, `recordings/${deviceName?.replace(/\s/g, "")}1.${testName}.mp4`);
    }
    await page.goto("https://github.com");

    if (deviceName?.match(/(iPhone|Pixel)/g)) {
      await page.waitForSelector("[aria-label=\"Toggle navigation\"]");
      await page.click("[aria-label=\"Toggle navigation\"]");
    }

    await page.type("input[name=\"q\"]", "ts-ssr-kit");
    await page.press("input[name=\"q\"]", "Enter");
    await expect(page).toHaveText(".repo-list", "singularitypress/ts-ssr-kit");
    if (browserName === "chromium") await capture.stop();
  });
  it("should contain 'How the sausage is made' in the project title", async () => {
    if (browserName === "chromium") {
      capture = await saveVideo(page, `recordings/${deviceName?.replace(/\s/g, "")}2.${testName}.mp4`);
    }
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
