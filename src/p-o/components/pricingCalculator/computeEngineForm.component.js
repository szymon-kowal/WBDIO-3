import { $ } from '@wdio/globals';
import Helpers from '../../helpers/helpers.js';

export default class ComputeEngineForm {
    get rootEl() {
        return $('//div[@data-form-title="Compute Engine"]');
    }

    findByString(param) {
        return this.rootEl.$(Helpers.findByTextWithXPath(param));
    }

    get getNumberOfInstancesInput() {
        return $('//input[@type="number"][@value="1"][@max="50000"]');
    }

    get getOperatingSystemSoftwareInput() {
        return $('//*[@aria-controls="c20"]');
    }

    get getMachineFamilyInput() {
        return $('//*[@aria-describedby="c24"]');
    }

    get getSeriesInput() {
        return $('//*[@aria-controls="c28"]');
    }

    get getMachineTypeInput() {
        return $('//*[@aria-describedby="c32"]');
    }

    get getAddGpusBtn() {
        return $('[aria-label="Add GPUs"]');
    }

    get getGpuModelInput() {
        return $('//*[@data-field-type="158"]');
    }

    get getNumberOfGPUsInput() {
        return $('//*[@data-field-type="174"]');
    }

    get getLocalSSDInput() {
        return $('//*[@data-field-type="180"]');
    }

    get getRegionInput() {
        return $('//*[@data-field-type="115"]');
    }

    // multipleSelections(selectorParam, optionParam) {
    //     const selectors = {
    //         operatingSystemSoftwareOptions:
    //             TestDataSelectors.operatingSystemSoftwareOptions,
    //         provisioningModelOptions:
    //             TestDataSelectors.provisioningModelOptions,
    //         machineFamilyOptions: TestDataSelectors.machineFamilyOptions,
    //         seriesOptions: TestDataSelectors.seriesOptions,
    //         machineTypeOptions: TestDataSelectors.machineTypeOptions,
    //         gpuModelOptions: TestDataSelectors.gpuModelOptions,
    //         numberOfGPUsOptions: TestDataSelectors.numberOfGPUsOptions,
    //         localSSDOptions: TestDataSelectors.localSSDOptions,
    //         regionSelectOptions: TestDataSelectors.regionSelectOptions,
    //         commitedUseDiscountOptions:
    //             TestDataSelectors.commitedUseDiscountOptions,
    //     };
    //     return this.rootEl.$(`${selectors[selectorParam][optionParam]}`);
    // }

    getOperatingSystemSoftwareOption(option) {
        const selector = {
            'Free: Debian, CentOS, CoreOS, Ubuntu or BYOL (Bring Your Own License)':
                'free-debian-centos-coreos-ubuntu-or-byol-bring-your-own-license',
        };
        return $(
            `//ul[@aria-label="Operating System / Software"]/*[@data-value="${selector[option]}"]`
        );
    }

    getProvisioningModelOption(option) {
        const selector = {
            Regular: 'regular',
            Spot: 'spot',
        };
        return $(
            `//*[@data-field-type="107"]//*[@id="${selector[option]}"]/..`
        );
    }

    getMachineFamilyOption(option) {
        const selector = {
            'general-purpose': 'general-purpose',
        };
        return $(
            `//ul[@aria-label="Machine Family"]//*[@data-value="${selector[option]}"]`
        );
    }

    getSeriesOption(option) {
        const selector = {
            n1: 'n1',
        };
        return $(
            `//ul[@aria-label="Series"]//*[@data-value="${selector[option]}"]`
        );
    }

    getMachineTypeOption(option) {
        const selector = {
            'n1-standard-8': 'n1-standard-8',
        };
        return $(
            `//ul[@aria-label="Machine type"]//*[@data-value="${selector[option]}"]`
        );
    }

    getGpuModelOption(option) {
        const selector = {
            'NVIDIA Tesla V100': 'nvidia-tesla-v100',
        };

        return $(
            `//ul[@aria-label="GPU Model"]//*[@data-value="${selector[option]}"]`
        );
    }

    getNumberOfGPUsOption(option) {
        const selector = {
            1: '1',
        };
        return $(
            `//ul[@aria-label="Number of GPUs"]//*[@data-value="${selector[option]}"]`
        );
    }

    getLocalSSDOption(option) {
        const selector = {
            '2x375 GB': '2',
        };
        return $(
            `//*[@aria-label="Local SSD"]//*[@data-value="${selector[option]}"]`
        );
    }

    getRegionSelectOption(option) {
        const selector = {
            'Netherlands (europe-west4)': 'europe-west4',
        };
        return $(
            `//ul[@aria-label="Region"]//*[@data-value="${selector[option]}"]`
        );
    }

    getCommitedUseDiscountOption(option) {
        const selector = {
            none: 'none',
            '1 year': '1-year',
            '3 years': '3-years',
        };
        return $(
            `//*[@data-field-type="116"]//*[@id="${selector[option]}"]/..`
        );
    }
}
