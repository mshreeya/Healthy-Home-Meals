import classes from "./index.module.css";
import timeImg from "../../assets/time.svg";
import knifeFormImg from "../../assets/knifefork.svg";
import CusButton from "../button";


export default function RecipeCard(props) {
    return (
        <div className={classes.card}>
            <div className={classes.imgWrap}>
                <img src="https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Karthika_Gopalakrishnan/Phool_Gobhir_Paturi.jpg" alt="recipe" />
            </div>
            <div className={classes.name}>Bengali Phool Gobhir Paturi</div>
            <div className={classes.item}>
                <img src={timeImg} alt="icon" className={classes.icon} />
                <span>Cooking time: </span>
                <span>40 mins</span>
            </div>
            <div className={classes.item}>
                <img src={knifeFormImg} alt="icon" className={classes.icon} />
                <span>Cuisine: </span>
                <span>Bengali dish</span>
            </div>
            <div className={classes.btn}>
                <CusButton text="View recipe" />
            </div>
        </div>
    );
}