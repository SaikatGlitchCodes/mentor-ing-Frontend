import { createSlice } from '@reduxjs/toolkit'

const ADD_FIELD = 'ADD_FIELD'

export const levels= [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
]

const price_options = [
    'fixed/flat',
    'per hour',
    'per day',
    'per month',
    'per year'
]
const gender_preference = [
    'None',
    'Prefer Male',
    'Prefer Female',
    'Only Male',
    'Prefer Female'
]
const tutors_want = [
    'Only one',
    'More than one',
    'As many as Possible',
]
const i_need_someone = [
    'full time',
    'part time',
    'volunteer',
    'student',
]
export const request_type = [
    'Tutoring',
    'Job Support',
    'Assignment'
]

export const meeting_options = [
    'Online (Using Zoom/Skype)',
    'At my place (home/institute)',
    'Travel to Tutor'
]
export const initialRequestData = {
    type: '',
    userId: '',
    email: '',
    name: '',
    address: '',
    phone_number: '',
    country: '',
    requirement: '',
    suggested_subject: [],
    sujects: [],
    level: '',
    meeting_option: '',
    budget: {
        price: 0,
        price_options: price_options[0]
    },
    gender_preference: gender_preference[0],
    tutors_want: tutors_want[0],
    i_need_someone: i_need_someone[0],
    language: '',
    get_tutors_from: '',
    upload_file: '',
    errors: {}
}

export const addField = (object) => ({
    type: ADD_FIELD,
    payload: object,
})

const requestSlice = createSlice({
    name: 'request',
    initialState: initialRequestData,
    reducers: {
        requestFieldAdder(state, action) {
            return { ...state, ...action.payload }
        },
    },
})

export const { requestFieldAdder } = requestSlice.actions
export default requestSlice.reducer  