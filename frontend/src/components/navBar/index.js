import classes from "./index.module.css";
import logoLong from "../../assets/logoLong.svg";
import CusButton from "../button";
import { InView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import axios from "axios";
import { HashLink } from "react-router-hash-link";

export default function NavBar() {
    const [isSignedIn, setIsSignedIn] = useState(2);
    const logText = [
        { "text": "Signin", "link": window.APIROOT + "signin" },
        { "text": "Signout", "link": window.APIROOT + "signout" },
        { "text": "Loading", "link": "" }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(window.APIROOT + 'status', { withCredentials: true });
                console.log(response);
                setIsSignedIn(response.signedIn ? 1 : 0);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <nav>
            <div className={classes.nav}>
                <InView triggerOnce>{({ inView, ref }) => (
                    <HashLink to="/"><img src={logoLong} alt="logo" ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards .3s ease` : "none", opacity: 0 }} /></HashLink>
                )}</InView>
                <div className={classes.buttonsWrap}>
                    <InView triggerOnce>{({ inView, ref }) => (
                        <a href={logText[isSignedIn].link} ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards .6s ease` : "none", opacity: 0 }} >
                            <CusButton text={logText[isSignedIn].text} />
                        </a>
                    )}</InView>
                    {isSignedIn === 1 ? <InView triggerOnce>{({ inView, ref }) => (
                        <HashLink to="/settings" ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards .9s ease` : "none", opacity: 0 }} >
                            <CusButton text="Settings" />
                        </HashLink>
                    )}</InView> : null}
                </div>
            </div>
        </nav>
    );
}