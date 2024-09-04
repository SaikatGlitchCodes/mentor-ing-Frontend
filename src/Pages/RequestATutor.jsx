import React, { useState } from 'react';
import { Form, Formik, useFormikContext } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { initialRequestData, requestFieldAdder } from '../Redux/RequestGuide';
import validationSchema from '../Validations/RequestGuide';
import Emailverification from '../Component/RequestComponents/Email.component';
import NameAddress from '../Component/RequestComponents/NameAddress.component';
import PhoneNumber from '../Component/RequestComponents/PhoneNumber.component';
import Description from '../Component/RequestComponents/Description.component';
import SubjectMeeting from '../Component/RequestComponents/SubjectMeeting.component';
import BudgetPreference from '../Component/RequestComponents/BudgetPreference.component';
import loginUser from '../API (dangerous)/login';

// Request steps with Validations here
const REQUEST_STEPS = [
  { title: 'Email Address', Component: Emailverification, fields: ['email'] },
  { title: 'Basic Address', Component: NameAddress, fields: ['name','address' ] }, //
  { title: 'Additional Details', Component: PhoneNumber, fields: ['phone_number'] },
  { title: 'Description', Component: Description, fields: ['requirement'] },
  { title: 'Subject', Component: SubjectMeeting, fields: ['subject','level','type','meeting_options'] },
  { title: 'Budget', Component: BudgetPreference, fields: ['gender_preference','tutors_want','i_need_someone','language','get_tutors_from'] }
];

const FormNavigationHandler = ({ section, setSection }) => {
  const { validateForm, submitForm, setFieldTouched, setFieldValue, values } = useFormikContext();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser()
    // Touch all fields in the current section to trigger validation
    REQUEST_STEPS[section].fields.forEach(field => setFieldTouched(field, true));

    const errors = await validateForm();
    // console.log(errors);
    setFieldValue('errors', errors);
    // console.log('values', values)

    const currentSectionHasErrors = REQUEST_STEPS[section].fields.some(field => errors[field]);

    if (!currentSectionHasErrors) {
      if (section < REQUEST_STEPS.length - 1) {
        setSection(prev => prev + 1);
      } else {
        submitForm();
      }
      setTimeout(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="py-2 mt-4 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm px-9 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-14"
    >
      {section === REQUEST_STEPS.length - 1 ? 'Submit' : 'Save'}
    </button>
  );
};

const RequestATutor = () => {
  const [section, setSection] = useState(0);
  const dispatch = useDispatch();

  const handleFormSubmit = (values) => {
    console.log('[Submitted Successfully!!]', values);
    dispatch(requestFieldAdder(values));
  };

  return (
    <div className='md:py-6 py-2 md:w-[50%] w-[90%] m-auto'>
      <h1 className='text-3xl'>Request a tutor!</h1>
      <Formik
        initialValues={initialRequestData}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <div className="space-y-6">
            <div className="pb-12 border-b border-gray-900/10">
              {REQUEST_STEPS.slice(0, section + 1).map(({ title, Component }) => (
                <Component key={title} />
              ))}
            </div>
          </div>
          <FormNavigationHandler section={section} setSection={setSection} />
        </Form>
      </Formik>
    </div>
  );
};

export default RequestATutor;