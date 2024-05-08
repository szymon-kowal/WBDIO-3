import { $ } from '@wdio/globals';
import DefaultPage from '../basic.page.js';
import Helpers from '../helpers/helpers.js';

export default class PricingCalculatorPage extends DefaultPage {
    get addToEstimateBtn() {
        return $(Helpers.findByTextWithXPath('Add to estimate'));
    }

    get computeEngineBtn() {
        return $('//div[@data-service-form="8"]');
    }

    get numberOfInstancesInput() {
        return $('//input[@type="number"][@value="1"][@max="50000"]');
    }

    get operatingSystemSoftwareInput() {
        return $('//*[@aria-controls="c20"]');
    }

    operatingSystemSoftwareOptions(dataValue) {
        return $(Helpers.getObjByDataValue(dataValue));
    }

    get provisioningModelRegularBtn() {
        return $('//*[@id="regular"]');
    }

    get machineFamilyInput() {
        return $('//*[@aria-describedby="c24"]');
    }

    get machineFamilyModal() {
        return $('//*[@aria-label="Machine Family"]');
    }

    machineFamilySelectOption(dataValueOption) {
        return this.machineFamilyModal.$(
            Helpers.getObjByDataValue(dataValueOption)
        );
    }
    get seriesInput() {
        return $('//*[@aria-controls="c28"]');
    }

    get seriesModal() {
        return $('//*[@aria-label="Series"]');
    }

    seriesSelectOption(dataValueOption) {
        return this.seriesModal.$(Helpers.getObjByDataValue(dataValueOption));
    }
    get machineTypeInput() {
        return $('//*[@aria-describedby="c32"]');
    }

    get machineTypeModal() {
        return $('//*[@aria-label="Machine type"]');
    }

    machineTypeSelectOption(dataValueOption) {
        return this.machineTypeModal.$(
            Helpers.getObjByDataValue(dataValueOption)
        );
    }

    get AddGpusBtn() {
        return $('[aria-label="Add GPUs"');
    }

    get gpuModelInput() {
        return $('//*[@data-field-type="158"]');
    }

    get gpuModelModal() {
        return $('//*[@aria-label="GPU Model"]');
    }

    gpuModelSelectOption(dataValueOption) {
        return this.gpuModelModal.$(Helpers.getObjByDataValue(dataValueOption));
    }

    get numberOfGPUsInput() {
        return $('//*[@data-field-type="174"]');
    }

    get numberOfGPUsModal() {
        return $('//*[@aria-label="Number of GPUs"]');
    }

    numberOfGPUsSelectOption(dataValueOption) {
        return this.numberOfGPUsModal.$(
            Helpers.getObjByDataValue(dataValueOption)
        );
    }

    get localSSDInput() {
        return $('//*[@data-field-type="180"]');
    }

    get localSSDModal() {
        return $('//*[@aria-label="Local SSD"]');
    }

    localSSDSelectOption(dataValueOption) {
        // return this.localSSDModal.$(Helpers.getObjByDataValue(dataValueOption));
        return $(
            `//*[@aria-label="Local SSD"]//*[@data-value="${dataValueOption}"]`
        );
    }

    get regionInput() {
        return $('//*[@data-field-type="115"]');
    }

    get regionModal() {
        return $('//*[@aria-label="Region"]');
    }

    regionSelectOption(dataValueOption) {
        return this.regionModal.$(Helpers.getObjByDataValue(dataValueOption));
    }

    get select1YearCommittedUse() {
        return $('//label[@for="1-year"]');
    }

    get estimatedPriceWithLabel() {
        // Yeah it is ugly, but I do not know how can I select it with different approach :c
        return $(
            '//*[@id="ucj-1"]/div/div/div/div/div/div/div/div[2]/div[1]/div/div[4]/div[1]/div[2]/label'
        );
    }

    get shareEstimatedCostBtn() {
        return $('//button[@aria-label="Open Share Estimate dialog"]');
    }
}
