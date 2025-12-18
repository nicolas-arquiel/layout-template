// ** Reducers Imports
import navbar from '@src/store/navbar'
import layout from '@src/store/layoutSlice'
import authReducer from '@src/store/auth/authSlice'
import { baseApi } from '@src/store/api/baseApi'
import { secondApi } from '@src/store/api/secondApi'

const rootReducer = {
  auth: authReducer,
  navbar,
  layout,
  [baseApi.reducerPath]: baseApi.reducer,
  [secondApi.reducerPath]: secondApi.reducer,
}

export default rootReducer
