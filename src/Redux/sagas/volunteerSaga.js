import { call, put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../types/actionTypes';
import { volunteerApi } from '../../Services/Api';

// Worker Saga: Fetch all volunteers
function* fetchVolunteersSaga() {
  try {
    const response = yield call(volunteerApi.getAll);
    yield put({
      type: actionTypes.FETCH_VOLUNTEERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_VOLUNTEERS_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Fetch volunteer by ID
function* fetchVolunteerByIdSaga(action) {
  try {
    const response = yield call(volunteerApi.getById, action.payload);
    yield put({
      type: actionTypes.FETCH_VOLUNTEER_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_VOLUNTEER_BY_ID_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Create volunteer
function* createVolunteerSaga(action) {
  try {
    const response = yield call(volunteerApi.create, action.payload);
    yield put({
      type: actionTypes.CREATE_VOLUNTEER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.CREATE_VOLUNTEER_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Update volunteer
function* updateVolunteerSaga(action) {
  try {
    const response = yield call(volunteerApi.update, action.payload.id, action.payload.volunteerData);
    yield put({
      type: actionTypes.UPDATE_VOLUNTEER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_VOLUNTEER_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Delete volunteer
function* deleteVolunteerSaga(action) {
  try {
    yield call(volunteerApi.delete, action.payload);
    yield put({
      type: actionTypes.DELETE_VOLUNTEER_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: actionTypes.DELETE_VOLUNTEER_FAILURE,
      payload: error.message,
    });
  }
}

// Watcher Saga: Watch for volunteer actions
export function* watchVolunteerSaga() {
  yield takeEvery(actionTypes.FETCH_VOLUNTEERS_REQUEST, fetchVolunteersSaga);
  yield takeEvery(actionTypes.FETCH_VOLUNTEER_BY_ID_REQUEST, fetchVolunteerByIdSaga);
  yield takeEvery(actionTypes.CREATE_VOLUNTEER_REQUEST, createVolunteerSaga);
  yield takeEvery(actionTypes.UPDATE_VOLUNTEER_REQUEST, updateVolunteerSaga);
  yield takeEvery(actionTypes.DELETE_VOLUNTEER_REQUEST, deleteVolunteerSaga);
}
