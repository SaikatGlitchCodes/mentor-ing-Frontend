import * as Yup from 'yup';
import { levels, request_type, gender_preference, tutors_want, i_need_someone, price_options } from '../services/request_a_tutor/request_a_tutor.constant';

const validationSchema = Yup.object().shape({
  type: Yup.string()
    .required('Type is required')
    .oneOf(request_type, 'Invalid type selected'),
  userId: Yup.string(),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Name is required'),
  address_formatted: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),
  address: Yup.object().shape({
    addressline_1: Yup.string(),
    addressline_2: Yup.string(),
    country: Yup.string(),
    country_code: Yup.string(),
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
    abbreviation_STD: Yup.string(),
    offset_STD: Yup.string(),
    lat: Yup.string(),
    lon: Yup.string(),
  }),
  phone_number: Yup.string()
    .required("Phone number is required"),
    description: Yup.string()
    .required('Description is required')
    .min(5, 'Description must be clear'),
  subject: Yup.array()
    .min(1, 'At least one subject is required')
    .required('Subject is required'),
  level: Yup.string()
    .required('Level is required')
    .oneOf(levels, 'Invalid level selected'),
  meeting_options: Yup.object(),
  price_amount: Yup.number()
      .typeError('Amount must be a number')
      .positive('Amount must be positive')
      .required('Amount is required'),
  price_option: Yup.string()
      .required('Price option is required')
      .oneOf(price_options, 'Invalid price option selected'),
  price_currency: Yup.string()
      .required('Currency is required'),
  price_currency_symbol: Yup.string()
      .required('Currency symbol is required'),
  gender_preference: Yup.string()
    .required('Gender preference is required')
    .oneOf(gender_preference, 'Invalid gender preference'),
  tutors_want: Yup.string()
    .required('Tutor preference is required')
    .oneOf(tutors_want, 'Invalid tutor preference'),
  i_need_someone: Yup.string()
    .required('Availability preference is required')
    .oneOf(i_need_someone, 'Invalid availability preference'),
  language: Yup.array()
    .of(Yup.object().shape({
      value: Yup.string().required(),
      label: Yup.string().required()
    }))
    .min(1, 'At least one language is required')
    .required('Language is required'),
  get_tutors_from: Yup.string(),
  upload_file: Yup.mixed(),
});

export default validationSchema;