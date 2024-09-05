import { getAuth, updateProfile } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

const updateUserProfile = (data) => {
  updateProfile(user, data).then(() => {
    // Profile updated successfully
    console.log("User profile updated!");
  }).catch((error) => {
    // An error occurred
    console.error("Error updating profile:", error);
  });
};

export default updateUserProfile