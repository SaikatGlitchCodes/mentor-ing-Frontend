import { Field, ErrorMessage } from 'formik'
import React from 'react'

export default function NameAddress() {
    return (
        <div className="grid grid-cols-1 mt-4 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                </label>
                <div className="mt-2">
                    <Field
                        id="name"
                        name="name"
                        type="text"
                        className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <ErrorMessage name="name" component="span" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="col-span-full">
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                    Address
                </label>
                <div className="mt-2">
                    <Field
                        id="address"
                        name="address"
                        type="text"
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <ErrorMessage name="address" component="span" className="mt-1 text-sm text-red-500" />
            </div>
        </div>
    )
}