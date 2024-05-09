import { $ } from '@wdio/globals';
import Helpers from '../../helpers/helpers.js';

export default class MidStart {
    get rootEl() {
        return $('//*[@id="ucj-1"]/div/div/div/div/div/div/div/div[1]/div');
    }

    findByString(param) {
        return this.rootEl.$(Helpers.findByTextWithXPath(param));
    }

    items(param) {
        const selectors = {
            addToEstimateBtn: Helpers.findByTextWithXPath('Add to estimate'),
        };
        return this.rootEl.$(`${selectors[param]}`);
    }
}
