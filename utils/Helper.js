import {
  requestPromise
} from './requests.js'
import {
  getToken
} from './Authorizations.js'

const verifyPhone = async(number) => {
  let token = await getToken()
  let data = {
    "phone": number
  }
  let response = await requestPromise("GET", `/phone_verify`, data, token)
  return response
}
export default {
  verifyPhone
}