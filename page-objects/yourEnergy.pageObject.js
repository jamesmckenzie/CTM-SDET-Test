var CommonElements = require('../page-objects/common-elements');
var Helpers = require('../protractor-helpers');

module.exports = function () {
    var helpers = new Helpers();
    var commonElements = new CommonElements();
    
    this.nextButton = commonElements.nextButton;
    this.backButton = commonElements.backButton;

    this.urlNoBill = browser.baseUrl + 'energy/v2/yourEnergyNoBill?AFFCLIE=TSTT';
    this.urlBill = browser.baseUrl + 'energy/v2/yourEnergy?AFFCLIE=TSTT';

    this.electricityTariffDropdown = element(by.id('electricity-tariff-additional-info'));
    this.hasEconomy7MeterRadioOptions = element.all(by.model('ctrl.energyModel.Economy7'));
    this.electricityBillTypeDropdown = element(by.id('electricity-payment-method-dropdown-link'));
    this.electricityMainSourceRadioOptions = element.all(by.model('ctrl.energyModel.BillViewModel.MainHeatingSource'));
    this.economy7DayUsageTextBox = element(by.model('ctrl.energyModel.Economy7DayUsage'));
    this.economy7NightUsageTextBox = element(by.id('economy-7-night-usage'));
    this.electricityUsageTextBox = element(by.id('electricity-usage'));
    this.gasCurrentSpendTextBox = element(by.id('gas-current-spend'));
    this.gasDontknowCheckBox = element(by.id('gas-dont-know'));
    this.elecCurrentSpendTextBox = element(by.id('electricity-current-spend'));
    this.elecDontknowCheckBox = element(by.id('electricity-dont-know'));
    
    this.gasTariffDropdown = element(by.id('gas-tariff-additional-info'));
    this.gasBillTypeDropdown = element(by.id('gas-payment-method-dropdown-link'));
    this.gasMainSourceRadioOptions = element.all(by.model('ctrl.energyModel.BillViewModel.MainHeatingSource'));
    this.gasUsageTextBox = element(by.id('gas-usage'));

    this.hasPrePaymentMeterRadioOptions = element.all(by.model('ctrl.energyModel.PrePayment'));

    this.selectElectricityTariffDropdown = function (electricityTariff) { 
        helpers.selectOptionByText(this.electricityTariffDropdown, electricityTariff);
    }

    this.selectHasEconomy7MeterRadio = function (hasEconomy7Meter) { 
        helpers.selectRadioByText(this.hasEconomy7MeterRadioOptions, hasEconomy7Meter);
    }   

    this.selectElectricityBillTypeDropdown = function (elecBillType) { 
        helpers.selectOptionByText(this.electricityBillTypeDropdown, elecBillType);
    } 
    
    this.selectElectricityMainSourceRadio = function (isMainSource) { 
        helpers.selectRadioByText(this.electricityMainSourceRadioOptions, isMainSource);
    }   

    this.selectHasPrePaymentMeterRadio = function (hasPrePayMeter) { 
        helpers.selectRadioByText(this.hasPrePaymentMeterRadioOptions, hasPrePayMeter);
    }

    this.selectGasTariffDropdown = function (gasTariff) { 
        helpers.selectOptionByText(this.gasTariffDropdown, gasTariff);
    }    

    this.selectGasBillTypeDropdown = function (gasBillType) { 
        helpers.selectOptionByText(this.gasBillTypeDropdown, gasBillType);
    } 

    this.selectGasMainSourceRadio = function (isMainSource) {
        helpers.selectRadioByText(this.gasMainSourceRadioOptions, isMainSource);        
    }
    
    this.completeYourElectricityDetailsWithBill = function (yourEnergyDetails) {
        this.selectElectricityTariffDropdown(yourEnergyDetails.electricityTariff);
        this.selectHasEconomy7MeterRadio(yourEnergyDetails.hasEconomy7Meter);
        this.selectElectricityMainSourceRadio(yourEnergyDetails.isElectricityMainSourceOfHeating);
        this.selectElectricityBillTypeDropdown(yourEnergyDetails.elecBillType);
        if (yourEnergyDetails.elecUsageDay) {
            this.economy7DayUsageTextBox.sendKeys(yourEnergyDetails.elecUsageDay);
        }
        if (yourEnergyDetails.elecUsageNight) {
            this.economy7NightUsageTextBox.sendKeys(yourEnergyDetails.elecUsageNight);
        }    
        this.nextButton.click();
    }

    this.completeYourGasDetailsWithBill = function (yourEnergyDetails) {
        this.selectGasTariffDropdown(yourEnergyDetails.gasTariff);
        this.selectGasBillTypeDropdown(yourEnergyDetails.gasBillType);
        this.selectGasMainSourceRadio(yourEnergyDetails.isGasMainSourceOfHeating);
        this.gasUsageTextBox.sendKeys(yourEnergyDetails.gasUsage);
        this.nextButton.click();
    }

    this.completeYourEnergyDetailsWithNoBill = function (yourEnergyDetails) {
        if (yourEnergyDetails.hasPrePayMeter) {
            this.selectHasPrePaymentMeterRadio(yourEnergyDetails.hasPrePayMeter);
        }
        if (yourEnergyDetails.hasEconomy7Meter) {
            this.selectHasEconomy7MeterRadio(yourEnergyDetails.hasEconomy7Meter);
        }    
        if (yourEnergyDetails.gasCurrentSpend) {
            this.gasCurrentSpendTextBox.sendKeys(yourEnergyDetails.gasCurrentSpend);
        }    
        if (yourEnergyDetails.elecCurrentSpend) {
            this.elecCurrentSpendTextBox.sendKeys(yourEnergyDetails.elecCurrentSpend);
        }  
        if (this.gasDontknowCheckBox) {
            helpers.setCheckBox(this.gasDontknowCheckBox, yourEnergyDetails.dontKnowSpend);
        }    
        if (this.elecDontknowCheckBox) {
            helpers.setCheckBox(this.elecDontknowCheckBox, yourEnergyDetails.dontKnowSpend);
        }
        this.nextButton.click();
    }
};