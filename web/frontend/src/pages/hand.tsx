import React, { useCallback, useEffect, useRef, useState, VFC } from 'react';
import Webcam from 'react-webcam';
import { css } from '@emotion/css';
import { Camera } from '@mediapipe/camera_utils';
import { Hands, Results } from '@mediapipe/hands';
import { drawCanvas } from './drawCanvas';

export default function Hand(){
    const webcamRef = useRef<Webcam>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const resultsRef = useRef<any>(null)
    const [outPut, setOutPut] = useState([{}]);

    /**
     * 検出結果（フレーム毎に呼び出される）
     * @param results
     */
    const onResults = useCallback((results: Results) => {
        resultsRef.current = results
        const canvasCtx = canvasRef.current!.getContext('2d')!
        drawCanvas(canvasCtx, results);
        //check(outPut,results);
    }, [])

    const test = () =>{
        const x = {
            a:1,
            b:2,
            c:3
        }
        const y = {
            a:1,
            b:2,
            c:3
        }
        const isSame = Object.keys(x).every(key => x[key] === y[key]);

        if (isSame) {
            console.log("okey!");
        }
    }

    const check = (outPut,results)=>{
        outPut.forEach((o: any) => {
            results.forEach((r:any)=>{
                const isSame = Object.keys(o).every(key => o[key] === r[key]);
                console.log(Object.keys(o).every(key=>(o[key],r[key])));
                if(isSame) console.log("okey");
            })
        });
    }

    // 初期設定
    useEffect(() => {
        test();
        const hands = new Hands({
            locateFile: file => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
            }
        })

        hands.setOptions({
            maxNumHands: 2,
            modelComplexity: 1,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        })

        hands.onResults(onResults)

        if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null) {
            const camera = new Camera(webcamRef.current.video!, {
                onFrame: async () => {
                    await hands.send({ image: webcamRef.current!.video! })
                },
                width: 1280,
                height: 720
            })
            camera.start()
        }
    }, [onResults])

    /** 検出結果をconsoleに出力する */
    const OutputData = () => {
        const results = resultsRef.current as Results
        setOutPut(results.multiHandLandmarks);
        console.log(results.multiHandLandmarks)
    }

    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: 'user'
    }

    return (
        <div className={styles.container}>
            {/* capture */}
            <Webcam
                audio={false}
                style={{ visibility: 'hidden' }}
                width={1280}
                height={720}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            {/* draw */}
            <canvas ref={canvasRef} className={styles.canvas} />
            {/* output */}
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={OutputData}>
                    Output Data
                </button>
            </div>
        </div>
    )
}

// ==============================================
// styles

const styles = {
    container: css`
        position: relative;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    `,
    canvas: css`
        position: absolute;
        width: 1280px;
        height: 720px;
        background-color: #fff;
    `,
    buttonContainer: css`
        position: absolute;
        top: 20px;
        left: 20px;
    `,
    button: css`
        color: #fff;
        background-color: #0082cf;
        font-size: 1rem;
        border: none;
        border-radius: 5px;
        padding: 10px 10px;
        cursor: pointer;
    `
}
