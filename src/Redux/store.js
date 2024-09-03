import { configureStore } from '@reduxjs/toolkit'
import RequestTutor from './RequestGuide'

export const store = configureStore({
  reducer: {
    request_a_tutor: RequestTutor
  },
})