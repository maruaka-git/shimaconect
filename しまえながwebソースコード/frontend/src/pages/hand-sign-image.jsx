import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { server } from '../App';
import './hand-sign-image.css';

const HandSignImage = (props) => {
    const navigate = useNavigate();
    const [stream, setStream] = useState(null);

    useEffect(() => {
        // オーバレイを開閉する関数
        const overlay = document.getElementById('sub-menu');
        function overlayToggle() {
          overlay.classList.toggle('submenu-on');
        }
        // 指定した要素に対して上記関数を実行するクリックイベントを設定
        const clickArea = document.getElementsByClassName('main-screen-hambirger-menu');
        for (let i = 0; i < clickArea.length; i++) {
          clickArea[i].addEventListener('click', overlayToggle, false);
        }
    
        // イベントに対してバブリングを停止
        function stopEvent(event) {
          event.stopPropagation();
        }
        const overlayInner = document.getElementById('sub-menu-main');
        overlayInner.addEventListener('click', stopEvent, false);
    
        // cleanup 関数でイベントリスナーを削除
        return () => {
          for (let i = 0; i < clickArea.length; i++) {
            clickArea[i].removeEventListener('click', overlayToggle, false);
          }
          overlayInner.removeEventListener('click', stopEvent, false);
        };
      }, []); // 第二引数に空の配列を渡すことで、マウント時のみ実行
    
      // close-btn ボタンのクリックイベントハンドラを追加
      const handleCloseBtnClick = () => {
        const overlay = document.getElementById('sub-menu');
        overlay.classList.remove('submenu-on');
    };

    //サブメニューのプロフィールクリックイベント
    const handleProfileBtnClick = () => {
    navigate('/profile');
    }

    //サブメニューのハンドサインクリックイベント
    const handleHandsignBtnClick = () => {
    navigate('/hand-sign-list');
    }

    //サブメニューのログアウトクリックイベント
    const handleLogoutBtnClick = () => {
    navigate('/log-out');
    }

    //サブメニューのサインアウトクリックイベント
    const handleSignoutBtnClick = () => {
    navigate('/account-delete');
    }

    useEffect(() => {
        const video = document.getElementById('video');
        const startCaptureButton = document.getElementById('startCapture');
        const countdownDiv = document.getElementById('countdown');

        // カメラの映像を表示
        async function startCamera() {
            try {
                const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(newStream);
                video.srcObject = newStream;
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        }

        // カウントダウンを開始
        function startCountdown() {
            let seconds = 5;
            countdownDiv.textContent = seconds;
            const countdownInterval = setInterval(() => {
                countdownDiv.textContent = seconds;
                if (seconds <= 0) {
                    clearInterval(countdownInterval);
                    captureImage();
                }
                seconds--;
            }, 1000);
        }

        // キャプチャした画像を表示
        function captureImage() {
            // 正方形のキャンバスを作成
            const canvas = document.createElement('canvas');
            const size = Math.min(video.videoWidth, video.videoHeight);
            canvas.width = size;
            canvas.height = size;

            const ctx = canvas.getContext('2d');

            // キャンバスに映像を正方形に描画
            ctx.drawImage(
                video,
                (video.videoWidth - size) / 2, // 横方向の中央に配置
                (video.videoHeight - size) / 2, // 縦方向の中央に配置
                size,
                size,
                0,
                0,
                size,
                size
            );

            // 画像をダウンロードするなどの処理を行う
            downloadImage(canvas.toDataURL('image/png'), 'captured_image.png');
        }

        // 画像をダウンロードする関数
        function downloadImage(dataURL, filename) {
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        // キャプチャ開始ボタンがクリックされたときのイベントリスナー
    const handleStartCaptureClick = () => {
        startCamera();
        startCountdown();
    };

    // イベントリスナーを追加
    startCaptureButton.addEventListener('click', handleStartCaptureClick);

        // コンポーネントがアンマウントされたときにストリームを停止する
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            }

            // イベントリスナーを削除
            startCaptureButton.removeEventListener('click', handleStartCaptureClick);
        };
    }, [stream]); // streamの変更を監視

    useEffect(() => {
        // 画面遷移時に実行したい処理をここに記述
        return () => {
            // 画面遷移時にクリーンアップしたい処理をここに記述
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, [navigate]); // navigateが変更される度に実行される

    return (
        <HelmetProvider>
            <div className="hand-sign-image-container">
                <Helmet>
                    <title>しまコネクト</title>
                </Helmet>
                <div className="hand-sign-image-hand-sign-image">
                    <div className="hand-sign-image-header">
                        <div className="hand-sign-image-bar-text">
                            <button className="hand-sign-image-logo" onClick={() => navigate('/main-screen')}>
                                <img
                                    src="/images/logo.png"
                                    alt="Logo"
                                    className="hand-sign-image-image"
                                />
                            </button>
                            <button className="hand-sign-image-page-title" onClick={() => navigate('/internet-forum-popu')}>
                                <div className="hand-sign-image-text">
                                    <span className="hand-sign-image-text01">
                                        <span>掲示板</span>
                                    </span>
                                </div>
                                <img
                                    src="/images/keijibanImage.png"
                                    alt="Keijiban"
                                    className="hand-sign-image-image1"
                                />
                            </button>
                            <button id="open-btn" className="main-screen-hambirger-menu" type="button">
                                <div className="main-screen-stacked">
                                <img
                                    src="/images/hambirger.svg"
                                    alt="Ham"
                                    className="main-screen-menu"
                                />
                                <span className="main-screen-text">
                                    <span>メニュー</span>
                                </span>
                                </div>
                            </button>
                            <div id="sub-menu" className="sub-menu-sub-menu">
                                <div id="sub-menu-main">
                                <div className="sub-menu-sub-menu1">
                                    <span className="sub-menu-text">
                                    <span>  サブメニュー</span>
                                    </span>
                                </div>
                                </div>
                                <button id="close-btn" className="sub-menu-close-button" type="button" onClick={handleCloseBtnClick}>
                                <img
                                    src="/images/closeIcon.svg"
                                    alt="close"
                                    className="sub-menu-close"
                                />
                                </button>
                                <button className="sub-menu-profile" onClick={handleProfileBtnClick}>
                                    <div className="sub-menu-me">
                                        <img
                                        src="/images/profileIcon.svg"
                                        alt="profileIcon"
                                        className="sub-menu-union"
                                        />
                                    </div>
                                    <span className="sub-menu-text02">
                                        <span>プロフィール</span>
                                    </span>
                                </button>
                                <button className="sub-menu-hand-sign-list" onClick={handleHandsignBtnClick}>
                                    <div className="sub-menu-fillablecard">
                                        <img
                                        src="/images/handSignIcon.svg"
                                        alt="handSignIcon"
                                        className="sub-menu-union1"
                                        />
                                    </div>
                                    <span className="sub-menu-text04">
                                        <span>ハンドサインリスト</span>
                                    </span>
                                </button>
                                <button className="sub-menu-log-out" onClick={handleLogoutBtnClick}>
                                    <div className="sub-menu-update">
                                        <img
                                        src="/images/logOutIcon.svg"
                                        alt="logOutIcon"
                                        className="sub-menu-union2"
                                        />
                                    </div>
                                    <span className="sub-menu-text06">
                                        <span>ログアウト</span>
                                    </span>
                                </button>
                                <button className="sub-menu-sign-out" onClick={handleSignoutBtnClick}>
                                    <div className="sub-menu-departure">
                                        <img
                                        src="/images/signOutIcon.svg"
                                        alt="signOutIcon"
                                        className="sub-menu-union3"
                                        />
                                    </div>
                                    <span className="sub-menu-text08">
                                        <span>退会手続き</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='hand-sign-image-main'>
                        <div className='hand-sign-image-sokuseki'>
                            <div className='hand-sign-image-button-field'>
                                <button className="hand-sign-image-button" id='startCapture'>
                                    <span className='hand-sign-image-button-text'>
                                        <span>撮影開始</span>
                                    </span>
                                </button>
                                <button className="hand-sign-image-button1" onClick={() => navigate('/add-hand-sign')}>
                                    <span className='hand-sign-image-button-text'>
                                        <span>投稿画面に戻る</span>
                                    </span>
                                </button>
                            </div>
                            <div id="countdown" className='countdown-text'>5</div>
                            
                        </div>
                        <video id="video" style={{ width: 'calc(100vw - 100px)', height: 'calc(100vh - 300px)' }} autoPlay></video>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default HandSignImage;
