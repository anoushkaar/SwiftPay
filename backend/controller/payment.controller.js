import { Payment } from "../model/User.model.js";

const getPaymentAccount = async (req, res) => {
  try {
    const { email } = req.params;
    const paymentAccount = await Payment.findOne({ email });
    // obtaining the paymentAccount to get the balance
    if (!paymentAccount) {
      return res.status(404).json({
        message: "Payment account not found",
      });
    }
    res.status(200).json({
      message: "Payment account fetched successfully",
      paymentAccount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const moneyHandler = async (req, res) => {
  try {
    const { senderEmail } = req.params;
    const { toReceiver, amount } = req.body;

    const receiverAccount = await Payment.findOne({ email: toReceiver });
    const senderAccount = await Payment.findOne({ email: senderEmail });

    if (!receiverAccount || !senderAccount) {
      return res.status(404).json({
        message: "Sender or receiver account not found",
      });
    }
    // parseFloat : in JavaScript parses a string and returns its floating point number
    if (parseFloat(senderAccount.balance) < parseFloat(amount)) {
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    // Deduct amount from sender
    senderAccount.balance =
      // for eg if i have 1000rs in my acc and i spend 800 for buying something, i have 200rs in hand. here, the 1000rs is my balance amount, the amount is the money i spent that i used for buying something and the 200rs is the money that i currently have in my account from sendersaccount.
      (parseFloat(senderAccount.balance) - parseFloat(amount)).toString();
    await senderAccount.save();

    // Add amount to receiver

    receiverAccount.balance =
      // balance 1000+800 curr saving=1800 credit to receivers acc
      (parseFloat(receiverAccount.balance) + parseFloat(amount)).toString();
    await receiverAccount.save();

    res.status(200).json({
      message: "Money sent successfully",
      senderAccount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { getPaymentAccount, moneyHandler };
