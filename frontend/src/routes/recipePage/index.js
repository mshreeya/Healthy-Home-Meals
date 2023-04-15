import classes from "./index.module.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import timeImg from "../../assets/time.svg";
import knifeFormImg from "../../assets/knifefork.svg";
import saplingImg from "../../assets/sapling.svg";
import CusButton from "../../components/button";

export default function RecipePage(props) {
    const { id } = useParams();
    const [signedIn, setSignedIn] = useState(true);

    // const [data, setData] = useState();
    const data = {
        "cuisine": "Middle Eastern",
        "id": "772",
        "image": "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Smitha-Kalluraya/Veg_Lebanese_Mihshi_Malfuf_Stuffed_Cabbage_Leaves.jpg",
        "ingredients": [
            "tomato",
            "basmati rice",
            "salt",
            "lemon squeezed",
            "cloves garlic",
            "water",
            "virgin olive oil",
            "onion",
            "parsley leaves",
            "garlic",
            "spice powder",
            "black pepper powder",
            "white garbanzo",
            "cabbage (patta gobi muttaikose)"
        ],
        "instructions": "To begin making the Veg Lebanese Mihshi Malfuf recipe, clean cabbage and parboil head in a large kettle of water just long enough to soften and separate leaves.\nPlace the cabbage leaves in a colander as you peel them.Pit out the large stem from the bottom of the cabbage.\nThis will help the leaves to roll easily.\n Mix all the ingredients mentioned under stuffing in a bowl .\nLay each cabbage leaf separately on a cutting board, cut out the stem if it's too thick.\nSpread 1 to 2 table spoons of rice stuffing along the edge of the leaf, then roll it slowly and tightly over the stuffing all the wayLine up the stuffed rolls carefully in a wide/deep cooking pot one by the other in a compact mannerPlace garlic flakes in between.\nPour tomato puree and water over the cabbage rolls.\nAdd salt, pepper powder and oil.\nThe sauce should cover the rolls and if not, add more water until it does.Carefully shake/tilt the cooking pot sideways a few times to ensure the sauce seeps through everywherePlace a heavy plate inside the pot, on top of the rolls, cover the pot, and turn on the stove on high heat for about 5-10 minutes till they boil and later simmer and cook for 40 minutes.Serve hot with a squeeze of lemon juice.\nServe Veg Lebanese Mihshi Malfuf along with Mujaddara for your weekend dinner with friends and family.\n",
        "name": "Veg Lebanese Mihshi Malfuf Recipe (Stuffed Cabbage Leaves)",
        "signedIn": true,
        "time": 60,
        "url": "https://www.archanaskitchen.com/veg-lebanese-mihshi-malfuf-recipe-stuffed-cabbage-leaves",
        "userData": {
            "email": "roshan1337x@gmail.com",
            "fname": "Roshan",
            "name": "Roshan Dash"
        },
        "youtube": "https://www.youtube.com/embed/p5ZKLovRiWQ"
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const { data: response } = await axios.post(window.APIROOT + 'recipeDetails', { id: id }, { withCredentials: true });
    //             console.log(response);
    //             setSignedIn(response.signedIn);
    //             setData(response);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    // }, []);

    return (
        <>
            {signedIn ? null : <Navigate to="/" />}
            <section className={classes.card}>
                <div className={classes.name}>{data.name}</div>

                <div className={classes.headDetails}>
                    <div className={classes.imgWrap}>
                        <img src={data.image} alt="recipe" />
                    </div>
                    <div>
                        <div className={classes.item}>
                            <img src={timeImg} alt="icon" className={classes.icon} />
                            <span>Cooking time: </span>
                            <span>{data.time} mins</span>
                        </div>
                        <div className={classes.item}>
                            <img src={knifeFormImg} alt="icon" className={classes.icon} />
                            <span>Cuisine: </span>
                            <span>{data.cuisine}</span>
                        </div>
                        <div className={classes.item}>
                            <img src={saplingImg} alt="icon" className={classes.icon} />
                            <span>Total ingredients: </span>
                            <span>{data.ingredients.length}</span>
                        </div>
                        <a href="">
                            <div className={classes.originalBtn} >
                                <CusButton text="Open original" />
                            </div>
                        </a>
                    </div>
                </div>

                <iframe className={classes.video} src="https://www.youtube.com/embed/p5ZKLovRiWQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen />
            </section>
        </>
    );
}