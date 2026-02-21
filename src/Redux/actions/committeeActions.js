import * as actionTypes from '../types/actionTypes';

// Fetch all committee members
export const fetchCommitteeMembers = () => ({
  type: actionTypes.FETCH_COMMITTEE_MEMBERS_REQUEST,
});

// Fetch committee member by ID
export const fetchCommitteeMemberById = (id) => ({
  type: actionTypes.FETCH_COMMITTEE_MEMBER_BY_ID_REQUEST,
  payload: id,
});

// Create committee member
export const createCommitteeMember = (memberData) => ({
  type: actionTypes.CREATE_COMMITTEE_MEMBER_REQUEST,
  payload: memberData,
});

// Update committee member
export const updateCommitteeMember = (id, memberData) => ({
  type: actionTypes.UPDATE_COMMITTEE_MEMBER_REQUEST,
  payload: { id, memberData },
});

// Delete committee member
export const deleteCommitteeMember = (id) => ({
  type: actionTypes.DELETE_COMMITTEE_MEMBER_REQUEST,
  payload: id,
});
