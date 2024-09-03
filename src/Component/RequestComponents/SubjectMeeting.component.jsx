import React from 'react'
import { Field, ErrorMessage, useFormikContext } from 'formik'
import { levels, meeting_options, request_type } from '../../Redux/RequestGuide'

export default function SubjectMeeting() {
    const { setFieldValue, values } = useFormikContext();
    return (
        <>
            <div className="mt-8 sm:col-span-4 w-96">
                <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                    Subject
                </label>
                <div className="mt-2">
                    <Field
                        id="subject"
                        name="subject"
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 px-3 outline-none"
                    />
                </div>
                <ErrorMessage name="subject" component="span" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="mt-4 sm:col-span-4 w-96">
                <label htmlFor="level" className="block text-sm font-medium leading-6 text-gray-900">
                    Level
                </label>
                <div className="mt-2">
                    <select name='level' onChange={e => setFieldValue('level', e.target.value)} className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-3 outline-none">
                        {
                            levels.map(level => <option value={level}>{level}</option>)
                        }
                    </select>
                </div>
                <ErrorMessage name="level" component="span" className="mt-1 text-sm text-red-500" />
            </div>
            <div className="mt-4 sm:col-span-4 w-96">
                <label htmlFor="i_want" className="block text-sm font-medium leading-6 text-gray-900">
                    I Want
                </label>
                <div className="mt-2">
                    <select onChange={e => setFieldValue('level', e.target.value)} className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-3 outline-none">
                        {
                            request_type.map(type => <option value={type}>{type}</option>)
                        }
                    </select>
                </div>
                <ErrorMessage name="i_want" component="span" className="mt-1 text-sm text-red-500" />
            </div>
            <div class="mt-5 space-y-2">
                <h1>Meeting options</h1>
                {
                    meeting_options.map(option => (
                        <div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                                <input id={option} name="meeting_options" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                            </div>
                            <div class="text-sm leading-6">
                                <label for={option} class="font-medium text-gray-900">{option}</label>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
