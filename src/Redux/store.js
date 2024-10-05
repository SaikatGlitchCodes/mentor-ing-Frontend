import { configureStore } from '@reduxjs/toolkit'
import RequestTutor from './RequestGuide';
import UserData from './UserGuide';

export const store = configureStore({
  reducer: {
    request_a_tutor: RequestTutor,
    user_data: UserData
  },
})