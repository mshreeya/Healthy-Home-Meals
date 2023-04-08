import classes from "./index.module.css";

export default function CusButton(props) {
    return (
        <div className={classes.button + (props.hollow ? (" " + classes.hollow) : "")}>
            <span>{props.text}</span>
        </div>
    );
}