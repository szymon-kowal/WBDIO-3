import { browser } from '@wdio/globals';

export default class Helpers {
    static findByTextWithXPath(string) {
        return `//*[contains(text(), "${string}")]`;
    }
    static getObjByDataValue(dataValueStr) {
        return `//*[@data-value="${dataValueStr}"]`;
    }
    static async waitUntilHelper(param) {
        await browser.waitUntil(
            async () => {
                return await param.isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg: 'Expected element to be displayed after 5 seconds',
            }
        );
    }
}
