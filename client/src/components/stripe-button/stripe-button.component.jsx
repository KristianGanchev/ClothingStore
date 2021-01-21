import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51I96lKKK0xX483Ygqf2Lk2PvueK6LZtCV8DJN3SK83ahTms12XKj7bFc50mkmjFVcNLnPzotyTSlFDCdfAmMeIiU00yfDLTvxH';

  const onToken = token => {
    axios({
      url: 'payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }).then(response => {
      alert('Payment successful');
    }).catch(error => {
      console.log('Payment error: ', JSON.parse(error));
      alert('There was an issue with your payment! Make sure you use the provided credit cart!');
    });
  }

  return(
    <StripeCheckout 
      label='Pay Now'
      name='Clothing Store Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
};

export default StripeCheckoutButton;