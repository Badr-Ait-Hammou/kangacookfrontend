import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import RecipeList from "./pages/Recipe";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css"
import RecipeDetails from "./pages/RecipeDetails";
function App() {
    return (
        <div>
            <Navbar/>
            <Routes>
                <Route path='/' element={<RecipeList/>}/>
                <Route path="/recipe-details/:id" element={<RecipeDetails/>} />

            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
