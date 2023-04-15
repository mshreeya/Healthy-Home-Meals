import classes from "./index.module.css";
import CreatableSelect from 'react-select/creatable';
import { ingredientsList } from "../../assets/items";
import CusButton from "../button";

export default function Ingredients(props) {
    return (
        <section className={classes.card}>
            <div className={classes.title}>Ingredients</div>
            <CreatableSelect isMulti options={ingredientsList} className={classes.select} placeholder="Select ingredients..." />
            <div className={classes.button}>
                <CusButton text="Find recipes" />
            </div>
        </section>
    );
}