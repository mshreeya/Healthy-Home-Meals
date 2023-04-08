import classes from "./index.module.css";
import logoLong from "../../assets/logoLong.svg";
import CusButton from "../button";

export default function NavBar() {
    return (
        <nav>
            <div className={classes.nav}>
                <img src={logoLong} alt="logo" />
                <div className={classes.buttonsWrap}>
                    <CusButton text="Signout" />
                    <CusButton hollow text="Settings" />
                </div>
            </div>
        </nav>
    );
}