import React from 'react';
import { ErrorMessage, useFormikContext, Field } from 'formik';
import Select from 'react-select';
import { levels, request_type, meeting_options } from '../../services/request_a_tutor/request_a_tutor.constant';



export default function SubjectMeeting() {
    const { setFieldValue, values } = useFormikContext();

    const handleChange = (option) => {
        setFieldValue('meeting_options', {
            ...values.meeting_options,
            [option]: !values.meeting_options[option],
        });
    };


    const subjectOptions = [
        { value: 'ocean', label: 'Ocean' },
        { value: 'sea', label: 'Sea' }
    ];
    
    return (
        <>
            <div className="mt-8 sm:col-span-4 w-96">
                <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                    Subject
                </label>
                <div className="mt-2">
                    <Select
                        isMulti
                        name="subject"
                        options={subjectOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={value => setFieldValue('subject', value)}
                    />
                </div>
                <ErrorMessage name="subject" component="span" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="mt-4 sm:col-span-4 w-96">
                <label htmlFor="level" className="block text-sm font-medium leading-6 text-gray-900">
                    Level
                </label>
                <div className="mt-2">
                    <select
                        name='level'
                        value={values.level}
                        onChange={e => setFieldValue('level', e.target.value)}
                        className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-3 outline-none"
                    >
                        <option disabled>Select level</option>
                        {levels.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
                <ErrorMessage name="level" component="span" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="mt-4 sm:col-span-4 w-96">
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                    I Want
                </label>
                <div className="mt-2">
                    <select
                        name='type'
                        value={values.type}
                        onChange={e => setFieldValue('type', e.target.value)}
                        className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-3 outline-none"
                    >
                        {request_type.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <ErrorMessage name="type" component="span" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="mt-5 space-y-2">
                <h1>Meeting options</h1>
                {Object.entries(meeting_options).map(([option, defaultValue]) => (
                    <div key={option} className="relative flex gap-x-3">
                        <div className="flex items-center h-6">
                            <Field
                                id={option}
                                name={`meeting_options.${option}`}
                                type="checkbox"
                                checked={values.meeting_options?.[option] ?? defaultValue}
                                onChange={() => handleChange(option)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor={option} className="font-medium text-gray-900">
                                {option}
                            </label>
                        </div>
                    </div>
                ))}
                <ErrorMessage name="meeting_options" component="span" className="mt-1 text-sm text-red-500" />
            </div>
        </>
    );
}