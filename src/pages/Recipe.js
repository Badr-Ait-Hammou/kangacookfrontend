import React, { useState, useEffect, useRef } from 'react';
import recipeService from "../service/recipeService";
import Dialog from "../components/Dialog";
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import {Link} from "react-router-dom";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [newRecipe, setNewRecipe] = useState({ name: '', description: '', image: null });
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const toast = useRef(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    // Fetch all recipes
    const fetchRecipes = async () => {
        try {
            const response = await recipeService.fetchRecipes();
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes!", error);
        }
    };

    const validateFields = (recipe) => {
        return recipe.name && recipe.description && recipe.image;
    };

    // Create a new recipe
    const createRecipe = async () => {
        if (!validateFields(newRecipe)) {
            showToast("Please fill in all the required fields and upload an image." ,"error","oops");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', newRecipe.name);
            formData.append('description', newRecipe.description);
            formData.append('image', newRecipe.image);

            await recipeService.createRecipe(formData);
            fetchRecipes();
            setNewRecipe({ name: '', description: '', image: null });
            setShowModal(false); // Close modal after successful creation
            showToast("Recipe created successfully." ,"success","done");
        } catch (error) {
            console.error("Error creating recipe!", error);
        }
    };

    // Update a recipe
    const updateRecipe = async () => {
        if (!editingRecipe || !validateFields(editingRecipe)) {
            showToast("Please fill in all the required fields and upload an image.","error","oops");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', editingRecipe.name);
            formData.append('description', editingRecipe.description);
            formData.append('image', editingRecipe.image);

            await recipeService.updateRecipe(editingRecipe.id, formData);
            fetchRecipes();
            setEditingRecipe(null);
            setNewRecipe({ name: '', description: '', image: null });
            setShowModal(false); // Close modal after successful update
            showToast("Recipe updated successfully.","info","done");
        } catch (error) {
            console.error("Error updating recipe!", error);
        }
    };

    // Handle file change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (modalType === 'create') {
                setNewRecipe({ ...newRecipe, image: file });
            } else {
                setEditingRecipe({ ...editingRecipe, image: file });
            }
        }
    };

    // Delete a recipe with confirmation
    const deleteRecipe = async (id) => {
        confirmDialog({
            message: 'Are you sure you want to delete this recipe?',
            header: 'Confirm',
            icon: 'pi pi-info-circle',
            accept: async () => {
                try {
                    await recipeService.deleteRecipe(id);
                    fetchRecipes();
                    showToast("Recipe deleted successfully.", "success", "done");
                } catch (error) {
                    console.error("Error deleting recipe!", error);
                }
            },
            reject: () => {
                showToast("Recipe deletion cancelled.", "info", "info");
            }
        });
    };


    // Open modal for creating or updating
    const openModal = (type, recipe) => {
        setModalType(type);
        if (type === 'update' && recipe) {
            setEditingRecipe(recipe);
        } else {
            setNewRecipe({ name: '', description: '', image: null });
        }
        setShowModal(true);
    };

    const showToast = (message ,color, state) => {
        toast.current.show({ severity: color, summary: state, detail: message, life: 2000 });
    };

    return (
        <div className="p-4">
            <Toast ref={toast} />
            <ConfirmDialog />
            <div className="flex justify-between">
            <h1 className="text-2xl justify-start font-bold mb-4">Recipe List</h1>
            <button
                type="button"
                className="py-2 justify-end px-4 bg-blue-600 text-white rounded-lg mb-4"
                onClick={() => openModal('create')}
            >
                Add New Recipe
            </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="flex flex-col group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow-lg transition">
                        <div className="relative pt-[50%] sm:pt-[60%] lg:pt-[80%] rounded-t-xl overflow-hidden">
                            <Link
                                to={`/recipe-details/${recipe.id}`}
                                className="py-2 px-4 bg-green-500 text-white rounded-lg"
                            >
                            <img
                                className="absolute top-0 start-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                src={`http://127.0.0.1:8000/media/${recipe.image}`}
                                alt={recipe.name}
                            />
                            </Link>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800">{recipe.name}</h3>
                            <p className="mt-1 text-gray-500">{recipe.description}</p>
                        </div>
                        <div className="flex justify-between p-4 border-t">
                            <button
                                type="button"
                                className="py-2 px-4 bg-yellow-500 text-white rounded-lg"
                                onClick={() => openModal('update', recipe)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                className="py-2 px-4 bg-red-500 text-white rounded-lg"
                                onClick={() => deleteRecipe(recipe.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create/Update Recipe Modal */}
            <Dialog
                open={showModal}
                onClose={() => setShowModal(false)}
                onSave={modalType === 'create' ? createRecipe : updateRecipe}
                title={modalType === 'create' ? "Add a New Recipe" : "Update Recipe"}
                saveButtonText={modalType === 'create' ? "Add Recipe" : "Update Recipe"}
            >
                <input
                    type="text"
                    placeholder="Name"
                    value={modalType === 'update' ? (editingRecipe?.name || '') : newRecipe.name}
                    onChange={(e) => modalType === 'update'
                        ? setEditingRecipe({ ...editingRecipe, name: e.target.value })
                        : setNewRecipe({ ...newRecipe, name: e.target.value })}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={modalType === 'update' ? (editingRecipe?.description || '') : newRecipe.description}
                    onChange={(e) => modalType === 'update'
                        ? setEditingRecipe({ ...editingRecipe, description: e.target.value })
                        : setNewRecipe({ ...newRecipe, description: e.target.value })}
                    className="w-full p-2 mb-4 border rounded-lg"
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full p-2 border rounded-lg mb-4"
                />
            </Dialog>
        </div>
    );
};

export default RecipeList;
