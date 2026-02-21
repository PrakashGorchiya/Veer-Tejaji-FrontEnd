import { call, put, takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../types/actionTypes';
import { galleryApi } from '../../Services/Api';

// Worker Saga: Fetch all gallery images
function* fetchGalleryImagesSaga() {
  try {
    const response = yield call(galleryApi.getAll);
    yield put({
      type: actionTypes.FETCH_GALLERY_IMAGES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_GALLERY_IMAGES_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Fetch gallery image by ID
function* fetchGalleryImageByIdSaga(action) {
  try {
    const response = yield call(galleryApi.getById, action.payload);
    yield put({
      type: actionTypes.FETCH_GALLERY_IMAGE_BY_ID_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.FETCH_GALLERY_IMAGE_BY_ID_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Create gallery image
function* createGalleryImageSaga(action) {
  try {
    const response = yield call(galleryApi.create, action.payload);
    yield put({
      type: actionTypes.CREATE_GALLERY_IMAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.CREATE_GALLERY_IMAGE_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Update gallery image
function* updateGalleryImageSaga(action) {
  try {
    const response = yield call(galleryApi.update, action.payload.id, action.payload.imageData);
    yield put({
      type: actionTypes.UPDATE_GALLERY_IMAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: actionTypes.UPDATE_GALLERY_IMAGE_FAILURE,
      payload: error.message,
    });
  }
}

// Worker Saga: Delete gallery image
function* deleteGalleryImageSaga(action) {
  try {
    yield call(galleryApi.delete, action.payload);
    yield put({
      type: actionTypes.DELETE_GALLERY_IMAGE_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: actionTypes.DELETE_GALLERY_IMAGE_FAILURE,
      payload: error.message,
    });
  }
}

// Watcher Saga: Watch for gallery image actions
export function* watchGallerySaga() {
  yield takeEvery(actionTypes.FETCH_GALLERY_IMAGES_REQUEST, fetchGalleryImagesSaga);
  yield takeEvery(actionTypes.FETCH_GALLERY_IMAGE_BY_ID_REQUEST, fetchGalleryImageByIdSaga);
  yield takeEvery(actionTypes.CREATE_GALLERY_IMAGE_REQUEST, createGalleryImageSaga);
  yield takeEvery(actionTypes.UPDATE_GALLERY_IMAGE_REQUEST, updateGalleryImageSaga);
  yield takeEvery(actionTypes.DELETE_GALLERY_IMAGE_REQUEST, deleteGalleryImageSaga);
}
