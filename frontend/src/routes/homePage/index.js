import classes from "./index.module.css";
import logoImg from "../../assets/logo.svg"

export default function HomePage() {
    return (
        <>
            <section className={classes.headerSection}>
                <img src={logoImg} alt="logo" />
            </section>
        </>
    );
}