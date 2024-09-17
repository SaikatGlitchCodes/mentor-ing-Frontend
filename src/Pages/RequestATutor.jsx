import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp, useAuth } from '@clerk/clerk-react';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { initialRequestData } from '../services/request_a_tutor/request_a_tutor.constant';
import { requestFieldAdder } from '../Redux/RequestGuide';
import validationSchema from '../Validations/RequestGuide';
import { REQUEST_STEPS } from '../services/request_a_tutor/RequestSteps';
import FormNavigationButton from '../services/request_a_tutor/FormNavigationButton';
import postRequest from '../API (dangerous)/post-request';

const RequestATutor = () => {
  const [section, setSection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signUp } = useSignUp();
  const { isLoaded, isSignedIn, userId } = useAuth();

  useEffect(() => {
    if (isSignedIn && section === 0) setSection(1);
  }, [isSignedIn, section]);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      if (isLoaded && !isSignedIn) {
        localStorage.setItem('pendingTutorRequest', JSON.stringify(values));
        await signUpUsingLink(values);
      } else  {
        const dataToSave = { ...values, createdAt: new Date().toString(), userId, status:true };
        console.log('Successfully submitted', dataToSave);
        dispatch(requestFieldAdder(dataToSave));
        await postRequest('/api/tutoring/add', dataToSave, "Submitted your request");
        navigate('/my-request');
      } 
    } catch (error) {
      handleSubmissionError(error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const handleSubmissionError = (error) => {
    if (error.errors && Array.isArray(error.errors)) {
      error.errors.forEach(err => console.error('Error detail:', err));
    } else if (error.message) {
      console.error('Error message:', error.message);
    } else {
      console.error('Unexpected error structure:', JSON.stringify(error, null, 2));
    }
  };

  const signUpUsingLink = async (values) => {
    await signUp.create({
      emailAddress: values.email,
      publicMetadata: { role: 'Student' },
    });

    await signUp.prepareEmailAddressVerification({
      strategy: 'email_link',
      redirectUrl: 'http://localhost:3000/my-request',
    });

    navigate('/email-link-auth-screen');
  };

  return (
    <div className="md:py-6 py-2 md:w-[50%] w-[90%] m-auto">
      <h1 className="text-3xl">Request a Tutor!</h1>
      <Formik
        initialValues={{ ...initialRequestData }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="space-y-6">
              <div className="pb-12 border-b border-gray-900/10">
                {REQUEST_STEPS.slice(0, section + 1).map(({ title, Component }) => (
                  <Component key={title} />
                ))}
              </div>
            </div>
            <FormNavigationButton
              section={section}
              setSection={setSection}
              isSubmitting={isSubmitting || isLoading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RequestATutor;