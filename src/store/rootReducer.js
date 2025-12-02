// ** Reducers Imports
import navbar from '@src/store/navbar'
import layout from '@src/store/layoutSlice'
import authReducer from '@src/store/authSlice'
import { baseApi } from '@src/store/api/baseApi'

const rootReducer = {
  auth: authReducer,
  navbar,
  layout,
  [baseApi.reducerPath]: baseApi.reducer,
}

export default rootReducer
