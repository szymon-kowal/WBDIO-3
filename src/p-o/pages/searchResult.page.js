import { $ } from '@wdio/globals';
import CommonHeader from '../components/common/commonHeader.component.js';
import Helpers from '../helpers/helpers.js';

export default class SearchResultPage {
    constructor() {
        this.header = new CommonHeader();
    }
    get rootEl() {
        return $('div.gsc-wrapper');
    }
    findByString(param) {
        return this.rootEl.$(Helpers.findByTextWithXPath(param));
    }
}
