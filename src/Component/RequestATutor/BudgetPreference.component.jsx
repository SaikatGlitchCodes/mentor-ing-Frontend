import React, { useEffect } from 'react';
import { gender_preference, i_need_someone, price_options, tutors_want } from '../../services/request_a_tutor/request_a_tutor.constant';
import { useFormikContext, ErrorMessage, Field } from 'formik';
import Select from 'react-select';
import {  getAllInfoByISO } from 'iso-country-currency';
import ISO6391 from 'iso-639-1';

export default function BudgetPreference() {
    const { setFieldValue, values } = useFormikContext();
    const currency_detail = getAllInfoByISO(values?.address?.country_code || 'US');

    useEffect(()=>{
        setFieldValue('price_currency_symbol',currency_detail.symbol)
        setFieldValue('price_currency',currency_detail.currency)
    },[])

    return (
        <div className="grid grid-cols-1 mt-4 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="block sm:col-span-3">
                <label htmlFor="price_amount" className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">{currency_detail.symbol}</span>
                    </div>
                    <Field type="text" name="price_amount"  id="price_amount" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00"/>
                        <div className="absolute inset-y-0 right-0 flex items-center border-2">
                            <label htmlFor="price_option" className="sr-only">Value</label>
                            <Field as="select" id="price_option" name="price_option" className="h-full py-0 pl-2 bg-transparent border-0 rounded-md pr-7 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                                {
                                    price_options.map(opt=> <option value={opt} key={opt}>{opt}</option>)
                                }
                            </Field>
                        </div>
                </div>
            </div>
            <div className="block sm:col-span-3">
                <label htmlFor="gender_preference" className="block text-sm font-medium leading-6 text-gray-900">
                    Gender Preference
                </label>
                <div className="mt-2">
                    <select onChange={e => setFieldValue('gender_preference', e.target.value)} name='gender_preference' className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-3 outline-none">
                        {
                            gender_preference.map(gender => <option key={gender} value={gender}>{gender}</option>)
                        }
                    </select>
                </div>
                <ErrorMessage name="gender_preference" component="span" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="sm:col-span-3">
                <label htmlFor="tutors_want" className="block text-sm font-medium leading-6 text-gray-900">
                    Tutors Wanted
                </label>
                <div className="mt-2">
                    <select onChange={e => setFieldValue('tutors_want', e.target.value)} name='tutors_want' className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-3 outline-none">
                        {
                            tutors_want.map(tutor => <option key={tutor} value={tutor}>{tutor}</option>)
                        }
                    </select>
                </div>
                <ErrorMessage name="tutors_want" component="span" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="sm:col-span-3">
                <label htmlFor="i_need_someone" className="block text-sm font-medium leading-6 text-gray-900">
                    I need someone
                </label>
                <div className="mt-2">
                    <select onChange={e => setFieldValue('i_need_someone', e.target.value)} name='i_need_someone' className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-3 outline-none">
                        {
                            i_need_someone.map(need => <option key={need} value={need}>{need}</option>)
                        }
                    </select>
                </div>
                <ErrorMessage name="i_need_someone" component="span" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="sm:col-span-3">
                <label htmlFor="language" className="block text-sm font-medium leading-6 text-gray-900">
                    Language I prefer
                </label>
                <div className="mt-2">
                    <Select
                        isMulti
                        name="subject"
                        options={ISO6391.getAllCodes().map((code) => ({
                            value: code,
                            label: ISO6391.getName(code),
                          }))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={value => setFieldValue('language', value)}
                    />
                </div>
                <ErrorMessage name="language" component="span" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="sm:col-span-3">
                <label htmlFor="get_tutors_from" className="block text-sm font-medium leading-6 text-gray-900">
                    Get Tutors from
                </label>
                <div className="mt-2">
                    <Field
                        id="get_tutors_from"
                        name="get_tutors_from"
                        type="text"
                        className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <ErrorMessage name="get_tutors_from" component="span" className="mt-1 text-sm text-red-500" />
            </div>
        </div>
    )
}
