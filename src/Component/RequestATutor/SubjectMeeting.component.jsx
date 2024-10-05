import React, { useState, useEffect } from 'react';
import { ErrorMessage, useFormikContext, Field } from 'formik';
import CreatableSelect from 'react-select/creatable';
import { levels, request_type, meeting_options } from '../../services/request_a_tutor/request_a_tutor.constant';
import { useFetchData } from '../../hook/useFetch';
import { usePost } from '../../hook/useFetch';

export default function SubjectMeeting() {
    const { setFieldValue, values } = useFormikContext();
    const { data: subjects, loading, error } = useFetchData('/subjects');
    const { post, loading: postLoading } = usePost();

    // Local state to store subject options
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [selectedSubject, selectedSubjectOptions] = useState([]);

    // Sync with fetched subjects once loaded
    useEffect(() => {
        if (subjects) {
            setSubjectOptions(subjects.map(subject => ({ value: subject.name, label: subject.name, id: subject.id })));
        }
    }, [subjects]);

    const handleCreateSubject = async (newSubject) => {
        try {
            const payload = {
                subjects: [{ name: newSubject }]
            };
            const new_subject = await post('/subjects', payload);

            // Update local state with the new subject
            const newOption = { value: newSubject, label: newSubject, id: new_subject.subjects[0].id };
            setSubjectOptions(prevOptions => [...prevOptions, newOption]);
            
            // Update form value
            setFieldValue('subject', [...(values.subject || []), newOption.id]);
            selectedSubjectOptions([...(selectedSubject || []), newOption]);
        } catch (error) {
            console.error('Failed to create subject:', error);
        }
    };

    const handleMeetingOptionChange = (option) => {
        setFieldValue(`meeting_options.${option}.state`, !values.meeting_options[option].state);
    };

    const handleChange = async (selectedOptions) => {
        selectedSubjectOptions(selectedOptions);
        setFieldValue('subject', selectedOptions.map(v=>v.id));
    };

    return (
        <>
            <div className="mt-8 sm:col-span-4 w-96">
                <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                    Subject
                </label>
                <div className="mt-2">
                    <CreatableSelect
                        isMulti
                        isClearable
                        placeholder='Search subjects...'
                        allowCreateWhileLoading
                        options={subjectOptions}
                        noOptionsMessage={() => error ? 'Error loading subjects' : 'No Categories Found'}
                        isLoading={loading || postLoading}
                        onChange={handleChange}
                        onCreateOption={handleCreateSubject}
                        value={selectedSubject}
                    />
                </div>
                {error && <span className="mt-1 text-sm text-red-500">Error loading subjects: {error.message}</span>}
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
