const express = require("express");
const axios = require("axios");
const querystring = require("querystring");

const app = express();
const port = 3000;

async function checkoutRequest(req, res) {
  console.log(req.query);
  const {
    ssl_merchant_id,
    ssl_user_id,
    ssl_pin,
    ssl_transaction_type,
    ssl_amount,
    ssl_first_name,
    ssl_last_name,
    ssl_email,
    ssl_phone,
    ssl_avs_address,
    ssl_avs_zip,
    ssl_city,
    ssl_state,
    ssl_country,
    ssl_ship_to_address1,
    ssl_ship_to_city,
    ssl_ship_to_country,
    ssl_ship_to_first_name,
    ssl_ship_to_last_name,
    ssl_ship_to_phone,
    ssl_ship_to_state,
    ssl_ship_to_zip,
    ssl_merchant_txn_id,
  } = req.query;

  const requestBody = querystring.stringify({
    ssl_merchant_id,
    ssl_user_id,
    ssl_pin,
    ssl_transaction_type,
    ssl_amount,
    ssl_first_name,
    ssl_last_name,
    ssl_email,
    ssl_phone,
    ssl_avs_address,
    ssl_avs_zip,
    ssl_city,
    ssl_state,
    ssl_country,
    ssl_ship_to_address1,
    ssl_ship_to_city,
    ssl_ship_to_country,
    ssl_ship_to_first_name,
    ssl_ship_to_last_name,
    ssl_ship_to_phone,
    ssl_ship_to_state,
    ssl_ship_to_zip,
    ssl_merchant_txn_id,
  });

  const options = {
    headers: {
      referer: "https://www.terragroupranges.com",
      "content-type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios.post(
      "https://api.convergepay.com/hosted-payments/transaction_token",
      requestBody,
      options
    );
    res.json(response.data);
  } catch (err) {
    console.log("The request to the Checkout API failed.", err);
    res.status(500).json({ error: "The request to the Checkout API failed." });
  }
}

app.get("/checkout", checkoutRequest);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
