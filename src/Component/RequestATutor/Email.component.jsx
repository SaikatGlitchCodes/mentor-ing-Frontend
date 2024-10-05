import React, { useEffect } from 'react';
import { ErrorMessage, Field } from 'formik';
import { useUser } from '@clerk/clerk-react';
import { useFormikContext } from 'formik';

const EmailVerification = () => {
  const { user } = useUser();
  const { setFieldValue } = useFormikContext(); 
 
  useEffect(() => {
    if (user && user.emailAddresses) {
      setFieldValue('email', user.emailAddresses[0].emailAddress);
    }
  }, [user, setFieldValue]);

  return (
    <>
      <div className="mt-12 sm:col-span-4">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2">
          <Field
            id="email"
            name="email"
            type="email"
            readOnly={user} // If user is logged in, make the field read-only
            className="block w-full md:w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6 px-3 outline-none"
          />
        </div>
      </div>
      <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>
      <ErrorMessage name="email" component="span" className="mt-1 text-sm text-red-500" />
    </>
  );
};

export default EmailVerification;
