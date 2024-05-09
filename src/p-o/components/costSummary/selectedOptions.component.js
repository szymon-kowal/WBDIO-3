import { $ } from '@wdio/globals';
export default class SelectedOptionsComponent {
    get rootEl() {
        return $('//h6[contains(text(), "Instances")]/../..');
    }

    get getTotalEstimatedCostValue() {
        return $('//h4[contains(text(), "$")]');
    }

    get getNumberOfInstancesValue() {
        return this._helperSiblingThroughTextPath(
            'span',
            'Number of Instances'
        );
    }

    get getOperatingSystemSoftwareValue() {
        return this._helperSiblingThroughTextPath(
            'span',
            'Operating System / Software'
        );
    }

    get getProvisioningModelValue() {
        return this._helperSiblingThroughTextPath('span', 'Provisioning Model');
    }

    // get getMachineFamilyValue() {
    //     return this._helperSiblingThroughTextPath('span', 'Provisioning Model');
    // }

    get getMachineTypeValue() {
        return this._helperSiblingThroughTextPath('span', 'Machine type');
    }

    get getGPUModelValue() {
        return this._helperSiblingThroughTextPath('span', 'GPU Model');
    }

    get getNumberOfGPUsValue() {
        return this._helperSiblingThroughTextPath('span', 'Number of GPUs');
    }

    get getLocalSSDValue() {
        return this._helperSiblingThroughTextPath('span', 'Local SSD');
    }

    get getRegionSelectValue() {
        return this._helperSiblingThroughTextPath('span', 'Region');
    }

    get getCommitedUseDiscountValue() {
        return this._helperSiblingThroughTextPath(
            'span',
            'Committed use discount options'
        );
    }

    _helperSiblingThroughTextPath(selector, text) {
        return this.rootEl.$(
            `//${selector}[contains(text(), "${text}")]/following-sibling::*[1]`
        );
    }
}
