import * as actionTypes from '../types/actionTypes';

const initialState = {
  volunteers: [],
  volunteer: null,
  loading: false,
  error: null,
};

const volunteerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_VOLUNTEERS_REQUEST:
    case actionTypes.FETCH_VOLUNTEER_BY_ID_REQUEST:
    case actionTypes.CREATE_VOLUNTEER_REQUEST:
    case actionTypes.UPDATE_VOLUNTEER_REQUEST:
    case actionTypes.DELETE_VOLUNTEER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_VOLUNTEERS_SUCCESS:
      return {
        ...state,
        volunteers: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_VOLUNTEER_BY_ID_SUCCESS:
      return {
        ...state,
        volunteer: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.CREATE_VOLUNTEER_SUCCESS:
      return {
        ...state,
        volunteers: [...state.volunteers, action.payload],
        loading: false,
        error: null,
      };

    case actionTypes.UPDATE_VOLUNTEER_SUCCESS:
      return {
        ...state,
        volunteers: state.volunteers.map((volunteer) =>
          volunteer.id === action.payload.id ? action.payload : volunteer
        ),
        volunteer: state.volunteer?.id === action.payload.id ? action.payload : state.volunteer,
        loading: false,
        error: null,
      };

    case actionTypes.DELETE_VOLUNTEER_SUCCESS:
      return {
        ...state,
        volunteers: state.volunteers.filter((volunteer) => volunteer.id !== action.payload),
        volunteer: state.volunteer?.id === action.payload ? null : state.volunteer,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_VOLUNTEERS_FAILURE:
    case actionTypes.FETCH_VOLUNTEER_BY_ID_FAILURE:
    case actionTypes.CREATE_VOLUNTEER_FAILURE:
    case actionTypes.UPDATE_VOLUNTEER_FAILURE:
    case actionTypes.DELETE_VOLUNTEER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default volunteerReducer;
