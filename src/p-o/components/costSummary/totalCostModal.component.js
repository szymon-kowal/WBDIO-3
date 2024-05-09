import { $ } from '@wdio/globals';
export default class TotalCostModal {
    get rootEl() {
        return 'dummy';
    }

    get getTotalEstimatedCostValue() {
        return $('//h4[contains(text(), "$")]');
    }
}
