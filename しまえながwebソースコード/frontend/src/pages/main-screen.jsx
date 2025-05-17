import React, {useEffect , useState } from 'react'
import { Helmet ,HelmetProvider} from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { server } from '../App';
import './main-screen.css'

const MainScreen = (props) => {
  const navigate=useNavigate()

  useEffect(() => {

    const storedJwt = document.cookie;
    
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

  return (
    <HelmetProvider>
      <div className="main-screen-container">
        <Helmet>
          <title>しまコネクト</title>
        </Helmet>
        <div className="main-screen-main-screen">
          <div className="main-screen-header">
            <div className="main-screen-bar-text">
              <button className="main-screen-logo" onClick={() => navigate('/main-screen')}>
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="main-screen-image"
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
          <div className="main-screen-main">
            <div className="main-screen-button">
              <button className="main-screen-internet-forum-button" onClick={() => navigate('/internet-forum-popu')}>
                <div className="main-screen-inside">
                  <div className="main-screen-text2">
                    <span className="main-screen-text3">
                      <span>掲示板</span>
                    </span>
                  </div>
                  <img
                    src="/images/keijibanImage.png"
                    alt="Keijiban"
                    className="main-screen-image1"
                  />
                </div>
              </button>
              <button className="main-screen-tool-button" onClick={() => navigate('/communication')}>
                <div className="main-screen-inside1">
                  <div className="main-screen-text5">
                    <span className="main-screen-text6">
                      <span>お話しツール</span>
                    </span>
                  </div>
                  <img
                    src="/images/toolImage.png"
                    alt="Tool"
                    className="main-screen-image11"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default MainScreen
