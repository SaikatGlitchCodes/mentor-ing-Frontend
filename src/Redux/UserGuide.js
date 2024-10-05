import { createSlice } from "@reduxjs/toolkit";

export const initialUserState = {
  user_id: null,
  name: null,
  role: 'user',
  phone_number: null,
  gender: null,
  email: null,
  address_id: null,
  bio: null,
  years_of_experience: null,
  joining_date: null,
  rating: 0,
  profile_img: null,
  hobbies: [],
  skills: [],
  languages: [],
  coin_balance: 0,
  status: 'active',
  occupation: null,
  location: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    updateUserField: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateUserSkills: (state, action) => {
      state.skills = action.payload;
    },
    updateUserLanguages: (state, action) => {
      state.languages = action.payload;
    },
    updateUserHobbies: (state, action) => {
      state.hobbies = action.payload;
    }
  },
});

export const { updateUserField, updateUserSkills, updateUserLanguages, updateUserHobbies } = userSlice.actions;
export default userSlice.reducer;