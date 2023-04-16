import classes from "./index.module.css";
import CreatableSelect from 'react-select/creatable';
import CusButton from "../button";

import { ingredientsList, dietList } from "../../assets/items";
let valueLabel = {};

for (let i of ingredientsList)
    valueLabel[i.value] = i.label;

for (let i of dietList)
    valueLabel[i.value] = i.label;

export default function Ingredients(props) {
    return (
        <section className={classes.card}>
            <div className={classes.title}>Ingredients</div>
            <div className={classes.desc}>Below are the ingredients detected in your photo along with the default ones set in your account settings. You can remove or add any new items as you like. Click <b>Find recipes</b> below once you are done to find meals you can cook with your ingredients.</div>
            <div style={{ maxWidth: "100%" }}>
                <CreatableSelect isMulti options={ingredientsList} className={classes.select} placeholder="Select ingredients..." onChange={
                    (e) => {
                        let newData = [];
                        e.map(ee => newData.push(ee.value));
                        props.setIngredientsData(newData);
                    }
                }
                    value={props.ingredientsData.map(e => { return { value: e, label: valueLabel[e] || (e.charAt(0).toUpperCase() + e.slice(1)) } })}
                />
            </div>
            <div className={classes.button} onClick={() => {
                props.findBtn(props.ingredientsData);
            }} style={(props.ingredientsData === 0 || props.findBtnText !== "Find recipes") ? { pointerEvents: "none", cursor: "default", opacity: 0.2 } : {}}>
                <CusButton text={props.findBtnText} />
            </div>
        </section >
    );
}