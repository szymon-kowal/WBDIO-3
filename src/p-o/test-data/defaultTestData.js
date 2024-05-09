export const defaultTestData = {
    operatingSystemSoftwareOptions: {
        'free-debian':
            '//*[@data-value="free-debian-centos-coreos-ubuntu-or-byol-bring-your-own-license"]',
    },
    provisioningModelOptions: {
        regular: '//*[@id="regular"]/..',
    },
    machineFamilyOptions: {
        'general-purpose': '//*[@data-value="general-purpose"]',
    },
    seriesOptions: {
        n1: '//*[@data-value="n1"]',
    },
    machineTypeOptions: {
        'n1-standard-8': '//*[@data-value="n1-standard-8"]',
    },
    gpuModelOptions: {
        'nvidia-tesla-v100': '//*[@data-value="nvidia-tesla-v100"]',
    },
    numberOfGPUsOptions: {
        1: '//*[@data-value="1"]',
    },
    localSSDOptions: {
        // nothing is working :c
        2: '//*[@aria-label="Local SSD"]//*[@data-value="2"]',
    },
    regionSelectOptions: {
        'europe-west4': '//*[@data-value="europe-west4"]',
    },
    commitedUseDiscountOptions: {
        '1-year': '//*[@data-field-type="116"]//*[@id="1-year"]/..',
    },
};
