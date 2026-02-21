import * as actionTypes from '../types/actionTypes';

const initialState = {
  images: [],
  image: null,
  loading: false,
  error: null,
};

const galleryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GALLERY_IMAGES_REQUEST:
    case actionTypes.FETCH_GALLERY_IMAGE_BY_ID_REQUEST:
    case actionTypes.CREATE_GALLERY_IMAGE_REQUEST:
    case actionTypes.UPDATE_GALLERY_IMAGE_REQUEST:
    case actionTypes.DELETE_GALLERY_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_GALLERY_IMAGES_SUCCESS:
      return {
        ...state,
        images: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_GALLERY_IMAGE_BY_ID_SUCCESS:
      return {
        ...state,
        image: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.CREATE_GALLERY_IMAGE_SUCCESS:
      return {
        ...state,
        images: [...state.images, action.payload],
        loading: false,
        error: null,
      };

    case actionTypes.UPDATE_GALLERY_IMAGE_SUCCESS:
      return {
        ...state,
        images: state.images.map((img) =>
          img.id === action.payload.id ? action.payload : img
        ),
        image: state.image?.id === action.payload.id ? action.payload : state.image,
        loading: false,
        error: null,
      };

    case actionTypes.DELETE_GALLERY_IMAGE_SUCCESS:
      return {
        ...state,
        images: state.images.filter((img) => img.id !== action.payload),
        image: state.image?.id === action.payload ? null : state.image,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_GALLERY_IMAGES_FAILURE:
    case actionTypes.FETCH_GALLERY_IMAGE_BY_ID_FAILURE:
    case actionTypes.CREATE_GALLERY_IMAGE_FAILURE:
    case actionTypes.UPDATE_GALLERY_IMAGE_FAILURE:
    case actionTypes.DELETE_GALLERY_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default galleryReducer;
