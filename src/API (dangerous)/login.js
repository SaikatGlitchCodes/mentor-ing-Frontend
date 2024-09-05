import auth from '../config/firebase.Config'
import {  sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

// Function to send the sign-in email
const sendSignInLink = (email) => {
  const actionCodeSettings = {
    url: 'http://localhost:3000', // URL to redirect to after clicking the link
    handleCodeInApp: true
  };

  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // Email sent successfully
      window.localStorage.setItem('emailForSignIn', email);
      console.log('Email link sent successfully');
    })
    .catch((error) => {
      console.error('Error sending email link:', error);
    });
};

// Function to complete the sign-in process
const completeSignIn = () => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // If missing email, prompt user for it
      email = window.prompt('Please provide your email for confirmation');
    }

    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage
        window.localStorage.removeItem('emailForSignIn');
        // User is signed in
        console.log('Successfully signed in:', result.user);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  }
};

// Example usage
const loginUser = (email) => {
  sendSignInLink(email);
};

export { loginUser, completeSignIn, auth };