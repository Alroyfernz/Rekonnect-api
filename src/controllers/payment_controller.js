const shortid = require("shortid");

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_live_Kvzf4vq5RV7FiC",
  key_secret: "oOmuttV5JCGJJ6P8V3kX3zcS",
});

const verify = (req, res) => {
  // do a validation
  const secret = "12345678";

  console.log(req.body);

  const crypto = require("crypto");

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(digest, req.headers["x-razorpay-signature"]);

  if (digest === req.headers["x-razorpay-signature"]) {
    console.log("request is legit");
    // process it
    require("fs").writeFileSync(
      "payment1.json",
      JSON.stringify(req.body, null, 4)
    );
  } else {
    // pass it
  }
  res.json({ status: "ok" });
};
const payment = async (req, res) => {
  const payment_capture = 1;
  const amount = 1;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { verify, payment };
