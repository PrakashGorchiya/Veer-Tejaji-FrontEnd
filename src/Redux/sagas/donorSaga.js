import { call, put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../types/actionTypes';
import { donorApi } from '../../Services/Api';

// Worker Saga: Fetch all donors
function* fetchDonorsSaga() {
  try {
    const response = yield call(donorApi.getAll);
    yield put({
      type: actionTypes.FETCH_DONORS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_DONORS_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Fetch donor by ID
function* fetchDonorByIdSaga(action) {
  try {
    const response = yield call(donorApi.getById, action.payload);
    yield put({
      type: actionTypes.FETCH_DONOR_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_DONOR_BY_ID_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Create donor
function* createDonorSaga(action) {
  try {
    const response = yield call(donorApi.create, action.payload);
    yield put({
      type: actionTypes.CREATE_DONOR_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.CREATE_DONOR_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Update donor
function* updateDonorSaga(action) {
  try {
    const response = yield call(donorApi.update, action.payload.id, action.payload.donorData);
    yield put({
      type: actionTypes.UPDATE_DONOR_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_DONOR_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Delete donor
function* deleteDonorSaga(action) {
  try {
    yield call(donorApi.delete, action.payload);
    yield put({
      type: actionTypes.DELETE_DONOR_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: actionTypes.DELETE_DONOR_FAILURE,
      payload: error.message,
    });
  }
}

// Watcher Saga: Watch for donor actions
export function* watchDonorSaga() {
  yield takeEvery(actionTypes.FETCH_DONORS_REQUEST, fetchDonorsSaga);
  yield takeEvery(actionTypes.FETCH_DONOR_BY_ID_REQUEST, fetchDonorByIdSaga);
  yield takeEvery(actionTypes.CREATE_DONOR_REQUEST, createDonorSaga);
  yield takeEvery(actionTypes.UPDATE_DONOR_REQUEST, updateDonorSaga);
  yield takeEvery(actionTypes.DELETE_DONOR_REQUEST, deleteDonorSaga);
}
