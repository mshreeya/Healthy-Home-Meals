import classes from "./index.module.css";
import Webcam from "react-webcam";
import { useState, useRef, useCallback, useEffect } from "react";
import { InView } from "react-intersection-observer";

import noVideo from "../../assets/noVideo.png";
import CusButton from "../button";

export default function CameraCard(props) {
    const [capturedImg, setcapturedImg] = useState(null);
    const [capturedImgInd, setcapturedImgInd] = useState(null);
    const [webcamPresent, setWebcamPresent] = useState(true);

    const blobToBase64 = (url) => {
        return new Promise(async (resolve, _) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const fileReader = new FileReader();
            fileReader.readAsDataURL(blob);
            fileReader.onloadend = function () {
                resolve(fileReader.result);
            }
        });
    };

    const webcamRef = useRef(null);
    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setcapturedImg(imageSrc);
            setcapturedImgInd(true);
            props.proceed(imageSrc);
        },
        [webcamRef]
    );

    const proceedLogic = function () {
        if (webcamPresent && !capturedImg) {
            capture();
            return;
        }
        if (props.proceedBtn === "Proceed" && (capturedImgInd || webcamPresent)) {
            props.proceed(capturedImg);
        }
    }

    const uploadInput = async function (e) {
        const imgFile = await blobToBase64(URL.createObjectURL(e.target.files[0]))
        setcapturedImg(imgFile);
        setcapturedImgInd(true);
    }

    useEffect(() => {
        props.setPhotoTaken(capturedImg);
    }, [capturedImg])


    return (
        <div className={classes.card}>
            <div className={classes.webcamWrap}>
                <div className={classes.noWebcam}>
                    <img src={noVideo} alt="No Video" />
                    <div>No camera found</div>
                    <div>Allow this site to access your camera in the browser or use the image upload option below</div>
                </div>
                <Webcam className={classes.webcam} videoConstraints={{ facingMode: "environment" }} ref={webcamRef} onUserMediaError={() => setWebcamPresent(false)} />
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
                    <InView triggerOnce>{({ inView, ref }) => (
                        <div onClick={proceedLogic} ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards ease` : "none", opacity: 0 }}>
                            <div style={(props.proceedBtn === "Proceed" && (capturedImgInd || webcamPresent)) ? null : { pointerEvents: "none", cursor: "default", opacity: 0.2 }}>
                                <CusButton text={props.proceedBtn} />
                            </div>
                        </div>
                    )}</InView>

                    <InView triggerOnce>{({ inView, ref }) => (
                        <div ref={ref} style={{ animation: inView ? `${classes.goUp} 1s forwards .3s ease` : "none", opacity: 0 }} onClick={() => {
                            // document.getElementById("imageuploadarea").value = "";
                            // props.setIngredientsData([]);
                            // props.setrecipesData([]);
                            // props.setProceedBtn("Proceed");
                            // setcapturedImgInd(false);
                            // setTimeout(() => {
                            //     setcapturedImg(null);
                            // }, 1000);
                            window.location.reload(true);
                        }}><CusButton text="Reset" hollow /></div>
                    )}</InView>
                </div>
            </div>
        </div>
    );
}