import CameraCard from "../../components/cameraCard";
import classes from "./index.module.css";

export default function HomePage() {
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
                    <div>Take a picture of your refrigerator contents or the ingredients available and discover tons of healthy recipes that you can make at home.</div>
                </div>
            </section>

            <section className={classes.headerBelow}>
                <CameraCard />
            </section>
        </>
    );
}