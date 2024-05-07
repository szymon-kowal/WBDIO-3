import { browser, $ } from '@wdio/globals';
import { expect } from 'chai';
describe('Google Cloud Platform Pricing Calculator', () => {
    it('should calculate the cost for specific compute engine settings', async () => {
        // Open the Google Cloud page
        await browser.url('https://cloud.google.com/');

        browser.pause(2000);
        await $('//*[@id="glue-cookie-notification-bar-1"]/button').click();
        // "Google Cloud Platform Pricing Calculator" and perform the search
        await $('.mb2a7b').click();
        await $('.mb2a7b').setValue('Google Cloud Platform Pricing Calculator');

        browser.keys('Enter');

        // Navigate to the Pricing Calculator

        await $(
            '//*[contains(text(), "Google Cloud Pricing Calculator")]'
        ).click();

        await $('//*[contains(text(), "Add to estimate")]').click();

        // Step 5: Select COMPUTE ENGINE

        await browser.waitUntil(
            async () => {
                return await $('//div[@data-service-form="8"]').isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg: 'Expected text to be displayed after 5 seconds',
            }
        );
        await (await $('//div[@data-service-form="8"]')).click();
        // Step 6: Fill out the form

        //         Number of instances: 4
        await $('//input[@type="number"][@value="1"][@max="50000"]').setValue(
            '4'
        );
        //    * What are these instances for?: leave blank
        //    * Operating System / Software: Free: Debian, CentOS, CoreOS, Ubuntu, or another User-Provided OS
        await $('//*[@aria-controls="c20"]').click();
        await browser.waitUntil(
            async () => {
                return await $(
                    '//*[@data-value="free-debian-centos-coreos-ubuntu-or-byol-bring-your-own-license"]'
                ).isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg:
                    'Expected //*[@data-value="free-debian-centos-coreos-ubuntu-or-byol-bring-your-own-license"] to be displayed after 5 seconds',
            }
        );
        await $(
            '//*[@data-value="free-debian-centos-coreos-ubuntu-or-byol-bring-your-own-license"]'
        ).click();
        // //    * Provisioning model: Regular
        (await $('//*[@id="regular"]')).click();
        // //    * Machine Family: General purpose
        await $('//*[@aria-describedby="c24"]').click();
        await $('//*[@data-value="general-purpose"]').click();
        // //    * Series: N1
        await $('//*[@aria-controls="c28"]').click();
        await $('[data-value="n1"]').click();
        // //    * Machine type: n1-standard-8 (vCPUs: 8, RAM: 30 GB)
        await $('//*[@aria-describedby="c32"]').click();
        await $('[data-value="n1-standard-8"]').click();
        // //    * Select “Add GPUs“
        await $('[aria-label="Add GPUs"').click();
        // //            * GPU type: NVIDIA Tesla V100
        await browser.waitUntil(
            async () => {
                return await $('//*[@data-field-type="158"]').isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg:
                    'Expected //*[@data-field-type="158"] to be displayed after 5 seconds',
            }
        );
        await $('//*[@data-field-type="158"]').click();
        await $('[data-value="nvidia-tesla-v100"]').click();
        // //            * Number of GPUs: 1
        await $('//*[@data-field-type="174"]').click();
        await $('//*[@aria-label="Number of GPUs"]/*[@data-value="1"]').click();
        // //    * Local SSD: 2x375 Gb
        await $('//*[@data-field-type="180"]').click();
        await $('//*[@aria-label="Local SSD"]/*[@data-value="2"]').click();
        // //    * Datacenter location: Frankfurt (europe-west3)
        await $('//*[@data-field-type="115"]').click();
        await $('[data-value="europe-west4"]').click();
        // //    * Committed usage: 1 Year
        await $('//label[@for="1-year"]').click();

        // // Step 8: Check the price

        await browser.pause(1000);
        const priceLabel = await browser.$(
            '//*[@id="ucj-1"]/div/div/div/div/div/div/div/div[2]/div[1]/div/div[4]/div[1]/div[2]/label'
        );
        const priceText = await priceLabel.getText();
        console.log(priceText);
        // expect($($('//*[contains(text(), "$5,628.90")]'))).toBeDisplayed();

        // // Step 9 & 10: Share and open estimate summary

        await $('//button[@aria-label="Open Share Estimate dialog"]').click();
        await browser.waitUntil(
            async () => {
                return await $(
                    '//*[contains(text(), "Open estimate summary")]'
                ).isDisplayed();
            },
            {
                timeout: 5000,
                timeoutMsg:
                    'Expected //*[contains(text(), "Open estimate summary")] to be displayed after 5 seconds',
            }
        );
        await $('//*[contains(text(), "Open estimate summary")]').click();

        // 2nd tab
        await browser.pause(1000);
        const handles = await browser.getWindowHandles();
        await browser.switchToWindow(handles[handles.length - 1]);

        await browser.waitUntil(
            async () => {
                return await $('//h4[contains(text(), "$")]').isDisplayed();
            },
            {
                timeout: 15000,
                timeoutMsg:
                    'Expected //h4[contains(text(), "$")] to be displayed after 5 seconds',
            }
        );
        const sharedPageCostSelector = await $('//h4[contains(text(), "$")]');
        const sharedPageCost = await sharedPageCostSelector.getText();
        // Step 11: Verify the summary
        expect(sharedPageCost).to.equal(priceText);
    });
});
