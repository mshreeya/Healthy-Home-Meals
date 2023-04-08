import classes from "./index.module.css";
import logoLong from "../../assets/logoLong.svg";
import CusButton from "../button";
import { InView } from "react-intersection-observer";

export default function NavBar() {
    return (
        <nav>
            <div className={classes.nav}>
                <InView triggerOnce>{({ inView, ref }) => (
                    <img src={logoLong} alt="logo" ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards .3s ease` : "none", opacity: 0 }} />
                )}</InView>
                <div className={classes.buttonsWrap}>
                    <InView triggerOnce>{({ inView, ref }) => (
                        <a href="#" ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards .6s ease` : "none", opacity: 0 }} >
                            <CusButton text="Signout" />
                        </a>
                    )}</InView>
                    <InView triggerOnce>{({ inView, ref }) => (
                        <a href="#" ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards .9s ease` : "none", opacity: 0 }} >
                            <CusButton hollow text="Settings" />
                        </a>
                    )}</InView>
                </div>
            </div>
        </nav>
    );
}