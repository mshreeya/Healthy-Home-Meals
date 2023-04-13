import classes from "./index.module.css";
import Webcam from "react-webcam";
import { useState, useRef, useCallback } from "react";

import noVideo from "../../assets/noVideo.png";
import CusButton from "../button";

export default function CameraCard(props) {
    const [capturedImg, setcapturedImg] = useState(null);
    const [capturedImgInd, setcapturedImgInd] = useState(null);

    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setcapturedImg(imageSrc);
            setcapturedImgInd(true);
        },
        [webcamRef]
    );
    const uploadInput = function (e) {
        setcapturedImg(URL.createObjectURL(e.target.files[0]));
        setcapturedImgInd(true);
    }

    return (
        <div className={classes.card}>
            <div className={classes.webcamWrap}>
                <div className={classes.noWebcam}>
                    <img src={noVideo} alt="No Video" />
                    <div>No camera found</div>
                    <div>Allow this site to access your camera in the browser or use the image upload option below</div>
                </div>
                <Webcam className={classes.webcam} videoConstraints={{ facingMode: "environment" }} ref={webcamRef} />
                {
                    <div className={classes.capture + (capturedImgInd ? (" " + classes.fadeAnim) : "")}>
                        <img src={capturedImg} alt="Captured" />
                    </div>
                }
                <div className={classes.gapCover} />
                <div className={classes.orText}>OR</div>
                <div className={classes.uploadImg}>
                    <div>Drag or click here to upload an image file from your device</div>
                    <input id="imageuploadarea" disabled={false} style={{ cursor: false ? "not-allowed" : "pointer" }} type="file" accept="capture=camera, image/png, image/jpeg" className={classes.inputImg} onChange={e => uploadInput(e)} />
                </div>
                <div className={classes.buttonsWrap}>
                    <div onClick={capture}>
                        <CusButton text="Proceed" />
                    </div>
                    <div onClick={() => {
                        document.getElementById("imageuploadarea").value = "";
                        setcapturedImgInd(false);
                        setTimeout(() => {
                            setcapturedImg(null);
                        }, 1000);
                    }}><CusButton text="Reset" hollow /></div>
                </div>
            </div>
        </div>
    );
}