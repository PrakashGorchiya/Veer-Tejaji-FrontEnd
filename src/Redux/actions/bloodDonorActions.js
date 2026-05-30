import * as actionTypes from '../types/actionTypes';

// Fetch all blood donors
export const fetchBloodDonors = () => ({
  type: actionTypes.FETCH_BLOOD_DONORS_REQUEST,
});

// Fetch blood donor by ID
export const fetchBloodDonorById = (id) => ({
  type: actionTypes.FETCH_BLOOD_DONOR_BY_ID_REQUEST,
  payload: id,
});

// Create blood donor
export const createBloodDonor = (donorData) => ({
  type: actionTypes.CREATE_BLOOD_DONOR_REQUEST,
  payload: donorData,
});

// Update blood donor
export const updateBloodDonor = (id, donorData) => ({
  type: actionTypes.UPDATE_BLOOD_DONOR_REQUEST,
  payload: { id, donorData },
});

// Delete blood donor
export const deleteBloodDonor = (id) => ({
  type: actionTypes.DELETE_BLOOD_DONOR_REQUEST,
  payload: id,
});
