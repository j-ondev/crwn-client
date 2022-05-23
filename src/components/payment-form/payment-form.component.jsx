import { useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { getEnv } from 'utils/config'
import { BUTTON_TYPE_CLASSES } from 'components/button/button.component'
import { selectCartSubtotal } from 'features/cart/cart.selector'
import { selectUser } from 'features/user/user.selector'

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from './payment-form.styles'

const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const amount = useSelector(selectCartSubtotal)
  const user = useSelector(selectUser)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const paymentHandler = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessingPayment(true)

    try {
      const response = await axios.post(
        `${getEnv('API_URL')}/stripe/create-payment-intent`,
        {
          amount: amount * 100,
        }
      )

      const {
        paymentIntent: { client_secret },
      } = response.data

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user ? user.display_name : 'Guest',
          },
        },
      })

      if (paymentResult.error) alert(paymentResult.error)

      if (paymentResult.paymentIntent.status === 'succeeded')
        alert('Payment Successful')
    } catch (error) {
      console.log(error)
    }

    setIsProcessingPayment(false)
  }

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm
