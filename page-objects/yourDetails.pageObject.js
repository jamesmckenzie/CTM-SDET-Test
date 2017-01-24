var CommonElements = require('../page-objects/common-elements');
var Helpers = require('../protractor-helpers');
var ResultsPage = require('../page-objects/yourResults.pageObject')

module.exports = function () {
    var commonElements = new CommonElements();
    var helpers = new Helpers();
    var resultsPage = new ResultsPage();
    
    this.url = browser.baseUrl + 'energy/v2/yourDetails?AFFCLIE=TSTT';

    this.backButton = commonElements.backButton;
    this.gotoPricesButton = element(by.buttonText('Go to prices'));

    this.tariffRadioOptions = element.all(by.model('ctrl.energyModel.PreSelectionTariff'));
    this.paymentTypeRadioOptions = element.all(by.model('ctrl.energyModel.PreSelectionPaymentType'));

    this.emailTextBox = element(by.id('Email'))
    this.termsCheckBox = element(by.id('terms'));

    this.selectTariffRadio = function (tariff) {
        helpers.selectRadioByText(this.tariffRadioOptions, tariff);
    }

    this.selectPaymentTypeRadioOptions = function (paymentType) {
        helpers.selectRadioByText(this.paymentTypeRadioOptions, paymentType);
    }

    this.completeDetailsAndSubmit = function (yourDetails) {
        this.selectTariffRadio(yourDetails.tariff);
        if (yourDetails.paymentType) {
            this.selectPaymentTypeRadioOptions(yourDetails.paymentType);
        }    
        this.emailTextBox.sendKeys(yourDetails.email);
        helpers.setCheckBox(this.termsCheckBox, true);
        browser.ignoreSynchronization = true;
        this.gotoPricesButton.click();
        var EC = browser.ExpectedConditions;
        browser.wait(EC.invisibilityOf(resultsPage.loadingOverlay), 30000);
    }
};