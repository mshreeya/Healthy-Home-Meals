import classes from "./index.module.css";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { InView } from "react-intersection-observer";

import cardHeader from "../../assets/settingheader.jpg";
import CusButton from "../../components/button";

const ingredientsList = [
    { value: "orange", label: "Orange" },
];

export default function SettingsPage(props) {
    return (
        <>
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
                        <CreatableSelect isMulti options={ingredientsList} className={classes.select} />
                    </div>
                    <div>
                        <div className={classes.formHead}>Allergies</div>
                        <div className={classes.formSubHead}>Select or add ingredients that you can't eat. Recipes requiring them would be excluded from your results. You can select common items or add your own.</div>
                        <CreatableSelect isMulti options={ingredientsList} className={classes.select} />
                    </div>
                    <div>
                        <div className={classes.formHead}>Dietary styles</div>
                        <div className={classes.formSubHead}>Select all your dietary styles and goals to further filter out your recipe results.</div>
                        <Select isMulti options={ingredientsList} className={classes.select} />
                    </div>
                    <InView triggerOnce>{({ inView, ref }) => (
                        <div ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards ease` : "none", opacity: 0 }} className={classes.savebtn}>
                            <CusButton text="Save changes" />
                        </div>
                    )}</InView>
                </div>
            </section>
        </>
    );
}