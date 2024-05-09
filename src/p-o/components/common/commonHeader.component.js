import { $ } from '@wdio/globals';
export default class CommonHeader {
    get rootEl() {
        return $('header#kO001e');
    }

    get searchBar() {
        return this.rootEl.$('.mb2a7b');
    }
}
