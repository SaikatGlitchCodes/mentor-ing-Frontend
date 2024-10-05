import { ErrorMessage, useFormikContext } from 'formik';
import React from 'react';
import PhoneInput from 'react-phone-number-input';

export default function PhoneNumber() {
    const { setFieldValue, values } = useFormikContext();
    
    return (
        <>
            <div className="mt-4 sm:col-span-4 ">
                <label htmlFor="phone_number" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone Number
                </label>
                <div className="mt-2">
                    <PhoneInput
                        value={values['phone_number']}
                        name="phone_number"
                        defaultCountry={values?.address?.country_code.toUpperCase() || 'US'}
                        onChange={value => setFieldValue('phone_number', value)}
                        className='block w-full md:w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 px-3 outline-none'
                    />
                </div>
                <ErrorMessage name="phone_number" component="span" className="mt-1 text-sm text-red-500" />
            </div>
        </>
    );
}

