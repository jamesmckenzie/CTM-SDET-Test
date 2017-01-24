var CommonElements = require('../page-objects/common-elements');
var Helpers = require('../protractor-helpers');

module.exports = function () {
    var helpers = new Helpers();
    var commonElements = new CommonElements();
    this.url = browser.baseUrl + 'energy/v2/yourUsage?AFFCLIE=TSTT';

    this.nextButton = commonElements.nextButton;
    this.backButton = commonElements.backButton;

    this.homeSizeRadioOptions = element.all(by.model('ctrl.energyModel.NoBillViewModel.HouseSize'))
    this.howManyPeopleRadioOptions = element.all(by.model('ctrl.energyModel.NoBillViewModel.NumberOfOccupants'))
    this.mainHeatSourceRadioOptions = element.all(by.model('ctrl.energyModel.NoBillViewModel.MainHeatingSource'))
    this.whatTemperatureRadioOptions = element.all(by.model('ctrl.energyModel.NoBillViewModel.HeatingUsage'))
    this.insulationRadioOptions = element.all(by.model('ctrl.energyModel.NoBillViewModel.HouseInsulation'))
    this.mainCookingSourceRadioOptions = element.all(by.model('ctrl.energyModel.NoBillViewModel.MainCookingSource'))
    this.howoftenHomeRadioOptions = element.all(by.model('ctrl.energyModel.NoBillViewModel.HouseOccupied'))

    this.selectHomeSizeRadio = function (homeSize) {
        helpers.selectRadioByText(this.homeSizeRadioOptions, homeSize);
    }   

    this.selecthowManyPeopleRadio = function (howManyPeople) {
        helpers.selectRadioByText(this.howManyPeopleRadioOptions, howManyPeople);
    }       

    this.selectMainHeatSourceRadio = function (mainHeatSource) {
        helpers.selectRadioByText(this.mainHeatSourceRadioOptions, mainHeatSource);
    }

    this.selectWhatTemperatureRadio = function (temperature) {
        helpers.selectRadioByText(this.whatTemperatureRadioOptions, temperature);
    }

    this.selectInsulationRadioOptions = function (insulation) {
        helpers.selectRadioByText(this.insulationRadioOptions, insulation);
    }

    this.selectMainCookingSourceRadioOptions = function (cookingSource) {
        helpers.selectRadioByText(this.mainCookingSourceRadioOptions, cookingSource);
    }

    this.selectHowoftenHomeRadioOptions = function (howOftenHome) {
        helpers.selectRadioByText(this.howoftenHomeRadioOptions, howOftenHome);
    }

    this.completeEnergyUsageWizard = function (energyUsageDetails) {
        if (energyUsageDetails.homeSize) {
            this.selectHomeSizeRadio(energyUsageDetails.homeSize);
        }
        if (energyUsageDetails.howManyPeople) {
            this.selecthowManyPeopleRadio(energyUsageDetails.howManyPeople);
        }
        if (energyUsageDetails.mainHeatSource) {
            this.selectMainHeatSourceRadio(energyUsageDetails.mainHeatSource);
        }
        if (energyUsageDetails.temperature) {
            this.selectWhatTemperatureRadio(energyUsageDetails.temperature);
        }
        if (energyUsageDetails.insulation) {
            this.selectInsulationRadioOptions(energyUsageDetails.insulation);
        }
        if (energyUsageDetails.cookingSource) {
            this.selectMainCookingSourceRadioOptions(energyUsageDetails.cookingSource);
        }
        if (energyUsageDetails.howOftenHome) {
            this.selectHowoftenHomeRadioOptions(energyUsageDetails.howOftenHome);
        }    
        this.nextButton.click();
    }
};