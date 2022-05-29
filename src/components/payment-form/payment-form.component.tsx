import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLazyQuery } from '@apollo/client'
import axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

import { getEnv } from 'utils/config'
import { BUTTON_TYPE_CLASSES } from 'components/button/button.component'
import { isApolloError, isStripeCardElement } from 'utils/ts/predicates'
import { selectCartSubtotal } from 'features/cart/cart.selector'
import { selectUser } from 'features/user/user.selector'
import { GET_USER } from 'apollo/user.queries'
import { BasicUser } from 'apollo/types/user'
import { QueryResultError } from 'apollo/types/apollo'

import {
  PaymentFormContainer,
  FormContainer,
  PaymentButton,
} from './payment-form.styles'

type GetUserResult = {
  User:
    | {
        __typename: 'UserArray'
        users: BasicUser[]
      }
    | QueryResultError
}

type GetUserVariables = {
  filter: {
    token: string
  }
}

const PaymentForm = () => {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const navigate = useNavigate()
  const stripe = useStripe()
  const elements = useElements()
  const amount = useSelector(selectCartSubtotal)
  const userState = useSelector(selectUser)
  const [GetUser] = useLazyQuery<GetUserResult, GetUserVariables>(GET_USER)

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userState) return navigate('/auth')

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

      const cardDetails = elements.getElement(CardElement)

      if (!isStripeCardElement(cardDetails)) return

      const { data: UserData } = await GetUser({
        variables: {
          filter: {
            token: userState.access_token,
          },
        },
      })

      if (
        typeof UserData?.User === 'undefined' ||
        isApolloError(UserData?.User)
      )
        return alert(UserData?.User.code || 'Error retrieving your data.')

      const user = UserData.User.users[0]

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardDetails,
          billing_details: {
            name: user ? user.display_name : 'Guest',
          },
        },
      })

      if (paymentResult.error) alert(paymentResult.error)

      if (paymentResult.paymentIntent?.status === 'succeeded')
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
