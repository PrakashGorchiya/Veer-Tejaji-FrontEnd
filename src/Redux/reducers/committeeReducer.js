import * as actionTypes from '../types/actionTypes';

const initialState = {
  members: [],
  member: null,
  loading: false,
  error: null,
};

const committeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMMITTEE_MEMBERS_REQUEST:
    case actionTypes.FETCH_COMMITTEE_MEMBER_BY_ID_REQUEST:
    case actionTypes.CREATE_COMMITTEE_MEMBER_REQUEST:
    case actionTypes.UPDATE_COMMITTEE_MEMBER_REQUEST:
    case actionTypes.DELETE_COMMITTEE_MEMBER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.FETCH_COMMITTEE_MEMBERS_SUCCESS:
      return {
        ...state,
        members: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_COMMITTEE_MEMBER_BY_ID_SUCCESS:
      return {
        ...state,
        member: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.CREATE_COMMITTEE_MEMBER_SUCCESS:
      return {
        ...state,
        members: [...state.members, action.payload],
        loading: false,
        error: null,
      };

    case actionTypes.UPDATE_COMMITTEE_MEMBER_SUCCESS:
      return {
        ...state,
        members: state.members.map((member) =>
          member.id === action.payload.id ? action.payload : member
        ),
        member: state.member?.id === action.payload.id ? action.payload : state.member,
        loading: false,
        error: null,
      };

    case actionTypes.DELETE_COMMITTEE_MEMBER_SUCCESS:
      return {
        ...state,
        members: state.members.filter((member) => member.id !== action.payload),
        member: state.member?.id === action.payload ? null : state.member,
        loading: false,
        error: null,
      };

    case actionTypes.FETCH_COMMITTEE_MEMBERS_FAILURE:
    case actionTypes.FETCH_COMMITTEE_MEMBER_BY_ID_FAILURE:
    case actionTypes.CREATE_COMMITTEE_MEMBER_FAILURE:
    case actionTypes.UPDATE_COMMITTEE_MEMBER_FAILURE:
    case actionTypes.DELETE_COMMITTEE_MEMBER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default committeeReducer;
