import { browser, $ } from '@wdio/globals';
import { expect } from 'chai';
import IndexPage from '../../p-o/pages/index.page.js';
import Helpers from '../../p-o/helpers/helpers.js';
import PricingCalculatorPage from '../../p-o/pages/pricingCalculator.page.js';
import CostSummaryPage from '../../p-o/pages/costSummary.page.js';

const indexPage = new IndexPage();
const pricingCalculatorPage = new PricingCalculatorPage();
const costSummaryPage = new CostSummaryPage();

describe('Google Cloud Platform Pricing Calculator', () => {
    beforeEach(async () => {
        await indexPage.open();
        await indexPage.removePopups();
    });

    it('should calculate the cost for specific compute engine settings', async () => {
        // // Open the Google Cloud page
        // await browser.url('https://cloud.google.com/');

        // browser.pause(2000);
        // await $('//*[@id="glue-cookie-notification-bar-1"]/button').click();

        // "Google Cloud Platform Pricing Calculator" and perform the search

        await indexPage.searchBar.click();
        await indexPage.searchBar.setValue(
            'Google Cloud Platform Pricing Calculator'
        );

        browser.keys('Enter');

        // Navigate to the Pricing Calculator

        await $(
            Helpers.findByTextWithXPath('Google Cloud Pricing Calculator')
        ).click();

        await browser.waitUntil(
            async () => {
                return await pricingCalculatorPage.addToEstimateBtn.isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg: 'Expected btn to be displayed after 5 seconds',
            }
        );
        await pricingCalculatorPage.addToEstimateBtn.click();

        // Select COMPUTE ENGINE

        await browser.waitUntil(
            async () => {
                return await pricingCalculatorPage.computeEngineBtn.isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg: 'Expected text to be displayed after 5 seconds',
            }
        );
        await (await pricingCalculatorPage.computeEngineBtn).click();
        // Fill out the form

        //         Number of instances: 4
        await pricingCalculatorPage.numberOfInstancesInput.setValue('4');
        //    * What are these instances for?: leave blank
        //    * Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or another User-Provided OS
        await pricingCalculatorPage.operatingSystemSoftwareInput.click();
        await browser.waitUntil(
            async () => {
                return await pricingCalculatorPage
                    .operatingSystemSoftwareOptions(
                        'free-debian-centos-coreos-ubuntu-or-byol-bring-your-own-license'
                    )
                    .isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg: 'Expected option to be displayed after 5 seconds',
            }
        );
        await pricingCalculatorPage
            .operatingSystemSoftwareOptions(
                'free-debian-centos-coreos-ubuntu-or-byol-bring-your-own-license'
            )
            .click();

        //    * Provisioning model: Regular

        (await pricingCalculatorPage.provisioningModelRegularBtn).click();

        //    * Machine Family: General purpose

        await pricingCalculatorPage.machineFamilyInput.click();
        await pricingCalculatorPage
            .machineFamilySelectOption('general-purpose')
            .waitForClickable();
        await pricingCalculatorPage
            .machineFamilySelectOption('general-purpose')
            .click();
        // await $('//*[@data-value="general-purpose"]').click();

        //    * Series: N1

        await pricingCalculatorPage.seriesInput.click();
        await pricingCalculatorPage.seriesSelectOption('n1').click();

        //    * Machine type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)

        await pricingCalculatorPage.machineTypeInput.click();

        await pricingCalculatorPage
            .machineTypeSelectOption('n1-standard-8')
            .click();
        // await $('//*[@aria-describedby="c32"]').click();
        // await $('[data-value="n1-standard-8"]').click();

        //    * Select “Add GPUs“

        await pricingCalculatorPage.AddGpusBtn.click();

        //     * GPU type: NVIDIA Tesla V100

        await browser.waitUntil(
            async () => {
                return await pricingCalculatorPage.gpuModelInput.isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg:
                    'Expected dpuModelInput to be displayed after 5 seconds',
            }
        );
        await pricingCalculatorPage.gpuModelInput.click();
        await pricingCalculatorPage
            .gpuModelSelectOption('nvidia-tesla-v100')
            .click();
        // //            * Number of GPUs: 1
        (await pricingCalculatorPage.numberOfGPUsInput).click();
        await pricingCalculatorPage.numberOfGPUsSelectOption('1');

        // await $('//*[@data-field-type="174"]').click();
        // await $('//*[@aria-label="Number of GPUs"]/*[@data-value="1"]').click();

        // //    * Local SSD: 2x375 Gb
        await pricingCalculatorPage.localSSDInput.click();
        await pricingCalculatorPage.localSSDSelectOption('2').click();

        // //    * Datacenter location: Frankfurt (europe-west3) - changed to Netherlands (europe-west4)

        await pricingCalculatorPage.regionInput.click();

        await pricingCalculatorPage.regionSelectOption('europe-west4').click();
        // await $('//*[@data-field-type="115"]').click();
        // await $('[data-value="europe-west4"]').click();
        // //    * Committed usage: 1 Year
        await pricingCalculatorPage.select1YearCommittedUse.click();

        // // Check the price

        // Wait for updated price - idk how i can wait for final value displayed
        await browser.pause(2000);

        const priceLabel = await pricingCalculatorPage.estimatedPriceWithLabel;
        const priceText = await priceLabel.getText();
        // expect($($('//*[contains(text(), "$5,628.90")]'))).toBeDisplayed();

        // // Share and open estimate summary

        await pricingCalculatorPage.shareEstimatedCostBtn.click();
        await browser.waitUntil(
            async () => {
                return await $(
                    Helpers.findByTextWithXPath('Open estimate summary')
                ).isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg:
                    'Expected "Open estimate summary" to be displayed after 5 seconds',
            }
        );

        $(Helpers.findByTextWithXPath('Open estimate summary')).click();

        // 2nd tab
        await browser.pause(1000);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[handles.length - 1]);

        await browser.waitUntil(
            async () => {
                return await costSummaryPage.totalEstimatedCostValue.isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg:
                    'Expected //h4[contains(text(), "$")] to be displayed after 5 seconds',
            }
        );
        const sharedPageCostSelector =
            await costSummaryPage.totalEstimatedCostValue;
        const sharedPageCost = await sharedPageCostSelector.getText();
        // Step 11: Verify the summary
        expect(sharedPageCost).to.equal(priceText);
    });
});
