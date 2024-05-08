import { browser } from '@wdio/globals';

export default class DefaultPage {
    async open(link) {
        await browser.url(link);
    }
}
