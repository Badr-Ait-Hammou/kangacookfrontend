import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipeService from "../service/recipeService";

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await recipeService.findRecipeById(id);
                setRecipe(response.data);
            } catch (error) {
                console.error("Error fetching recipe details!", error);
            }
        };

        fetchRecipe();
    }, [id]);

    const goBack = () => {
        navigate(-1); // Replacing history.goBack() with navigate(-1)
    };

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className=" mt-20 mb-20 p-2 bg-white    overflow-hidden">

            {/*<div className="flex flex-row items-center bg-white border shadow-sm rounded-xl overflow-hidden">*/}
          <div className="lg:w-4/5 mx-auto flex flex-wrap ">

        <img
                    className="w-1/2 h-120 object-cover"
                    src={`http://127.0.0.1:8000${recipe.image}`}
                    alt={recipe.name}
                />
                <div className="w-1/2 p-4">
                    <h1 className="text-2xl font-bold text-gray-800">{recipe.name}</h1>
                    <p className="mt-2 text-gray-500">{recipe.description}</p>
                    <button
                        type="button"
                        className="py-2 mt-32 px-4 bg-blue-600 text-white rounded-lg mb-4"
                        onClick={goBack}
                    >
                        Back to List
                    </button>
                </div>

            </div>
        </div>

        // <section className="text-gray-600 body-font overflow-hidden">
        //     <div className="container px-5 py-24 mx-auto">
        //         <div className="lg:w-4/5 mx-auto flex flex-wrap">
        //             <img alt="recipe image"
        //                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
        //                  src={`http://127.0.0.1:8000${recipe.image}`}
        //             />
        //             <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        //                 <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{recipe.name}</h1>
        //                 <p className="leading-relaxed">{recipe.description}</p>
        //             </div>
        //         </div>
        //     </div>
        // </section>

    );
};

export default RecipeDetails;
