import * as playwright from "playwright";
import { Browser, devices, Page } from "playwright";
import { PageVideoCapture, saveVideo } from "playwright-video";
import { desktop, deviceCompat, mobile } from "../util";

const testName = "GitHub";
let capture: PageVideoCapture;
let browser: Browser;
let page: Page;
jest.setTimeout(30000);

describe.each([...desktop, ...mobile])(
  "Check github in %s",
  (deviceName) => {
    const { isDesktop, isChromium, isAndroid, isIOS } = deviceCompat(
      deviceName,
    );

    beforeAll(async () => {
      if (isDesktop) {
        browser = await playwright[deviceName as IBrowserName].launch();
        page = await browser.newPage();
      } else if (isAndroid) {
        browser = await playwright.chromium.launch();
        page = await browser.newPage({ ...devices[deviceName] });
      } else if (isIOS) {
        browser = await playwright.webkit.launch();
        page = await browser.newPage({ ...devices[deviceName] });
      }

      if (!page) {
        throw new Error("Connection wasn't established");
      }

      if (isChromium) {
        capture = await saveVideo(page, `recordings/${deviceName.replace(/\s/g, "_")}.${testName}.mp4`);
      }
      // Open the page
      await page.goto("https://github.com", {
        waitUntil: "networkidle",
      });
    });

    afterAll(async () => {
      if (isChromium) await capture.stop();
      await browser.close();
    });

    it("should show the singularitypress/ts-ssr-kit project in the search if you search for it", async () => {
      if (isAndroid || isIOS) {
        await page.waitForSelector("button[aria-label=\"Toggle navigation\"]");
        await page.click("button[aria-label=\"Toggle navigation\"]");
        await page.waitForTimeout(500);
      }

      await page.type("input[name=\"q\"]", "ts-ssr-kit");
      await page.press("input[name=\"q\"]", "Enter");

      await page.waitForSelector(".repo-list");

      expect(await page.$eval(".repo-list", (el) => el.textContent)).toContain(
        "singularitypress/ts-ssr-kit",
      );
    });

    it("should contain 'How the sausage is made' in the project title", async () => {
      await page.click(".repo-list-item:nth-child(1) a");
      await page.waitForSelector("#readme h1");
      (await page.$("#readme h1"))?.scrollIntoViewIfNeeded({ timeout: 1000 });
      await page.waitForTimeout(1000);
      // via the CSS selector
      expect(await page.$eval("#readme h1", (el) => el.textContent)).toContain(
        "How the sausage is made",
      );
    });
  },
  30000,
);
