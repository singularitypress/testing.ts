import { BrowserType } from "jest-playwright-preset";

export const allowedBrowsers = (currentEngine: BrowserType, engines: BrowserType[]) => {
  for (let i = 0; i < engines.length; i++) {
    const engine = engines[i];
    return !!(currentEngine === engine);
  }
};
