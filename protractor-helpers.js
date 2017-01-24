module.exports = function () {
    this.selectOptionByText = function (select, text) {
        var optionElement = select.element(by.cssContainingText('option', text));
        optionElement.click();
    };
    
    this.selectRadioByText = function (radioOptions, option) {
        radioOptions.filter(function (elem, index) {
            return elem.element(by.xpath('..')).getText().then(function (text) {
                return text.indexOf(option) >= 0;
            })
        }).first().element(by.xpath('..')).click();
    }

    this.setCheckBox = function (element, check) {
        if (check) {
            element.isSelected().then(function (selected) {
                if (!selected) {
                    browser.executeScript("arguments[0].click();", element.getWebElement());
                }
            });
        } else {
            element.isSelected().then(function (selected) {
                if (selected) {
                    browser.executeScript("arguments[0].click();", element.getWebElement());
                }
            });
        }
    }
}