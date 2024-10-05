import React from 'react';
import { useFormikContext } from 'formik';
import { REQUEST_STEPS } from './RequestSteps';

const FormNavigationButton = ({ section, setSection }) => {
  const { validateForm, submitForm, setFieldTouched, setFieldValue, values } = useFormikContext();
  console.log('[values]', values);

  const handleSubmit = async (e) => {
    e.preventDefault();
    REQUEST_STEPS[section].fields.forEach(field => setFieldTouched(field, true));

    const errors = await validateForm();
    setFieldValue('errors', errors);
    console.log('[error]', errors);
    const currentSectionHasErrors = REQUEST_STEPS[section].fields.some(field => errors[field]);
    
    if (!currentSectionHasErrors) {
      if (section < REQUEST_STEPS.length - 1) {
        setSection(prev => prev + 1);
      } else {
        submitForm();
      }
      setTimeout(() => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      }, 50);
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

export default FormNavigationButton;