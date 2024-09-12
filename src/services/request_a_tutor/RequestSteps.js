import Emailverification from '../../Component/RequestATutor/Email.component';
import NameAddress from '../../Component/RequestATutor/NameAddress.component';
import PhoneNumber from '../../Component/RequestATutor/PhoneNumber.component';
import Description from '../../Component/RequestATutor/Description.component';
import SubjectMeeting from '../../Component/RequestATutor/SubjectMeeting.component';
import BudgetPreference from '../../Component/RequestATutor/BudgetPreference.component';

export const REQUEST_STEPS = [
  { title: 'Email Address', Component: Emailverification, fields: ['email'] },
  { title: 'Basic Address', Component: NameAddress, fields: ['name', 'address'] },
  { title: 'Additional Details', Component: PhoneNumber, fields: ['phone_number'] },
  { title: 'Description', Component: Description, fields: ['requirement'] },
  { title: 'Subject', Component: SubjectMeeting, fields: ['subject', 'level', 'type', 'meeting_options'] },
  { title: 'Budget', Component: BudgetPreference, fields: ['gender_preference', 'tutors_want', 'i_need_someone', 'language', 'get_tutors_from'] }
];