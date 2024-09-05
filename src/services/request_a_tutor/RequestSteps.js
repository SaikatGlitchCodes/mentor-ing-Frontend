import Emailverification from '../../Component/RequestComponents/Email.component';
import NameAddress from '../../Component/RequestComponents/NameAddress.component';
import PhoneNumber from '../../Component/RequestComponents/PhoneNumber.component';
import Description from '../../Component/RequestComponents/Description.component';
import SubjectMeeting from '../../Component/RequestComponents/SubjectMeeting.component';
import BudgetPreference from '../../Component/RequestComponents/BudgetPreference.component';

export const REQUEST_STEPS = [
  { title: 'Email Address', Component: Emailverification, fields: ['email'] },
  { title: 'Basic Address', Component: NameAddress, fields: ['name', 'address'] },
  { title: 'Additional Details', Component: PhoneNumber, fields: ['phone_number'] },
  { title: 'Description', Component: Description, fields: ['requirement'] },
  { title: 'Subject', Component: SubjectMeeting, fields: ['subject', 'level', 'type', 'meeting_options'] },
  { title: 'Budget', Component: BudgetPreference, fields: ['gender_preference', 'tutors_want', 'i_need_someone', 'language', 'get_tutors_from'] }
];