var expect = require('chai').expect;

var ConvergeLib = require('../index');


var convergeLib = new ConvergeLib('xxxx','yyyy','zzzz',true);
describe('valid scenarios', function() {
    describe('When the card is approved', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.collectPayment('John','Johnson','info@customer.com','5114630000009791', '05', '17', '123',1.99 ,'1234','this is what i sold')
                .then(function(response){

                    valid = response.txn.ssl_result_message === 'APPROVED';
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });


    describe('When collectPaymentwithoutCVV approved', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.collectPaymentwithoutCVV('John','Johnson','info@customer.com','5114630000009791', '05', '17' ,1.99 ,'1234','this is what i sold')
                .then(function(response){

                    valid = response.txn.ssl_result_message === 'APPROVED';
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });


    describe('When the card is indeed a CREDITCARD', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.collectPayment('John','Johnson','info@customer.com','5114630000009791', '05', '17', '123',1.99 ,'1234','this is what i sold')
                .then(function(response){
                    valid = response.txn.ssl_card_type === 'CREDITCARD';
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });

    describe('When the returned ssl_card_number is indeed 51**********9791', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.collectPayment('John','Johnson','info@customer.com','5114630000009791', '05', '17', '123',1.99 ,'1234','this is what i sold')
                .then(function(response){

                    valid = response.txn.ssl_card_number === '51**********9791';
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });




    describe('when generating a card token', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.generateToken('John','Johnson','info@customer.com','5114630000009791', '05', '17', '123')
                .then(function(response){
                    valid = (response.txn.ssl_add_token_response === 'Card Added');
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });


    describe('When paid via token 8004753777419791', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.collectPaymentByToken('8004753777419791',1.99 ,'1234','this is what i sold')
                .then(function(response){
                    valid = response.txn.ssl_card_number === '51**********9791';
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });


});




describe('invalid scenarios', function() {
    describe('When the card is expired', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.collectPayment('John','Johnson','info@customer.com','5114630000009791', '05', '12', '123',1.99 ,'1234','this is what i sold')
                .then(function(response){
                    valid = response.txn.errorCode === '5001';
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should fail', function() {
            expect(valid).to.be.true;
        });
    });


    describe('When the card is cvv is invalid', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.collectPayment('John','Johnson','info@customer.com','5114630000009791', '05', '12', '123',1.99 ,'123','this is what i sold')
                .then(function(response){
                    valid = response.txn.errorCode === '5001';
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should fail', function() {
            expect(valid).to.be.true;
        });
    });

});




describe('Different card types', function() {
    describe('When the card is AMEX', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.collectPayment('John','Johnson','info@customer.com','374101000000608', '05', '17', '123',1.99 ,'1234','this is what i sold')
                .then(function(response){
                    valid = response.txn.ssl_card_short_description === 'AMEX';
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });


    describe('When the card is VISA', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.collectPayment('John','Johnson','info@customer.com','4263970000005262', '05', '17', '123',1.99 ,'1234','this is what i sold')
                .then(function(response){
                    valid = response.txn.ssl_card_short_description === 'VISA';
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });

    describe('When the card is Mastercard', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.collectPayment('John','Johnson','info@customer.com','5425230000004415', '05', '17', '123',1.99 ,'1234','this is what i sold')
                .then(function(response){
                    valid = response.txn.ssl_card_short_description === 'MC';
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });

});

//Verify card
describe('Verify a credit card', function() {
    describe('When the card is AMEX', function() {
        var valid;
        this.timeout(10000);
        beforeEach(function(done) {
            convergeLib.verifyCard('374101000000608', '05', '17', '123')
                .then(function(response){
                    valid = response.txn.ssl_card_short_description === 'AMEX';
                    done();
                })
                .catch(function(err){
                    done();
                });
        })

        it('Then it should pass', function() {
            expect(valid).to.be.true;
        });
    });




});