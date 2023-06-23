import classes from "./index.module.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import timeImg from "../../assets/time.svg";
import knifeFormImg from "../../assets/knifefork.svg";
import proteinImg from "../../assets/sapling.svg";
import fatsImg from "../../assets/fats.svg";
import caloriesImg from "../../assets/calories.svg";
import peopleImg from "../../assets/people.svg";
import CusButton from "../../components/button";

export default function RecipePage(props) {
    const { id } = useParams();
    const [signedIn, setSignedIn] = useState(true);

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.post(window.APIROOT + 'recipeDetails', { id: id }, { withCredentials: true });
                console.log(response);
                setSignedIn(response.signedIn);
                setData(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [id]);

    return (
        <>
            {signedIn ? null : <Navigate to="/" />}
            <section className={classes.card} style={{ height: data ? "unset" : "100vh" }}>
                {data ?
                    <>
                        <div className={classes.headDetails}>
                            <div className={classes.imgWrap}>
                                <img src={data.image} alt="recipe" />
                            </div>
                            <div>
                                <div className={classes.name}>{data.name}</div>
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
                                    <img src={peopleImg} alt="icon" className={classes.icon} />
                                    <span>Feeds: </span>
                                    <span>{data.feeds} people</span>
                                </div>
                                <div className={classes.item}>
                                    <img src={caloriesImg} alt="icon" className={classes.icon} />
                                    <span>Calories: </span>
                                    <span>{data.nutrition.calories}</span>
                                </div>
                                <div className={classes.item}>
                                    <img src={fatsImg} alt="icon" className={classes.icon} />
                                    <span>Fat: </span>
                                    <span>{data.nutrition.fats}</span>
                                </div>
                                <div className={classes.item}>
                                    <img src={proteinImg} alt="icon" className={classes.icon} />
                                    <span>Protein: </span>
                                    <span>{data.nutrition.protein}</span>
                                </div>
                                <a href={data.url} target="_blank" rel="noopener noreferrer" >
                                    <div className={classes.originalBtn} >
                                        <CusButton text="Open original" />
                                    </div>
                                </a>
                            </div>
                        </div>

                        <iframe className={classes.video} src={data.youtube} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen />

                        <div>
                            <div className={classes.title}>Ingredients</div>
                            <div className={classes.ingredients}>
                                {data.ingredients.map(e => <div className={classes.btnIng}>{e}</div>)}
                            </div>
                        </div>

                        <div>
                            <div className={classes.title}>Cooking instructions</div>
                            <div>{data.instructions.split(/\r?\n/).map(e =>
                                <p>{e}</p>
                            )}</div>
                        </div>
                    </> : null
                }
            </section>
        </>
    );
}