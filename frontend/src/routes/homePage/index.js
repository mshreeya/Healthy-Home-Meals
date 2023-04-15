import CameraCard from "../../components/cameraCard";
import classes from "./index.module.css";
import { InView } from "react-intersection-observer";
import axios from "axios";
import Ingredients from "../../components/ingredients";
import RecipeCard from "../../components/recipeCard";
import { useState } from "react";

export default function HomePage() {
    const [recipesData, setrecipesData] = useState([])

    const recipesList = async (rList) => {
        try {
            const { data: response } = await axios.post(window.APIROOT + 'recipesList', { data: rList }, { withCredentials: true });
            console.log(response.recipes);
            setrecipesData(response.recipes);
        } catch (error) {
            console.log(error);
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
                <CameraCard proceed={recipesList} />
            </section>

            <Ingredients findBtn={recipesList} />

            <section className={classes.recipesCards}>
                {
                    recipesData.map(e => <RecipeCard name={e.name} time={e.time} cuisine={e.cuisine} image={e.image} id={e.id} />)
                }
            </section>
        </>
    );
}