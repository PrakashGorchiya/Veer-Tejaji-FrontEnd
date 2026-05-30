import * as actionTypes from '../types/actionTypes';

const initialState = {
  bloodDonors: [],
  bloodDonor: null,
  loading: false,
  error: null,
};

const bloodDonorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BLOOD_DONORS_REQUEST:
    case actionTypes.FETCH_BLOOD_DONOR_BY_ID_REQUEST:
    case actionTypes.CREATE_BLOOD_DONOR_REQUEST:
    case actionTypes.UPDATE_BLOOD_DONOR_REQUEST:
    case actionTypes.DELETE_BLOOD_DONOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_BLOOD_DONORS_SUCCESS:
      return {
        ...state,
        bloodDonors: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_BLOOD_DONOR_BY_ID_SUCCESS:
      return {
        ...state,
        bloodDonor: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.CREATE_BLOOD_DONOR_SUCCESS:
      return {
        ...state,
        bloodDonors: [...state.bloodDonors, action.payload],
        loading: false,
        error: null,
      };

    case actionTypes.UPDATE_BLOOD_DONOR_SUCCESS:
      return {
        ...state,
        bloodDonors: state.bloodDonors.map((donor) =>
          donor.id === action.payload.id ? action.payload : donor
        ),
        bloodDonor: state.bloodDonor?.id === action.payload.id ? action.payload : state.bloodDonor,
        loading: false,
        error: null,
      };

    case actionTypes.DELETE_BLOOD_DONOR_SUCCESS:
      return {
        ...state,
        bloodDonors: state.bloodDonors.filter((donor) => donor.id !== action.payload),
        bloodDonor: state.bloodDonor?.id === action.payload ? null : state.bloodDonor,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_BLOOD_DONORS_FAILURE:
    case actionTypes.FETCH_BLOOD_DONOR_BY_ID_FAILURE:
    case actionTypes.CREATE_BLOOD_DONOR_FAILURE:
    case actionTypes.UPDATE_BLOOD_DONOR_FAILURE:
    case actionTypes.DELETE_BLOOD_DONOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default bloodDonorReducer;
