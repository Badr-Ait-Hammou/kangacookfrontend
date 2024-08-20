// src/services/recipeService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const fetchRecipes = () => {
    return axios.get(`${API_BASE_URL}/recipes/`);
};

const createRecipe = (formData) => {
    return axios.post(`${API_BASE_URL}/recipes/create/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

const updateRecipe = (id, formData) => {
    return axios.post(`${API_BASE_URL}/recipes/update/${id}/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

const deleteRecipe = (id) => {
    return axios.delete(`${API_BASE_URL}/recipes/delete/${id}/`);
};
const findRecipeById = (id) => {
    return axios.get(`${API_BASE_URL}/recipes/${id}/`);
};

export default {
    fetchRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    findRecipeById
};
