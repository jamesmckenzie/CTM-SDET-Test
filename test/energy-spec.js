describe('Compare the Market Energy Journey', function () {
    beforeEach(function () {
        browser.get('https://energy.comparethemarket.com/energy/v2/?AFFCLIE=TSTT');
    });

    afterEach(function () {
        browser.manage().deleteAllCookies();
    });
    
    describe('User Journey 1', function () {
        it('should work', function () {

            var yourSupplierDetails = {
            }

            var yourEnergyDetails = {
            }

            var yourDetails = {
            }            
        });        
    });

    describe('User Journey 2', function () {
        it('should work', function () {
        });        
    });
    
    describe('User Journey 3', function () {
        it('should work', function () {
        });        
    });    
});