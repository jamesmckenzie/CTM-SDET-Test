module.exports = function () {
    this.url = browser.baseUrl + 'energy/Results/YourResults';

    this.loadingOverlay = element(by.id('price-page-loading-spinner'));

    this.resultsRows = element.all(by.css('.list-view-row'));
};