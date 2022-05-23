import { loadStripe } from '@stripe/stripe-js'
import { getEnv } from 'utils/config'

export const stripePromise = loadStripe(getEnv('STRIPE_PUBLISHABLE_KEY'))
