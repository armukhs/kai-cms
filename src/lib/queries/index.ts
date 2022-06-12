import getDevelopment from 'lib/mutations/getDevelopment';
import getSponsorship from 'lib/mutations/getSponsorship';
import checkEmail from './checkEmail';
import checkJabatan from './checkJabatan';
import checkNipp from './checkNipp';
import daftarJabatan from './daftarJabatan';
import daftarUnit from './daftarUnit';
import getBudaya from './getBudaya';
import getKomentar from './getKomentar';
import getKompetensi from './getKompetensi';
import getKomunikasi from './getKomunikasi';
import getLainnya from './getLainnya';
import getMyProjects from './getMyProjects';
import getOrganization from './getOrganization';
import getPeran from './getPeran';
import getProject from './getProject';
import getProses from './getProses';
import getStruktur from './getStruktur';
import getTeknologi from './getTeknologi';
import getTopUnits from './getTopUnits';
import getUnits from './getUnits';
import getAnalisis from './getAnalisis';
import getUsers from './getUsers';
import getInvitations from './getInvitations';
import adminProjects from './adminProjects';

export const QUERIES = {
  'top-units': getTopUnits,
  'get-units': getUnits,
  'daftar-unit': daftarUnit,
  'daftar-jabatan': daftarJabatan,
  organization: getOrganization,
  'check-nipp': checkNipp,
  'check-email': checkEmail,
  'check-jabatan': checkJabatan,
};

export const AUTH_QUERIES = {
  'get-my-projects': getMyProjects,
  'get-project': getProject,
  'get-analisis': getAnalisis,
  'get-komentar': getKomentar,
  'get-users': getUsers,
  'get-invitations': getInvitations,
  'perubahan-proses': getProses,
  'perubahan-teknologi': getTeknologi,
  'perubahan-struktur': getStruktur,
  'perubahan-peran': getPeran,
  'perubahan-budaya': getBudaya,
  'perubahan-kompetensi': getKompetensi,
  'perubahan-lainnya': getLainnya,
  'rencana-komunikasi': getKomunikasi,
  'rencana-sponsorship': getSponsorship,
  'rencana-development': getDevelopment,
  'admin-projects': adminProjects,
};
