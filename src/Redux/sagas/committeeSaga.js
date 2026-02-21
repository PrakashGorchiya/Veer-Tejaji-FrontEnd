import { call, put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../types/actionTypes';
import { committeeApi } from '../../Services/Api';

// Worker Saga: Fetch all committee members
function* fetchCommitteeMembersSaga() {
  try {
    const response = yield call(committeeApi.getAll);
    yield put({
      type: actionTypes.FETCH_COMMITTEE_MEMBERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_COMMITTEE_MEMBERS_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Fetch committee member by ID
function* fetchCommitteeMemberByIdSaga(action) {
  try {
    const response = yield call(committeeApi.getById, action.payload);
    yield put({
      type: actionTypes.FETCH_COMMITTEE_MEMBER_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_COMMITTEE_MEMBER_BY_ID_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Create committee member
function* createCommitteeMemberSaga(action) {
  try {
    const response = yield call(committeeApi.create, action.payload);
    yield put({
      type: actionTypes.CREATE_COMMITTEE_MEMBER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.CREATE_COMMITTEE_MEMBER_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Update committee member
function* updateCommitteeMemberSaga(action) {
  try {
    const response = yield call(committeeApi.update, action.payload.id, action.payload.memberData);
    yield put({
      type: actionTypes.UPDATE_COMMITTEE_MEMBER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_COMMITTEE_MEMBER_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Delete committee member
function* deleteCommitteeMemberSaga(action) {
  try {
    yield call(committeeApi.delete, action.payload);
    yield put({
      type: actionTypes.DELETE_COMMITTEE_MEMBER_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: actionTypes.DELETE_COMMITTEE_MEMBER_FAILURE,
      payload: error.message,
    });
  }
}

// Watcher Saga: Watch for committee member actions
export function* watchCommitteeSaga() {
  yield takeEvery(actionTypes.FETCH_COMMITTEE_MEMBERS_REQUEST, fetchCommitteeMembersSaga);
  yield takeEvery(actionTypes.FETCH_COMMITTEE_MEMBER_BY_ID_REQUEST, fetchCommitteeMemberByIdSaga);
  yield takeEvery(actionTypes.CREATE_COMMITTEE_MEMBER_REQUEST, createCommitteeMemberSaga);
  yield takeEvery(actionTypes.UPDATE_COMMITTEE_MEMBER_REQUEST, updateCommitteeMemberSaga);
  yield takeEvery(actionTypes.DELETE_COMMITTEE_MEMBER_REQUEST, deleteCommitteeMemberSaga);
}
