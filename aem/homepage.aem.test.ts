import * as playwright from "playwright";
import { Browser, Page } from "playwright";
import { PageVideoCapture, saveVideo } from "playwright-video";
import { IBrowserName, IBrowsers } from "../@types";
require("dotenv").config();

const {
  AEM_LOCAL_AUTHOR_DOMAIN,
  AEM_LOCAL_AUTHOR_USER,
  AEM_LOCAL_AUTHOR_PASS,
} = process.env;

const testName = "AEM Home Page";
const desktop = ["chromium", "firefox", "webkit"] as IBrowsers;

let capture: PageVideoCapture;
let browser: Browser;
let page: Page;
jest.setTimeout(30000);

const homePageTest = (browserName: IBrowserName) => describe(`${browserName} in ${testName}`, () => {
  beforeAll(async () => {
    browser = await playwright[browserName].launch();
    page = await browser.newPage();

    if (!page) {
      throw new Error("Connection wasn't established");
    }

    if (browserName === "chromium") capture = await saveVideo(page, `recordings/${testName}.mp4`);
    // Open the page
    await page.goto(`${AEM_LOCAL_AUTHOR_DOMAIN}content/org/en/home-page.html?wcmmode=disabled`, { waitUntil: "networkidle" });

    // Log into the AEM authoring environment
    await page.waitForSelector("#username");
    await page.type("#username", `${AEM_LOCAL_AUTHOR_USER}`);
    await page.waitForSelector("#password");
    await page.type("#password", `${AEM_LOCAL_AUTHOR_PASS}`);
  });

  afterAll(async () => {
    if (browserName === "chromium") await capture.stop();
    await browser.close();
  });

  it("Click on a button, then navigate to a page.", async () => {
    await page.click("a.hero-button");
    // note: tomatch can also be regexes
    expect(page.url()).toMatch(`${AEM_LOCAL_AUTHOR_DOMAIN}content/org/en/debit-cards.html`);
  });
});

desktop.forEach((browserName) => {
  homePageTest(browserName);
});
