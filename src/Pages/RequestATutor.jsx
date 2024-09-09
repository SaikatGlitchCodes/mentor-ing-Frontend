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

const RequestATutor = () => {
  const [section, setSection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { signUp } = useSignUp();
  const { isLoaded, isSignedIn, userId } = useAuth();
  
  useEffect(() => {
    if (isSignedIn && section === 0) {
      setSection(1);
    }
  },[ isSignedIn, section])

  const handleFormSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    
    if (isLoaded && !isSignedIn) {
      try {
         await signUp.create({
          emailAddress: values.email,
          publicMetadata: {
            role: 'Student'
          }
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_link",
          redirectUrl: 'http://localhost:3000', // replace with your actual redirect URL
        });

        navigate("/email-link-auth-screen");

      } catch (error) {
        if (error.errors && Array.isArray(error.errors)) {
          error.errors.forEach(err => console.error('Error detail:', err));
        } else if (error.message) {
          console.error('Error message:', error.message);
        } else {
          console.error('Unexpected error structure:', JSON.stringify(error, null, 2));
        }
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    }
    const dataToSave = {...values, userId: userId}
    console.log('Successfully submitted', dataToSave);
    dispatch(requestFieldAdder(dataToSave));
  };

  return (
    <div className='md:py-6 py-2 md:w-[50%] w-[90%] m-auto'>
      <h1 className='text-3xl'>Request a tutor!</h1>
      <Formik
        initialValues={{
          ...initialRequestData,
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="space-y-6">
              <div className="pb-12 border-b border-gray-900/10">
                {
                  REQUEST_STEPS.slice(0, section + 1).map(({ title, Component }) => (
                    <Component key={title} />
                  ))
                }
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
