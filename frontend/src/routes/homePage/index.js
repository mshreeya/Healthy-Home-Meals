import CameraCard from "../../components/cameraCard";
import classes from "./index.module.css";
import { InView } from "react-intersection-observer";
import axios from "axios";
import Ingredients from "../../components/ingredients";
import RecipeCard from "../../components/recipeCard";
import { useState } from "react";

export default function HomePage() {
    const [recipesData, setrecipesData] = useState([]);
    const [ingredientsData, setIngredientsData] = useState([]);
    const [photoTaken, setPhotoTaken] = useState(null);
    const [signInNeed, setSignInNeed] = useState(false);

    const [proceedBtn, setProceedBtn] = useState("Proceed");
    const [findBtn, setFindBtn] = useState("Find recipes");

    const recipesList = async (rList) => {
        try {
            setFindBtn("Finding ⌛");
            const { data: response } = await axios.post(window.APIROOT + 'recipesList', { data: rList }, { withCredentials: true });
            setrecipesData(response.recipes);
            setFindBtn("Found ✅");
        } catch (error) {
            setFindBtn("Error ❌");
        }
    }

    const ingredientsList = async () => {
        try {
            setProceedBtn("Processing ⌛")
            const { data: response } = await axios.post(window.APIROOT + 'ingredientsList', { img: photoTaken }, { withCredentials: true });
            if (!response.signedIn) {
                window.location.replace(window.APIROOT + "signin");
            }
            else {
                setIngredientsData(response.ingredients);
                setProceedBtn("Processed ✅")
            }
        } catch (error) {
            setProceedBtn("Error ❌")
        }
    }

    return (
        <>
            <section className={classes.headerSection}>
                <div className={classes.overlay} />
                <div className={classes.bottomShape} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
                        <path class="elementor-shape-fill" d="M1000,4.3V0H0v4.3C0.9,23.1,126.7,99.2,500,100S1000,22.7,1000,4.3z"></path>
                    </svg>
                </div>
                <div className={classes.headerText}>
                    <div>Healthy <span style={{ color: "#46dc5c" }}>Outside</span> Starts From <span style={{ color: "#46dc5c" }}>Inside</span></div>
                    <InView triggerOnce>{({ inView, ref }) => (
                        <div ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards .3s ease` : "none", opacity: 0 }} >Take a picture of your refrigerator contents or the ingredients available and discover tons of healthy recipes that you can make at home.</div>
                    )}</InView>
                </div>
            </section>

            <section className={classes.headerBelow}>
                <CameraCard setProceedBtn={setProceedBtn} proceedBtn={proceedBtn} proceed={ingredientsList} setrecipesData={setrecipesData} setIngredientsData={setIngredientsData} setPhotoTaken={setPhotoTaken} />
            </section>

            {ingredientsData.length === 0 ? null :
                <Ingredients findBtn={recipesList} ingredientsData={ingredientsData} setIngredientsData={setIngredientsData} findBtnText={findBtn} />
            }

            <section className={classes.recipesCards}>
                {
                    recipesData.map(e => <RecipeCard name={e.name} time={e.time} cuisine={e.cuisine} image={e.image} id={e.id} />)
                }
            </section>
        </>
    );
}