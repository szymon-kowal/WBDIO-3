import { $ } from '@wdio/globals';
import Helpers from '../../helpers/helpers.js';

export default class ShareEstimatePopup {
    get rootEl() {
        return $('//*[@id="yDmH0d"]/div[7]/div[2]/div/div/div');
    }

    findByString(param) {
        return $(Helpers.findByTextWithXPath(param));
    }

    items(param) {
        const selectors = {};
        return $(`${selectors[param]}`);
    }
}
