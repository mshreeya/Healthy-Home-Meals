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
            <CreatableSelect isMulti options={ingredientsList} className={classes.select} placeholder="Select ingredients..." onChange={(e) => setIngredients(e)} />
            <div className={classes.button} onClick={() => {
                let newData = [];
                ingredients.map(e => newData.push(e.value));
                props.findBtn(newData);
            }}>
                <CusButton text="Find recipes" />
            </div>
        </section>
    );
}