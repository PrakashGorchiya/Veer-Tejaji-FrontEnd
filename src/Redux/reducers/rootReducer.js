import { combineReducers } from 'redux';
import committeeReducer from './committeeReducer';
import donorReducer from './donorReducer';
import bloodDonorReducer from './bloodDonorReducer';
import volunteerReducer from './volunteerReducer';
import galleryReducer from './galleryReducer';

const rootReducer = combineReducers({
  committee: committeeReducer,
  donor: donorReducer,
  bloodDonor: bloodDonorReducer,
  volunteer: volunteerReducer,
  gallery: galleryReducer,
});

export default rootReducer;
