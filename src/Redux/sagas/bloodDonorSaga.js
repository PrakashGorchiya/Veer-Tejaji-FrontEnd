import { call, put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../types/actionTypes';
import { bloodDonorApi } from '../../Services/Api';

// Worker Saga: Fetch all blood donors
function* fetchBloodDonorsSaga() {
  try {
    const response = yield call(bloodDonorApi.getAll);
    yield put({
      type: actionTypes.FETCH_BLOOD_DONORS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_BLOOD_DONORS_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Fetch blood donor by ID
function* fetchBloodDonorByIdSaga(action) {
  try {
    const response = yield call(bloodDonorApi.getById, action.payload);
    yield put({
      type: actionTypes.FETCH_BLOOD_DONOR_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_BLOOD_DONOR_BY_ID_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Create blood donor
function* createBloodDonorSaga(action) {
  try {
    const response = yield call(bloodDonorApi.create, action.payload);
    yield put({
      type: actionTypes.CREATE_BLOOD_DONOR_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.CREATE_BLOOD_DONOR_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Update blood donor
function* updateBloodDonorSaga(action) {
  try {
    const response = yield call(bloodDonorApi.update, action.payload.id, action.payload.donorData);
    yield put({
      type: actionTypes.UPDATE_BLOOD_DONOR_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_BLOOD_DONOR_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Delete blood donor
function* deleteBloodDonorSaga(action) {
  try {
    yield call(bloodDonorApi.delete, action.payload);
    yield put({
      type: actionTypes.DELETE_BLOOD_DONOR_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: actionTypes.DELETE_BLOOD_DONOR_FAILURE,
      payload: error.message,
    });
  }
}

// Watcher Saga: Watch for blood donor actions
export function* watchBloodDonorSaga() {
  yield takeEvery(actionTypes.FETCH_BLOOD_DONORS_REQUEST, fetchBloodDonorsSaga);
  yield takeEvery(actionTypes.FETCH_BLOOD_DONOR_BY_ID_REQUEST, fetchBloodDonorByIdSaga);
  yield takeEvery(actionTypes.CREATE_BLOOD_DONOR_REQUEST, createBloodDonorSaga);
  yield takeEvery(actionTypes.UPDATE_BLOOD_DONOR_REQUEST, updateBloodDonorSaga);
  yield takeEvery(actionTypes.DELETE_BLOOD_DONOR_REQUEST, deleteBloodDonorSaga);
}
