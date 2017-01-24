var YourSupplierPage = require('../page-objects/yourSupplier.pageObject');
var YourEnergyPage = require('../page-objects/yourEnergy.pageObject');
var YourEnergyUsagePage = require('../page-objects/yourEnergyUsage.pageObject');
var YourDetailsPage = require('../page-objects/yourDetails.pageObject');
var YourResultsPage = require('../page-objects/yourResults.pageObject');

describe('Compare the Market Energy Journey', function () {
    var yourSupplierPage = new YourSupplierPage();
    var yourEnergyPage = new YourEnergyPage();
    var yourEnergyUsagePage = new YourEnergyUsagePage();
    var yourDetailsPage = new YourDetailsPage();
    var yourResultsPage = new YourResultsPage();

    beforeEach(function () {
        browser.get(yourSupplierPage.url);
    });

    afterEach(function () {
        browser.manage().deleteAllCookies();
        browser.ignoreSynchronization = false;
    });
    
    describe('User has their bill handy and wants to compare Gas and Electricity', function () {
        it('should take the user to the Gas and Electricity "Your Energy" pages before returning results', function () {
            var yourSupplierDetails = {
                postcode: 'PE2 6YS',
                hasBillHandy: 'Yes, I have my bill',
                whatToCompare: 'Gas & Electricity',
                elecSupplier: 'npower',
                gasSupplier: 'British Gas',
                isSameSupplier: 'No'
            };
            yourSupplierPage.completeYourSupplierDetails(yourSupplierDetails);
            expect(browser.getCurrentUrl()).toEqual(yourEnergyPage.urlBill);

            var yourEnergyDetails = {
                electricityTariff: 'Juice',
                hasEconomy7Meter: 'Yes',
                elecBillType: 'Monthly Direct Debit',
                isElectricityMainSourceOfHeating: 'No',
                elecUsageDay: '33',
                elecUsageNight: '20',
                gasTariff: 'Standard',
                gasBillType: 'Monthly Direct Debit',
                isGasMainSourceOfHeating: 'Yes',
                gasUsage: '442'
            };

            yourEnergyPage.completeYourElectricityDetailsWithBill(yourEnergyDetails);
            yourEnergyPage.completeYourGasDetailsWithBill(yourEnergyDetails);
            expect(browser.getCurrentUrl()).toEqual(yourDetailsPage.url);

            var yourDetails = {
                email: '5uc589+dj04jl1qoj5eo@sharklasers.com',
                tariff: 'Variable tariff',
                paymentType: 'All payment types'
            };
            
            yourDetailsPage.completeDetailsAndSubmit(yourDetails);

            expect(browser.getCurrentUrl()).toEqual(yourResultsPage.url);
            expect(yourResultsPage.resultsRows.count()).toBeGreaterThan(0);
        });        
    });

    describe('User does not have their bill handy but knows their current spend', function () {
        it('should take the user to the generic "Your Energy" page before returning results', function () {
            var yourSupplierDetails = {
                postcode: 'PE2 6YS',
                hasBillHandy: 'No, I don’t have my bill',
                whatToCompare: 'Gas only',
                gasSupplier: 'Scottish Power'
            };

            yourSupplierPage.completeYourSupplierDetails(yourSupplierDetails);
            expect(browser.getCurrentUrl()).toEqual(yourEnergyPage.urlNoBill);
                        
            var yourEnergyDetails = {
                hasPrePayMeter: 'Yes',
                gasCurrentSpend: '203',
                dontKnowSpend: false
            };

            yourEnergyPage.completeYourEnergyDetailsWithNoBill(yourEnergyDetails);
            expect(browser.getCurrentUrl()).toEqual(yourDetailsPage.url);
            
            var yourDetails = {
                email: '5uc589+dj04jl1qoj5eo@sharklasers.com',
                tariff: 'All tariffs'
            };
            
            yourDetailsPage.completeDetailsAndSubmit(yourDetails);

            expect(browser.getCurrentUrl()).toEqual(yourResultsPage.url);
            expect(yourResultsPage.resultsRows.count()).toBeGreaterThan(0);
        });        
    });
    
    describe('User does not have their bill handy and does not know their current spend', function () {
        it('should take the user to the Energy Usage "Your Energy" page before returning results', function () {
            var yourSupplierDetails = {
                postcode: 'PE2 6YS',
                hasBillHandy: 'No, I don’t have my bill',
                whatToCompare: 'Electricity only',
                elecSupplier: 'npower'
            };

            yourSupplierPage.completeYourSupplierDetails(yourSupplierDetails);
            expect(browser.getCurrentUrl()).toEqual(yourEnergyPage.urlNoBill);

            var yourEnergyDetails = {
                hasEconomy7Meter: 'No',
                hasPrePayMeter: 'No',
                elecCurrentSpend: '344',
                dontKnowSpend: true
           };

            yourEnergyPage.completeYourEnergyDetailsWithNoBill(yourEnergyDetails);
            expect(browser.getCurrentUrl()).toEqual(yourEnergyUsagePage.url);

            var yourEnergyUsageDetails = {
                homeSize: '3-4 Bedrooms',
                howManyPeople: '3-4 Occupants',
                mainHeatSource: 'Gas heating',
                temperature: 'Temperate',
                insulation: 'Well wrapped',
                cookingSource: 'Gas',
                howOftenHome: 'Most of the time'
            };

            yourEnergyUsagePage.completeEnergyUsageWizard(yourEnergyUsageDetails);

            var yourDetails = {
                email: '5uc589+dj04jl1qoj5eo@sharklasers.com',
                tariff: 'Fixed tariff',
                paymentType: 'Quarterly direct debit'
            };
            
           yourDetailsPage.completeDetailsAndSubmit(yourDetails);

            expect(browser.getCurrentUrl()).toEqual(yourResultsPage.url);
            expect(yourResultsPage.resultsRows.count()).toBeGreaterThan(0);
        });        
    });    
});