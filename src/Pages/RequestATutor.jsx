import React, { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { initialRequestData } from '../services/request_a_tutor/request_a_tutor.constant';
import { requestFieldAdder } from '../Redux/RequestGuide';
import validationSchema from '../Validations/RequestGuide';
import { loginUser, completeSignIn } from '../API (dangerous)/login';
import { REQUEST_STEPS } from '../services/request_a_tutor/RequestSteps';
import FormNavigationButton from '../services/request_a_tutor/FormNavigationButton';
import { useAuth } from '../customHook/useAuth';
import updateUserProfile from '../services/firebase/updateProfile';

const RequestATutor = () => {
  const { user } = useAuth();
  const [section, setSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.email) setSection(1);
  }, [user]);

  useEffect(() => {
    if (isSubmitted) completeSignIn();
  }, [isSubmitted]);

  const handleFormSubmit = (values) => {
    if (!user?.email) {
      loginUser(values.email);
      updateUserProfile({ displayName: values.name, phoneNumber: values.phone_number });
    }
    setIsSubmitted(true);
    dispatch(requestFieldAdder(values));
    console.log("Successfully Submitted!!")
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
          <FormNavigationButton section={section} setSection={setSection} />
        </Form>
      </Formik>
    </div>
  );
};

export default RequestATutor;
