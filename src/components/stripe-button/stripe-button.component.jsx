import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51I96lKKK0xX483Ygqf2Lk2PvueK6LZtCV8DJN3SK83ahTms12XKj7bFc50mkmjFVcNLnPzotyTSlFDCdfAmMeIiU00yfDLTvxH';

  const onToken = token => {
    console.log(token);
    alert('Payment Succsesful');
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