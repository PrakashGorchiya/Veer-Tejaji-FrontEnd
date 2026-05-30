import * as actionTypes from '../types/actionTypes';

const initialState = {
  donors: [],
  donor: null,
  loading: false,
  error: null,
};

const donorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DONORS_REQUEST:
    case actionTypes.FETCH_DONOR_BY_ID_REQUEST:
    case actionTypes.CREATE_DONOR_REQUEST:
    case actionTypes.UPDATE_DONOR_REQUEST:
    case actionTypes.DELETE_DONOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_DONORS_SUCCESS:
      return {
        ...state,
        donors: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_DONOR_BY_ID_SUCCESS:
      return {
        ...state,
        donor: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.CREATE_DONOR_SUCCESS:
      return {
        ...state,
        donors: [...state.donors, action.payload],
        loading: false,
        error: null,
      };

    case actionTypes.UPDATE_DONOR_SUCCESS:
      return {
        ...state,
        donors: state.donors.map((donor) =>
          donor.id === action.payload.id ? action.payload : donor
        ),
        donor: state.donor?.id === action.payload.id ? action.payload : state.donor,
        loading: false,
        error: null,
      };

    case actionTypes.DELETE_DONOR_SUCCESS:
      return {
        ...state,
        donors: state.donors.filter((donor) => donor.id !== action.payload),
        donor: state.donor?.id === action.payload ? null : state.donor,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_DONORS_FAILURE:
    case actionTypes.FETCH_DONOR_BY_ID_FAILURE:
    case actionTypes.CREATE_DONOR_FAILURE:
    case actionTypes.UPDATE_DONOR_FAILURE:
    case actionTypes.DELETE_DONOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default donorReducer;
