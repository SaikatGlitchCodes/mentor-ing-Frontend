import React from 'react';
import { ErrorMessage, useFormikContext, Field } from 'formik';
import Select from 'react-select';
import { levels, request_type, meeting_options } from '../../services/request_a_tutor/request_a_tutor.constant';

const subjectOptions = [
    { value: 'ocean', label: 'Ocean' },
    { value: 'sea', label: 'Sea' }
];

export default function SubjectMeeting() {
    const { setFieldValue, values } = useFormikContext();

    const handleMeetingOptionChange = (option) => {
        setFieldValue(`meeting_options.${option}.state`, !values.meeting_options[option].state);
    };

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
                        value={values.subject}
                    />
                </div>
                <ErrorMessage name="subject" component="span" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="mt-4 sm:col-span-4 w-96">
                <label htmlFor="level" className="block text-sm font-medium leading-6 text-gray-900">
                    Level
                </label>
                <div className="mt-2">
                    <Field
                        as="select"
                        name="level"
                        className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-3 outline-none"
                    >
                        <option value="">Select level</option>
                        {levels.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </Field>
                </div>
                <ErrorMessage name="level" component="span" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="mt-4 sm:col-span-4 w-96">
                <label htmlFor="type" className="block text-sm font-medium leading-6 text-gray-900">
                    I Want
                </label>
                <div className="mt-2">
                    <Field
                        as="select"
                        name="type"
                        className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 px-3 outline-none"
                    >
                        {request_type.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </Field>
                </div>
                <ErrorMessage name="type" component="span" className="mt-1 text-sm text-red-500" />
            </div>

            <div className="mt-5 space-y-2">
                <h1>Meeting options</h1>
                {Object.entries(meeting_options).map(([option, { label }]) => (
                    <div key={option} className="relative flex gap-x-3">
                        <div className="flex items-center h-6">
                            <Field
                                type="checkbox"
                                id={option}
                                name={`meeting_options.${option}.state`}
                                onChange={() => handleMeetingOptionChange(option)}
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor={option} className="font-medium text-gray-900">
                                {label}
                            </label>
                        </div>
                    </div>
                ))}
                <ErrorMessage name="meeting_options" component="span" className="mt-1 text-sm text-red-500" />
            </div>
        </>
    );
}