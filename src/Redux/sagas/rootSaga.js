import { all } from 'redux-saga/effects';
import { watchCommitteeSaga } from './committeeSaga';
import { watchDonorSaga } from './donorSaga';
import { watchBloodDonorSaga } from './bloodDonorSaga';
import { watchVolunteerSaga } from './volunteerSaga';
import { watchGallerySaga } from './gallerySaga';

// Root Saga: Combine all watcher sagas
export default function* rootSaga() {
  yield all([
    watchCommitteeSaga(),
    watchDonorSaga(),
    watchBloodDonorSaga(),
    watchVolunteerSaga(),
    watchGallerySaga(),
  ]);
}
