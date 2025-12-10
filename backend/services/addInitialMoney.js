import { Payment } from '../model/User.model.js';

const addInitialMoney = async (email, amount) => {
  try {
    const paymentAccount = await Payment.create({ email, balance });
    if (paymentAccount) {
      return `Initial money of ${amount} added to ${email}`;
    }

  } catch (error) {
    console.log("Error adding initial money:", error);
  }

};
export default addInitialMoney;
