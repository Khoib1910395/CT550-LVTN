import React, { useState } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

const StripeCheckout = ({ stripe }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handlePayment = async () => {
    const response = await stripe.createToken();
    if (response.error) {
      setErrorMessage(response.error.message);
    } else {
      // Gửi token về server để xử lý thanh toán
      const data = {
        token: response.token.id,
        amount: 1000, // Thay đổi số tiền thanh toán tại đây
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const res = await fetch('http://localhost:3030/payment', options);
      const result = await res.json();
      console.log(result);
    }
  };

  return (
    <div>
      <CardElement />
      {errorMessage && <div>{errorMessage}</div>}
      <button onClick={handlePayment}>Thanh toán</button>
    </div>
  );
};

export default injectStripe(StripeCheckout);
