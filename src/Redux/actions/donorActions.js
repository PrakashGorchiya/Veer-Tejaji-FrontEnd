import * as actionTypes from '../types/actionTypes';

// Fetch all donors
export const fetchDonors = () => ({
  type: actionTypes.FETCH_DONORS_REQUEST,
});

// Fetch donor by ID
export const fetchDonorById = (id) => ({
  type: actionTypes.FETCH_DONOR_BY_ID_REQUEST,
  payload: id,
});

// Create donor
export const createDonor = (donorData) => ({
  type: actionTypes.CREATE_DONOR_REQUEST,
  payload: donorData,
});

// Update donor
export const updateDonor = (id, donorData) => ({
  type: actionTypes.UPDATE_DONOR_REQUEST,
  payload: { id, donorData },
});

// Delete donor
export const deleteDonor = (id) => ({
  type: actionTypes.DELETE_DONOR_REQUEST,
  payload: id,
});
