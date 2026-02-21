import * as actionTypes from '../types/actionTypes';

// Fetch all gallery images
export const fetchGalleryImages = () => ({
  type: actionTypes.FETCH_GALLERY_IMAGES_REQUEST,
});

// Fetch gallery image by ID
export const fetchGalleryImageById = (id) => ({
  type: actionTypes.FETCH_GALLERY_IMAGE_BY_ID_REQUEST,
  payload: id,
});

// Create gallery image
export const createGalleryImage = (imageData) => ({
  type: actionTypes.CREATE_GALLERY_IMAGE_REQUEST,
  payload: imageData,
});

// Update gallery image
export const updateGalleryImage = (id, imageData) => ({
  type: actionTypes.UPDATE_GALLERY_IMAGE_REQUEST,
  payload: { id, imageData },
});

// Delete gallery image
export const deleteGalleryImage = (id) => ({
  type: actionTypes.DELETE_GALLERY_IMAGE_REQUEST,
  payload: id,
});
