import CommonHeader from '../components/common/commonHeader.component.js';
import SelectedOptionsComponent from '../components/costSummary/selectedOptions.component.js';
import TotalCostModal from '../components/costSummary/totalCostModal.component.js';

export default class CostSummaryPage {
    constructor() {
        this.header = new CommonHeader();
        this.totalCostModal = new TotalCostModal();
        this.selectedOptions = new SelectedOptionsComponent();
    }
}
