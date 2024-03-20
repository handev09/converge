# Converge lib

If you want to use the converge virtual merchant platform to handle your transactions. This library is a plug and play solution

https://www.convergepay.com/converge-webapp/developer/#/converge


## Usage

```js

var ConvergeLib = require('../index');
//pass your credentials
var convergeLib = new ConvergeLib(merchantId, userId, pin, testMode);


//Collect a payment
convergeLib.collectPayment('John','Johnson','info@customer.com','5114630000009791', '05', '17', '123',1.99 ,'1234','this is what i sold')
                .then(function(response){
                    console.log(response);
                })
                .catch(function(err){
                    console.error('error',err);
                    
                });
                
//Verify a card
convergeLib.verifyCard('374101000000608', '05', '17', '123')
                .then(function(response){
                    console.log('response ',response);
                })
                .catch(function(err){
                    console.error('error',err);
                });
                
//generate a token so you can use it later                
convergeLib.generateToken('John','Johnson','info@customer.com','5114630000009791', '05', '17', '123')
                .then(function(response){
                   console.log('response ',response);
               })
               .catch(function(err){
                   console.error('error',err);
               });
               
//generate a token so you can use it later  since PCI doesn't allow you to store the card info              
convergeLib.collectPaymentByToken('8004753777419791', '05', '17', '123',1.99 ,'1234','this is what i sold')
               .then(function(response){
                  console.log('response ',response);
              })
              .catch(function(err){
                  console.error('error',err);
              });
              
              
The responses have the following format
      { txn:
         { ssl_email: 'info@customer.com',
           ssl_card_short_description: 'MC',
           ssl_cvv2_response: 'P',
           ssl_last_name: 'Johnson',
           ssl_account_balance: 0,
           ssl_company: NaN,
           ssl_token: '8004753777419791',
           ssl_get_token: 'Y',
           ssl_token_response: 'SUCCESS',
           ssl_country: NaN,
           ssl_result_message: 'APPROVED',
           ssl_city: NaN,
           ssl_phone: NaN,
           ssl_invoice_number: '1234',
           ssl_promo_code: NaN,
           ssl_txn_id: '00000000-0000-0000-0000-00000000000',
           ssl_result: '0',
           ssl_completion_date: NaN,
           ssl_avs_response: 'X',
           ssl_account_status: NaN,
           ssl_approval_code: '123456',
           ssl_avs_zip: NaN,
           ssl_enrollment: NaN,
           ssl_loyalty_program: NaN,
           ssl_exp_date: '0517',
           ssl_tender_amount: NaN,
           ssl_departure_date: NaN,
           ssl_card_type: 'CREDITCARD',
           ssl_loyalty_account_balance: NaN,
           ssl_avs_address: NaN,
           ssl_address2: NaN,
           ssl_first_name: 'John',
           ssl_amount: 1.99,
           ssl_state: NaN,
           ssl_card_number: '51**********9791',
           ssl_issue_points: NaN,
           ssl_txn_time: '03/28/2016 09:58:13 AM',
           ssl_access_code: NaN } }

```

 