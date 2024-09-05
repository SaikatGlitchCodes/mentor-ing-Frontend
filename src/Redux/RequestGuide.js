import { createSlice } from '@reduxjs/toolkit'
import { initialRequestData } from '../services/request_a_tutor/request_a_tutor.constant'
const ADD_FIELD = 'ADD_FIELD'

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