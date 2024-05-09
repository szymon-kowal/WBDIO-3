import { $ } from '@wdio/globals';
import Helpers from '../../helpers/helpers.js';

export default class CostDetailPanel {
    get rootEl() {
        return $('//*[@id="ucj-1"]/div/div/div/div/div/div/div/div[2]/div[1]');
    }

    findByString(param) {
        return this.rootEl.$(Helpers.findByTextWithXPath(param));
    }

    get getEstimatedPriceWithLabel() {
        return $(
            '//*[@id="ucj-1"]/div/div/div/div/div/div/div/div[2]/div[1]/div/div[4]/div[1]/div[2]/label'
        );
    }

    get getShareEstimatedCostBtn() {
        return $('//button[@aria-label="Open Share Estimate dialog"]');
    }
}
