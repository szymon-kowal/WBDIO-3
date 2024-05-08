import { $ } from '@wdio/globals';
import DefaultPage from '../basic.page.js';

export default class IndexPage extends DefaultPage {
    async open() {
        await super.open('https://cloud.google.com/');
    }

    get searchBar() {
        return $('.mb2a7b');
    }

    async removePopups() {
        await this.closePopupIfDisplayed(
            '//*[@id="glue-cookie-notification-bar-1"]/button',
            'Notification popup'
        );
    }

    async closePopupIfDisplayed(selector, description = '') {
        try {
            const element = await $(selector);
            if (
                await element.waitForDisplayed({
                    timeout: 3000,
                    reverse: false,
                })
            ) {
                await element.click();
            }
        } catch (error) {
            console.log(
                `${description} is not displayed or not clickable:`,
                error.message
            );
        }
    }
}
