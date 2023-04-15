import classes from "./index.module.css";
import { useState } from "react";

export default function Footer(props) {
    const [text, setText] = useState(0);
    return (
        <footer className={classes.footer}>
            <div onClick={() => setText(text + 1)}>
                {text > 2 ? "Roshan" : "Made with"} ❤️ {text > 2 ? "Shreeya" : "by team Geekoquad"}
            </div>
        </footer>
    );
}