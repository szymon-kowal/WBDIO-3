import { browser } from '@wdio/globals';
import { expect } from 'chai';
import IndexPage from '../../p-o/pages/index.page.js';
import PricingCalculatorPage from '../../p-o/pages/pricingCalculator.page.js';
import CostSummaryPage from '../../p-o/pages/costSummary.page.js';
import SearchResultPage from '../../p-o/pages/searchResult.page.js';
import { baseTestData } from '../../p-o/test-data/baseTestData.js';
import Helpers from '../../p-o/helpers/helpers.js';

const indexPage = new IndexPage();
const searchResultPage = new SearchResultPage();
const pricingCalculatorPage = new PricingCalculatorPage();
const costSummaryPage = new CostSummaryPage();

describe('Google Cloud Platform Pricing Calculator', () => {
    beforeEach(async () => {
        await indexPage.open();
        // await browser.url(
        //     'https://cloud.google.com/products/calculator/estimate-preview/38178ac1-1bc7-4af5-b680-998970edec73?hl=en'
        // );
        await indexPage.removePopups();
    });

    it('should open the index page and confirm the search bar is functional @Smoke', async () => {
        expect(await browser.getUrl()).to.be.equal('https://cloud.google.com/');
        await indexPage.header.searchBar.click();
        await indexPage.header.searchBar.setValue(
            'Google Cloud Platform Pricing Calculator'
        );
        browser.keys('Enter');

        // Verify if search results are displayed
        expect(await searchResultPage.rootEl.isDisplayed()).to.be.true;
    });
    it('should navigate to the pricing calculator page from search results @Smoke', async () => {
        // Navigate to index and perform search first
        await indexPage.header.searchBar.click();
        await indexPage.header.searchBar.setValue(
            'Google Cloud Platform Pricing Calculator'
        );
        browser.keys('Enter');

        await searchResultPage
            .findByString('Google Cloud Pricing Calculator')
            .click();
        // Confirm that the pricing calculator is displayed
        expect(await pricingCalculatorPage.midFirstComp.rootEl.isDisplayed()).to
            .be.true;
    });

    it('should confirm the interaction with "Add to estimate" is functional @Smoke', async () => {
        // Assuming user has navigated to the Pricing Calculator
        await indexPage.header.searchBar.click();
        await indexPage.header.searchBar.setValue(
            'Google Cloud Platform Pricing Calculator'
        );
        browser.keys('Enter');
        await searchResultPage
            .findByString('Google Cloud Pricing Calculator')
            .click();

        // Wait for and click the 'Add to estimate' button
        await Helpers.waitUntilHelper(
            pricingCalculatorPage.midFirstComp.findByString('Add to estimate')
        );
        await pricingCalculatorPage.midFirstComp
            .findByString('Add to estimate')
            .click();

        // Check that the modal or next actionable item after clicking 'Add to estimate' appears

        await Helpers.waitUntilHelper(
            pricingCalculatorPage.addToEstimateModal.rootEl
        );

        expect(
            await pricingCalculatorPage.addToEstimateModal.rootEl.isDisplayed()
        ).to.be.true;
    });

    it('should calculate the cost for specific compute engine settings', async () => {
        const testData = baseTestData;
        await indexPage.header.searchBar.click();
        await indexPage.header.searchBar.setValue(
            'Google Cloud Platform Pricing Calculator'
        );

        browser.keys('Enter');

        // Navigate to the Pricing Calculator

        await searchResultPage
            .findByString('Google Cloud Pricing Calculator')
            .click();

        await Helpers.waitUntilHelper(
            pricingCalculatorPage.midFirstComp.findByString('Add to estimate')
        );

        await pricingCalculatorPage.midFirstComp
            .findByString('Add to estimate')
            .click();

        // Select COMPUTE ENGINE

        await Helpers.waitUntilHelper(
            pricingCalculatorPage.addToEstimateModal.getComputeEngineBtn
        );

        await pricingCalculatorPage.addToEstimateModal.getComputeEngineBtn.click();
        // Fill out the form

        // Number of instances: 4
        await pricingCalculatorPage.computeEngineForm.getNumberOfInstancesInput.setValue(
            testData.numberOfInstances
        );
        //    * What are these instances for?: leave blank
        //    * Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or another User-Provided OS
        await pricingCalculatorPage.computeEngineForm.getOperatingSystemSoftwareInput.click();

        await Helpers.waitUntilHelper(
            pricingCalculatorPage.computeEngineForm.getOperatingSystemSoftwareOption(
                testData.operatingSystemSoftware
            )
        );

        await pricingCalculatorPage.computeEngineForm
            .getOperatingSystemSoftwareOption(testData.operatingSystemSoftware)
            .click();

        //    * Provisioning model: Regular

        await pricingCalculatorPage.computeEngineForm
            .getProvisioningModelOption(testData.provisioningModel)
            .waitForClickable();
        await pricingCalculatorPage.computeEngineForm
            .getProvisioningModelOption(testData.provisioningModel)
            .click();

        //    * Machine Family: General purpose

        await pricingCalculatorPage.computeEngineForm.getMachineFamilyInput.click();
        await pricingCalculatorPage.computeEngineForm
            .getMachineFamilyOption(testData.machineFamily)
            .waitForClickable();
        await pricingCalculatorPage.computeEngineForm
            .getMachineFamilyOption(testData.machineFamily)
            .click();

        //    * Series: N1

        await pricingCalculatorPage.computeEngineForm.getSeriesInput.click();
        await pricingCalculatorPage.computeEngineForm
            .getSeriesOption(testData.series)
            .click();

        //    * Machine type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)

        await pricingCalculatorPage.computeEngineForm.getMachineTypeInput.click();

        await pricingCalculatorPage.computeEngineForm
            .getMachineTypeOption(testData.machineType)
            .click();

        //    * Select “Add GPUs“

        await pricingCalculatorPage.computeEngineForm.getAddGpusBtn.click();

        //     * GPU type: NVIDIA Tesla V100

        await Helpers.waitUntilHelper(
            pricingCalculatorPage.computeEngineForm.getGpuModelInput
        );

        await pricingCalculatorPage.computeEngineForm.getGpuModelInput.click();

        await Helpers.waitUntilHelper(
            pricingCalculatorPage.computeEngineForm.getGpuModelOption(
                testData.gpuModel
            )
        );

        await pricingCalculatorPage.computeEngineForm
            .getGpuModelOption(testData.gpuModel)
            .click();
        //      * Number of GPUs: 1
        await pricingCalculatorPage.computeEngineForm.getNumberOfGPUsInput.click();
        await pricingCalculatorPage.computeEngineForm
            .getNumberOfGPUsOption(testData.numberOfGPUs)
            .click();

        //    * Local SSD: 2x375 Gb

        await pricingCalculatorPage.computeEngineForm.getLocalSSDInput.click();
        await pricingCalculatorPage.computeEngineForm
            .getLocalSSDOption(testData.localSSD)
            .click();
        //    * Datacenter location: Frankfurt (europe-west3) - changed to Netherlands (europe-west4)

        await pricingCalculatorPage.computeEngineForm.getRegionInput.click();

        await pricingCalculatorPage.computeEngineForm
            .getRegionSelectOption(testData.regionSelect)
            .click();

        //    * Committed usage: 1 Year
        await pricingCalculatorPage.computeEngineForm
            .getCommitedUseDiscountOption(testData.commitedUseDiscount)
            .click();

        // Share and open estimate summary

        await Helpers.waitUntilHelper(
            pricingCalculatorPage.costDetailPanel.getShareEstimatedCostBtn
        );

        // Need for correctly click btn idk why
        await browser.pause(1000);

        await pricingCalculatorPage.costDetailPanel.getShareEstimatedCostBtn.click();

        await Helpers.waitUntilHelper(
            pricingCalculatorPage.shareEstimatePopup.findByString(
                'Open estimate summary'
            )
        );

        await pricingCalculatorPage.shareEstimatePopup
            .findByString('Open estimate summary')
            .click();

        // 2nd tab
        await browser.pause(1000);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[handles.length - 1]);

        await Helpers.waitUntilHelper(
            costSummaryPage.totalCostModal.getTotalEstimatedCostValue
        );

        // Step 11: Verify the summary

        const numberOfInstances =
            await costSummaryPage.selectedOptions.getNumberOfInstancesValue.getText();
        const operatingSystemSoftware =
            await costSummaryPage.selectedOptions.getOperatingSystemSoftwareValue.getText();
        const provisioningModel =
            await costSummaryPage.selectedOptions.getProvisioningModelValue.getText();
        const machineType =
            await costSummaryPage.selectedOptions.getMachineTypeValue.getText();
        const gpuModel =
            await costSummaryPage.selectedOptions.getGPUModelValue.getText();
        const numberOfGPUs =
            await costSummaryPage.selectedOptions.getNumberOfGPUsValue.getText();
        const localSSD =
            await costSummaryPage.selectedOptions.getLocalSSDValue.getText();
        const regionSelect =
            await costSummaryPage.selectedOptions.getRegionSelectValue.getText();
        const commitedUseDiscount =
            await costSummaryPage.selectedOptions.getCommitedUseDiscountValue.getText();

        expect(numberOfInstances).to.equal(
            testData.numberOfInstances.toString()
        );
        expect(operatingSystemSoftware).to.equal(
            testData.operatingSystemSoftware
        );
        expect(provisioningModel).to.equal(testData.provisioningModel);
        // expect(machineFamily).to.equal(testData.machineFamily);
        expect(machineType.split(',')[0].trim()).to.equal(testData.machineType);
        expect(gpuModel).to.equal(testData.gpuModel);
        expect(numberOfGPUs).to.equal(testData.numberOfGPUs);
        expect(localSSD).to.equal(testData.localSSD);
        expect(regionSelect).to.equal(testData.regionSelect);
        expect(commitedUseDiscount).to.equal(testData.commitedUseDiscount);
    });
});
