import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { server } from '../App';

import './communication.css';

const Communication = (props) => {
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

        //a要素を動的に生成し、ダウンロードを開始する
        const link1 = document.createElement('a');
        link1.href = downloadUrl1;
        link1.download = 'recognization.exe';

        document.body.appendChild(link1);
        link1.click();
        document.body.removeChild(link1);

    };

    return (
        <HelmetProvider>
            <div className="communication-container">
                <Helmet>
                    <title>しまコネクト</title>
                </Helmet>
                <div className="communication-communication">
                    <div className="communication-header">
                        <div className="communication-bar-text">
                            <button className="communication-logo" onClick={() => navigate('/main-screen')}>
                                <img
                                    src="/images/logo.png"
                                    alt="Logo"
                                    className="communication-image"
                                />
                            </button>
                            <button className="communication-page-title" onClick={() => navigate('/communication')}>
                                <div className="communication-text">
                                    <span className="communication-text01">
                                        <span>お話しツール</span>
                                    </span>
                                </div>
                                <img
                                    src="/images/toolImage.png"
                                    alt="tool"
                                    className="communication-image1"
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
                    <div className='communication-main'>
                        <div className='communication-sokuseki'>
                            <div className='communication-textarea'>
                                <span className='communication-text11'>
                                    <span>このツールを初めて利用する方は翻訳用アプリをダウンロード↓</span>
                                </span>
                                <button className="communication-button">
                                    <span className='communication-button-text'>
                                        <span>翻訳用アプリをダウンロードする</span>
                                    </span>
                                </button>
                            </div>
                            <div className='communication-textarea'>
                                <span className='communication-text11'>
                                    <span>ダウンロードしたアプリをご自身で開いて利用してください。</span>
                                </span>
                                <img
                                    src="/images/appManual2.png"
                                    alt="appManual2"
                                    className="communication-image11"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}

export default Communication