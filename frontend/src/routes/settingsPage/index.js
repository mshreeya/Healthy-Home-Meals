import classes from "./index.module.css";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { InView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import cardHeader from "../../assets/settingheader.jpg";
import CusButton from "../../components/button";

const ingredientsList = [
    { value: "apple", label: "Apple" },
    { value: "ash gourd", label: "Ash Gourd" },
    { value: "beet root", label: "Beet Root" },
    { value: "bitter gourd", label: "Bitter Gourd" },
    { value: "bottle gourd", label: "Bottle Gourd" },
    { value: "brinjal", label: "Brinjal" },
    { value: "broccoli", label: "Broccoli" },
    { value: "cabbage", label: "Cabbage" },
    { value: "capsicum", label: "Capsicum" },
    { value: "carrot", label: "Carrot" },
    { value: "cauliflower", label: "Cauliflower" },
    { value: "Chicken", label: "Chicken" },
    { value: "Coriender", label: "Coriender" },
    { value: "corn", label: "Corn" },
    { value: "Cottage Cheese", label: "Cottage Cheese" },
    { value: "cucumber", label: "Cucumber" },
    { value: "Egg", label: "Egg" },
    { value: "Elephant Yum", label: "Elephant Yum" },
    { value: "Fish", label: "Fish" },
    { value: "garlic", label: "Garlic" },
    { value: "Ginger", label: "Ginger" },
    { value: "Green Onion", label: "Green Onion" },
    { value: "Kohlrabi", label: "Kohl Rabi" },
    { value: "lady finger", label: "Lady Finger" },
    { value: "Lemon", label: "Lemon" },
    { value: "Lettuce", label: "Lettuce" },
    { value: "Milk", label: "Milk" },
    { value: "Mint", label: "Mint" },
    { value: "mushroom", label: "Mushroom" },
    { value: "onion", label: "Onion" },
    { value: "Papaya", label: "Papaya" },
    { value: "peas", label: "Peas" },
    { value: "potato", label: "Potato" },
    { value: "pumpkin", label: "Pumpkin" },
    { value: "Raddish", label: "Raddish" },
    { value: "Raw Banana", label: "Banana" },
    { value: "Raw Jackfruit", label: "Jackfruit" },
    { value: "spinach", label: "Spinach" },
    { value: "tomato", label: "Tomato" },
    { value: "Turnip", label: "Turnip" },
];

const dietList = [
    { value: "vegeterian", label: "Vegeterian" },
    { value: "lowcalorie", label: "Low Calorie" },
    { value: "nolactose", label: "Lactose Free" },
    { value: "nogluten", label: "Gluten Free" },
    { value: "nodairy", label: "Dairy Free" },
    { value: "kosher", label: "Kosher" },
];

let valueLabel = {};

for (let i of ingredientsList)
    valueLabel[i.value] = i.label;

for (let i of dietList)
    valueLabel[i.value] = i.label;


export default function SettingsPage(props) {
    const [data, setData] = useState({ ingredients: [], allergies: [], dietaryStyle: [] });
    const [signedIn, setSignedIn] = useState(true);
    const [saveBtnText, setsaveBtnText] = useState("Save changes");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(window.APIROOT + 'getDefaults', { withCredentials: true });
                setSignedIn(response.signedIn);
                if (response.signedIn) {
                    const newData = { ingredients: response.ingredients, allergies: response.allergies, dietaryStyle: response.dietaryStyle };
                    setData(newData);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const updateData = async () => {
        setsaveBtnText("Saving ⌛")
        try {
            await axios.post(window.APIROOT + 'setDefaults', data, { withCredentials: true });
            setsaveBtnText("Saved ✅")
        } catch (error) {
            console.log(error);
            setsaveBtnText("Error ❌")
        }
        setTimeout(() => {
            setsaveBtnText("Save changes");
        }, 2000);
    }

    return (
        <>
            {signedIn ? null : <Navigate to="/" />}
            <section className={classes.topText}>
                <InView triggerOnce>{({ inView, ref }) => (
                    <div ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards ease` : "none", opacity: 0 }}>Default <span style={{ color: "#37B74A" }}>Settings</span></div>
                )}</InView>
                <InView triggerOnce>{({ inView, ref }) => (
                    <div ref={ref} style={{ animation: inView ? `${classes.goUp} 1s .3s forwards ease` : "none", opacity: 0 }}>Set your preferred settings to be used by default while you use Healthy Home Meals such as ingredients you usually have at your home, and your dietary preferences.</div>
                )}</InView>
            </section>
            <section className={classes.card}>
                <div className={classes.cardImg}>
                    <img src={cardHeader} alt="Card" />
                </div>
                <div className={classes.formArea}>
                    <div>
                        <div className={classes.formHead}>Ingredients</div>
                        <div className={classes.formSubHead}>Items that you usually have at home which would be auto included with the list of ingredients detected in your photos. You can select common items or add your own.</div>
                        <CreatableSelect isMulti options={ingredientsList} className={classes.select} placeholder="Select default ingredients..." onChange={
                            (e) => {
                                let newData = [];
                                e.map(ee => newData.push(ee.value));
                                setData({ ...data, ingredients: newData });
                            }
                        } value={data.ingredients.map(e => { return { value: e, label: valueLabel[e] || (e.charAt(0).toUpperCase() + e.slice(1)) } })} />
                    </div>
                    <div>
                        <div className={classes.formHead}>Allergies</div>
                        <div className={classes.formSubHead}>Select or add ingredients that you can't eat. Recipes requiring them would be excluded from your results. You can select common items or add your own.</div>
                        <CreatableSelect isMulti options={ingredientsList} className={classes.select} placeholder="Select allergies..." onChange={
                            (e) => {
                                let newData = [];
                                e.map(ee => newData.push(ee.value));
                                setData({ ...data, allergies: newData });
                            }
                        } value={data.allergies.map(e => { return { value: e, label: valueLabel[e] || (e.charAt(0).toUpperCase() + e.slice(1)) } })} />
                    </div>
                    <div>
                        <div className={classes.formHead}>Dietary styles</div>
                        <div className={classes.formSubHead}>Select all your dietary styles and goals to further filter out your recipe results.</div>
                        <Select isMulti options={dietList} className={classes.select} placeholder="Select dietary styles..." onChange={
                            (e) => {
                                let newData = [];
                                e.map(ee => newData.push(ee.value));
                                setData({ ...data, dietaryStyle: newData });
                            }
                        } value={data.dietaryStyle.map(e => { return { value: e, label: valueLabel[e] } })} />
                    </div>
                    <InView triggerOnce>{({ inView, ref }) => (
                        <div ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards ease` : "none", opacity: 0 }} className={classes.savebtn} onClick={updateData}>
                            <CusButton text={saveBtnText} />
                        </div>
                    )}</InView>
                </div>
            </section>
        </>
    );
}