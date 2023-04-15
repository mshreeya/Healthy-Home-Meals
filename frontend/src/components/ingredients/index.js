import classes from "./index.module.css";
import CreatableSelect from 'react-select/creatable';
import { ingredientsList } from "../../assets/items";
import CusButton from "../button";
import { useState } from "react";

export default function Ingredients(props) {
    const [ingredients, setIngredients] = useState([]);

    return (
        <section className={classes.card}>
            <div className={classes.title}>Ingredients</div>
            <div className={classes.desc}>Below are the ingredients detected in your photo along with the default ones set in your account settings. You can remove or add any new items as you like. Click <b>Find recipes</b> below once you are done to find meals you can cook with your ingredients.</div>
            <CreatableSelect isMulti options={ingredientsList} className={classes.select} placeholder="Select ingredients..." onChange={(e) => setIngredients(e)} />
            <div className={classes.button} onClick={() => {
                let newData = [];
                ingredients.map(e => newData.push(e.value));
                props.findBtn(newData);
            }} style={ingredients.length === 0 ? { pointerEvents: "none", cursor: "default", opacity: 0.2 } : {}}>
                <CusButton text="Find recipes" />
            </div>
        </section>
    );
}