import { $ } from '@wdio/globals';

export default class CostSummaryPage {
    get totalEstimatedCostValue() {
        return $('//h4[contains(text(), "$")]');
    }
}
