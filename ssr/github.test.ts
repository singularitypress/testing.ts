import * as playwright from "playwright";
import { Browser, Page } from "playwright";
import { PageVideoCapture, saveVideo } from "playwright-video";
import { IBrowserName, IBrowsers } from "../@types";

const testName = "GitHub";
const desktop = ["chromium", "firefox", "webkit"] as IBrowsers;

let capture: PageVideoCapture;
let browser: Browser;
let page: Page;
jest.setTimeout(30000);

const githubTest = (browserName: IBrowserName) => describe(`${browserName} in ${testName}`, () => {
  beforeAll(async () => {
    browser = await playwright[browserName].launch();
    page = await browser.newPage();

    if (!page) {
      throw new Error("Connection wasn't established");
    }

    if (browserName === "chromium") capture = await saveVideo(page, `recordings/${testName}.mp4`);
    // Open the page
    await page.goto("https://github.com", {
      waitUntil: "networkidle",
    });
  });

  afterAll(async () => {
    if (browserName === "chromium") await capture.stop();
    await browser.close();
  });

  it("should show the singularitypress/ts-ssr-kit project in the search if you search for it", async () => {
    await page.type("input[name=\"q\"]", "ts-ssr-kit");
    await page.press("input[name=\"q\"]", "Enter");

    await page.waitForSelector(".repo-list");

    await expect(await page.$eval(".repo-list", (el) => el.textContent)).toContain("singularitypress/ts-ssr-kit");
  });

  it("should contain 'How the sausage is made' in the project title", async () => {
    await page.click(".repo-list-item:nth-child(1) a");
    await page.waitForSelector("#readme h1");
    (await page.$("#readme h1"))?.scrollIntoViewIfNeeded({ timeout: 1000 });
    await page.waitForTimeout(1000);
    // via the CSS selector
    await expect(await page.$eval("#readme h1", (el) => el.textContent)).toContain("How the sausage is made");
  });
});

desktop.forEach((browserName) => {
  githubTest(browserName);
});
