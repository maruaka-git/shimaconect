import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { server } from '../App';
import './hand-sign-video.css';

const HandSignVideo = (props) => {
    const navigate = useNavigate();

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
   
    const handleDownload = () => {

        //フォルダからの相対パスを使用する
        const downloadUrl1 = './recognization.exe';
        const downloadUrl2 = './capture.exe';

        //a要素を動的に生成し、ダウンロードを開始する
        const link1 = document.createElement('a');
        link1.href = downloadUrl1;
        link1.download = 'recognization.exe';

        document.body.appendChild(link1);
        link1.click();
        document.body.removeChild(link1);

        //a要素を動的に生成し、ダウンロードを開始する
        const link2 = document.createElement('a');
        link2.href = downloadUrl2;
        link2.download = 'capture.exe';

        document.body.appendChild(link2);
        link2.click();
        document.body.removeChild(link2);

    };

    return (
        <HelmetProvider>
            <div className="hand-sign-video-container">
                <Helmet>
                    <title>しまコネクト</title>
                </Helmet>
                <div className="hand-sign-video-hand-sign-video">
                    <div className="hand-sign-video-header">
                        <div className="hand-sign-video-bar-text">
                            <button className="hand-sign-video-logo" onClick={() => navigate('/main-screen')}>
                                <img
                                    src="/images/logo.png"
                                    alt="Logo"
                                    className="hand-sign-video-image"
                                />
                            </button>
                            <button className="hand-sign-video-page-title" onClick={() => navigate('/internet-forum-popu')}>
                                <div className="hand-sign-video-text">
                                    <span className="hand-sign-video-text01">
                                        <span>掲示板</span>
                                    </span>
                                </div>
                                <img
                                    src="/images/keijibanImage.png"
                                    alt="Keijiban"
                                    className="hand-sign-video-image1"
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
                    <div className='hand-sign-video-main'>
                        <div className='hand-sign-video-sokuseki'>
                            <div className='hand-sign-video-textarea'>
                                <span className='hand-sign-video-text11'>
                                    <span>初めて投稿する方は撮影用アプリをダウンロード↓</span>
                                </span>
                                <button className="hand-sign-video-button" onClick={handleDownload}>
                                    <span className='hand-sign-video-button-text'>
                                        <span>撮影用アプリをダウンロードする</span>
                                    </span>
                                </button>
                            </div>
                            <div className='hand-sign-video-textarea'>
                                <span className='hand-sign-video-text11'>
                                    <span>ダウンロードしたアプリをご自身で開いて撮影してください。</span>
                                </span>
                                <img
                                    src="/images/appManual.png"
                                    alt="appManual"
                                    className="hand-sign-video-image11"
                                />
                            </div>

                            <div className='hand-sign-video-textarea1'>
                                <button className="hand-sign-video-button1" onClick={() => navigate('/add-hand-sign')}>
                                    <span className='hand-sign-video-button-text'>
                                        <span>投稿画面に戻る</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default HandSignVideo;
