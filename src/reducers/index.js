import { combineReducers } from 'redux'

import repos from './repos'
import config from './config'

export default combineReducers({
  repos,
  config
})
