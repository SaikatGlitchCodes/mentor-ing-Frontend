export const levels = [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
    'Grade 7',
    'Grade 8',
    'Grade 9',
    'Grade 10',
    'Grade 11',
]

export const price_options = [
    'fixed/flat',
    'per hour',
    'per day',
    'per month',
    'per year'
]
export const gender_preference = [
    'None',
    'Prefer Male',
    'Prefer Female',
    'Only Male',
]
export const tutors_want = [
    'Only one',
    'More than one',
    'As many as Possible',
]
export const i_need_someone = [
    'full time',
    'part time',
    'volunteer',
    'student',
]
export const request_type = [
    'Tutoring',
    'Job Support',
    'Assignment'
]

export const meeting_options = {
    'Online (Using Zoom/Skype)': false,
    'At my place (home/institute)': false,
    'Travel to Tutor': false,
}

export const initialRequestData = {
    type: request_type[0],
    userId: '',
    email: '',
    name: '',
    address: '',
    complete_address: {
        addressline_1: '',
        addressline_2: '',
        country: '',
        country_code: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        abbreviation_STD: '',
        offset_STD: '',
        lat: '',
        lon: '',
    },
    phone_number: '',
    requirement: '',
    subject: [],
    level: levels[0],
    meeting_options: meeting_options,
    price: 0,
    price_options: price_options[0],
    gender_preference: gender_preference[0],
    tutors_want: tutors_want[0],
    i_need_someone: i_need_someone[0],
    language: '',
    get_tutors_from: '',
    upload_file: '',
    errors: {}
}
