import { Field, ErrorMessage     } from 'formik'
import React from 'react'

export default function Description() {
    return (
        <div className="mt-4 col-span-full">
            <label htmlFor="requirement" className="block text-sm font-medium leading-6 text-gray-900">
                Descripe Your Requriement
            </label>
            <p className="mt-3 text-sm leading-6 text-red-600/70">Please don't share any contact details (phone, email, website etc) here </p>
            <div className="mt-2">
                <Field
                    id="requirement"
                    name="requirement"
                    component="textarea"
                    rows={3}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 h-52 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                    placeholder='Example: I am looking for someone with experience in teaching IGCSE Maths online to young kids. My daughter is available from 4.30 pm EST to 8.30 pm EST on weekdays and flexible on Weekends. You should have a digital pen and good internet connection. My budget is a maximum of $35 per hour.'
                />
            </div>
            <ErrorMessage name="requirement" component="span" className="mt-1 text-sm text-red-500" />
        </div>
    )
}
