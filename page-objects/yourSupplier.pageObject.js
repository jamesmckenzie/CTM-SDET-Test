var CommonElements = require('../page-objects/common-elements');
var Helpers = require('../protractor-helpers');

module.exports = function () {
    var common = new CommonElements();
    var helpers = new Helpers();

    this.url = browser.baseUrl + 'energy/v2/?AFFCLIE=TSTT';    
   
    this.nextButton = common.nextButton;

    this.postCodeInput = element(by.model('ctrl.energyModel.Postcode'));
    this.findPostcodeButton = element(by.id('find-postcode'));
    this.haveBillRadioOptions = element.all(by.model('ctrl.energyModel.EnergyJourneyType'));
    this.whatToCompareRadioOptions = element.all(by.model('ctrl.energyModel.CompareWhat'));
    this.sameSupplierRadioOptions = element.all(by.model('ctrl.energyModel.BillViewModel.SameSupplier'));
    this.electrictySupplierRadioOptions = element.all(by.css('input[ng-model="ctrl.energyModel.ElectricitySupplierId"]'));
    this.gasSupplierRadioOptions = element.all(by.css('input[ng-model="ctrl.energyModel.GasSupplierId"]'));
    this.bothSupplierRadioOptions = element.all(by.css('input[ng-model="ctrl.energyModel.BillViewModel.DualFuelSupplierId"]'));
    this.electricitySupplierDropdown = element(by.css('select[ng-model="ctrl.energyModel.ElectricitySupplierId"]'));
    this.gasSupplierDropdown = element(by.css('select[ng-model="ctrl.energyModel.GasSupplierId"]'));
    this.bothSupplierDropdown = element(by.css('select[ng-model="ctrl.energyModel.BillViewModel.DualFuelSupplierId"]'));
    
    this.enterPostcode = function(postcode) {
        this.postCodeInput.sendKeys(postcode);
        this.findPostcodeButton.click();
    };
    
    this.selectHaveBillRadio = function (haveBill) { 
        helpers.selectRadioByText(this.haveBillRadioOptions, haveBill);
    }

    this.selectWhatToCompareRadio = function (whatToCompare) { 
        helpers.selectRadioByText(this.whatToCompareRadioOptions, whatToCompare);
    }

    this.selectSameSupplierRadio = function (isSameSupplier) { 
        helpers.selectRadioByText(this.sameSupplierRadioOptions, isSameSupplier);
    }    

    this.selectElectricitySupplierRadio = function (elecSupplier) { 
        helpers.selectRadioByText(this.electrictySupplierRadioOptions, elecSupplier);
    }    

    this.selectGasSupplierRadio = function (gasSupplier) { 
        helpers.selectRadioByText(this.gasSupplierRadioOptions, gasSupplier);
    }
    
    this.selectEnergySupplierRadio = function (energySupplier) { 
        helpers.selectRadioByText(this.energySupplierRadioOptions, energySupplier);
    }   

    this.completeYourSupplierDetails = function (yourSupplierDetails) {
        this.enterPostcode(yourSupplierDetails.postcode);
        this.selectHaveBillRadio(yourSupplierDetails.hasBillHandy);
        this.selectWhatToCompareRadio(yourSupplierDetails.whatToCompare);
        if (yourSupplierDetails.isSameSupplier) {
            this.selectSameSupplierRadio(yourSupplierDetails.isSameSupplier);
        }    
        if (yourSupplierDetails.elecSupplier) {
            this.selectElectricitySupplierRadio(yourSupplierDetails.elecSupplier);
        }
        if (yourSupplierDetails.gasSupplier) {
            this.selectGasSupplierRadio(yourSupplierDetails.gasSupplier);
        }    
        this.nextButton.click();
    }
};