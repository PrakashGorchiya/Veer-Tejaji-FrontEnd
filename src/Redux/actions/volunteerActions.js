import * as actionTypes from '../types/actionTypes';

// Fetch all volunteers
export const fetchVolunteers = () => ({
  type: actionTypes.FETCH_VOLUNTEERS_REQUEST,
});

// Fetch volunteer by ID
export const fetchVolunteerById = (id) => ({
  type: actionTypes.FETCH_VOLUNTEER_BY_ID_REQUEST,
  payload: id,
});

// Create volunteer
export const createVolunteer = (volunteerData) => ({
  type: actionTypes.CREATE_VOLUNTEER_REQUEST,
  payload: volunteerData,
});

// Update volunteer
export const updateVolunteer = (id, volunteerData) => ({
  type: actionTypes.UPDATE_VOLUNTEER_REQUEST,
  payload: { id, volunteerData },
});

// Delete volunteer
export const deleteVolunteer = (id) => ({
  type: actionTypes.DELETE_VOLUNTEER_REQUEST,
  payload: id,
});
