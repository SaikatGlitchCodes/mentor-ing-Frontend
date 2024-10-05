import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp, useSignIn, useAuth } from '@clerk/clerk-react';
import { Form, Formik } from 'formik';
import { useGet, usePost } from '../hook/useFetch'; // Import your hook
import { initialRequestData } from '../services/request_a_tutor/request_a_tutor.constant';
import validationSchema from '../Validations/RequestGuide';
import { REQUEST_STEPS } from '../services/request_a_tutor/RequestSteps';
import FormNavigationButton from '../services/request_a_tutor/FormNavigationButton';

const RequestATutor = () => {
  const [section, setSection] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { get, error: userError, loading: userLoading } = useGet();
  const { post, loading: postLoading, error } = usePost();
  const navigate = useNavigate();
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn && section === 0) setSection(1);
  }, [isSignedIn, section]);

  const checkUserExistence = useCallback(async (email) => {
    try {
      const response = await get(`/users/${email}`);
      console.log('User exists:', Array.isArray(response) && response.length > 0);
      return Array.isArray(response) && response.length > 0;
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  }, [get]);

  const handleAuthWithEmailLink = useCallback(async (values, isNewUser) => {
    console.log('Attempting auth with email link, new User:', isNewUser);
    try {
      const authAction = isNewUser ? signUp : signIn;
      const redirectUrl = `${window.location.origin}/my-request`;

      if (isNewUser) {
        await authAction.create({ emailAddress: values.email });
        await authAction.prepareEmailAddressVerification({
          strategy: 'email_link',
          redirectUrl,
        });
      } else {
        await authAction.create({
          identifier: values.email,
          strategy: "email_link",
          redirectUrl,
        });
      }
      navigate('/email-link-auth-screen');
    } catch (error) {
      console.error(`Error in ${isNewUser ? 'signup' : 'signin'}:`, error);
      throw error;
    }
  }, [signUp, signIn, navigate]);

  const handleFormSubmit = useCallback(async (values, { setSubmitting }) => {
    if (!isLoaded) return;

    setIsLoading(true);
    try {
      if (!isSignedIn) {
        localStorage.setItem('pendingTutorRequest', JSON.stringify(values));
        const userExists = await checkUserExistence(values.email);
        await handleAuthWithEmailLink(values, !userExists);
      } else {
        // post('/subjects', values)
        // .then(response=> navigate('/my-request'))
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, [isLoaded, isSignedIn, checkUserExistence, handleAuthWithEmailLink, navigate]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="md:py-6 py-2 md:w-[50%] w-[90%] m-auto">
      <h1 className="text-3xl">Request a Tutor!</h1>
      <Formik
        initialValues={initialRequestData}
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
              {userError && (
                <div className="text-red-500">
                  Error checking user: {userError.message}
                </div>
              )}
            </div>
            <FormNavigationButton
              section={section}
              setSection={setSection}
              isSubmitting={isSubmitting || isLoading || userLoading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RequestATutor;