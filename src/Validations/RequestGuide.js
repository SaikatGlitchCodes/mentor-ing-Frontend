import * as Yup from 'yup';
import { levels, meeting_options, request_type } from '../Redux/RequestGuide';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must be less than 100 characters')
    .required('Address is required'),
  phone_number: Yup.string()
    .required("Phone number is required"),
  requirement: Yup.string()
    .required('Requirement is required')
    .min(5, 'Requirement must be clear'),
  subject: Yup.array()
    .of(Yup.string()
      .min(2, 'Each subject must be at least 2 characters')
      .max(100, 'Each subject must be less than 100 characters')
    )
    .min(1, 'At least one subject is required')
    .required('Subject is required'),
  level: Yup.string()
    .required('Level is required')
    .oneOf(levels, 'Invalid level selected'),
  i_want: Yup.string()
    .required('Request type is required')
    .oneOf(request_type, 'Invalid request type selected'),
  meeting_options: Yup.array()
    .of(Yup.string().oneOf(meeting_options, 'Invalid meeting option'))
    .min(1, 'Select at least one meeting option')
});

export default validationSchema;