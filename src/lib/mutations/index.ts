import createInvitation from './createInvitation';
import deletePerubahan from './deletePerubahan';
import deleteRencana from './deleteRencana';
import deleteUser from './deleteUser';
import newUser from './newUser';
import registerProject from './registerProject';
import saveAnalisis from './saveAnalisis';
import saveKomentar from './saveKomentar';
import saveMentor from './saveMentor';
import savePerubahan from './savePerubahan';
import saveProject from './saveProject';
import saveRencana from './saveRencana';
import undeleteUser from './undeleteUser';
import updatePassword from './updatePassword';
import updateProfile from './updateProfile';

export const MUTATIONS = {
  'new-user': newUser,
};

export const AUTH_MUTATIONS = {
  'update-profile': updateProfile,
  'update-password': updatePassword,
  'register-project': registerProject,
  'save-project': saveProject,
  'save-perubahan': savePerubahan,
  'delete-perubahan': deletePerubahan,
  'delete-rencana': deleteRencana,
  'save-komentar': saveKomentar,
  'save-rencana': saveRencana,
  'save-analisis': saveAnalisis,
  'create-invitation': createInvitation,
  'delete-user': deleteUser,
  'undelete-user': undeleteUser,
  'save-mentor': saveMentor,
};
