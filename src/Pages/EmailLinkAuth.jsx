import React, { useState, useEffect } from 'react';
import { useSignUp } from '@clerk/clerk-react';

const EmailLinkAuth = () => {
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // 60 seconds timer
  const { signUp } = useSignUp();

  useEffect(() => {
    if (resendDisabled) {
      const timer = setInterval(() => {
        setResendTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 60; // reset to 60 seconds
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer); // cleanup the interval on unmount
    }
  }, [resendDisabled]);

  const handleResendEmail = async () => {
    setResendDisabled(true); // disable button to prevent spamming
    try {
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_link',
        redirectUrl: process.env.REACT_DEV_REDIRECT_URL, // replace with your redirect URL
      });
      console.log('Magic link resent');
    } catch (error) {
      console.error('Error resending magic link:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-[100vh]'>
      <div className='flex flex-col items-center justify-center p-10 px-24 rounded-lg shadow-lg gap-y-4'>
        <h1 className='text-5xl font-semibold'>Check your Inbox</h1>
        <p>We've sent a magic link to your email address. Please click on the link to complete your signup.</p>
        <button 
          className='mt-8 btn btn-primary' 
          onClick={handleResendEmail} 
          disabled={resendDisabled}
        >
          {resendDisabled ? `Resend Email (${resendTimer}s)` : 'Re-Send Email'}
        </button>
      </div>
    </div>
  );
};

export default EmailLinkAuth;
