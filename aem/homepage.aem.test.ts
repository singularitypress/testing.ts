import * as playwright from "playwright";
import { Browser, devices, Page } from "playwright";
import { PageVideoCapture, saveVideo } from "playwright-video";
import { desktop, deviceCompat, mobile } from "../util";

require("dotenv").config();

const {
  AEM_LOCAL_AUTHOR_DOMAIN,
  AEM_LOCAL_AUTHOR_USER,
  AEM_LOCAL_AUTHOR_PASS,
} = process.env;

const testName = "AEM Home Page";

let capture: PageVideoCapture;
let browser: Browser;
let page: Page;
jest.setTimeout(30000);

describe.each([...desktop, ...mobile])(`%s in ${testName}`, (deviceName) => {
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

    if (isChromium) capture = await saveVideo(page, `recordings/${testName}.mp4`);
    // Open the page
    await page.goto(`${AEM_LOCAL_AUTHOR_DOMAIN}content/org/en/home-page.html?wcmmode=disabled`, { waitUntil: "networkidle" });

    // Log into the AEM authoring environment
    await page.waitForSelector("#username");
    await page.type("#username", `${AEM_LOCAL_AUTHOR_USER}`);
    await page.waitForSelector("#password");
    await page.type("#password", `${AEM_LOCAL_AUTHOR_PASS}`);
  });

  afterAll(async () => {
    if (isChromium) await capture.stop();
    await browser.close();
  });

  it("Click on a button, then navigate to a page.", async () => {
    await page.click("a.hero-button");
    // note: tomatch can also be regexes
    expect(page.url()).toMatch(`${AEM_LOCAL_AUTHOR_DOMAIN}content/org/en/debit-cards.html`);
  });
}, 30000);
