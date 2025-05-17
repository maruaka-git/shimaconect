import React, {useEffect , useState } from 'react'
import { Helmet ,HelmetProvider} from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { server } from '../App'
import axios from 'axios'
import './profile.css'

const Profile = (props) => {
  const navigate=useNavigate();
  const icon = 'userIcon.png';
  const [posts,setPosts]= useState([]);
  const [user,setUser] = useState({});
  const [sum,setSum] = useState(0);
  const iconID = (user) => {
    return user.mainkey%9 ;
  }
  function checkCookieExists(cookieName) {
    const cookies = document.cookie.split(';');
  
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Check if the cookie starts with the specified name
      if (cookie.startsWith(cookieName + '=')) {
        return true;
      }
    }
  
    return false;
  }
  function gend(gender){
    if(gender == "male") return "男性"
    else if(gender == "female") return "女性"
    else return "その他"
  }
  useEffect(() => {
    if (posts.length !== 0) {
      const sum = posts.reduce((accumulator, post) => accumulator + post.fav, 0);
      setSum(sum);
    }
  }, [posts]);
  useEffect(() => {
    
    if(checkCookieExists("token")){
      console.log('持ってる！');
    }else{
      console.log('持ってない!');
    }
    async function findUser(){
      const res = await axios.post(server+"/user",document.cookie);
      setUser(res.data);
      return res.data;
    }
    findUser();
    async function findPosts(){
      const res = await axios.post(server+"/user-posts",document.cookie);
      setPosts(res.data);
      if(posts.length!=0){
        posts.map((post)=>sum=sum+post.fav)
      }
    }
    findPosts();
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
      <div className="profile-container">
        <Helmet>
          <title>しまコネクト</title>
        </Helmet>
        <div className="profile-profile">
          <div className="profile-header">
            <div className="profile-bar-text">
              <button className="profile-logo" onClick={() => navigate('/main-screen')}>
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="profile-image"
                />
              </button>
              <div className="profile-page-title">
                <div className="profile-text">
                  <span className="profile-text1">
                    <span>プロフィール</span>
                  </span>
                </div>
                <img
                  src="/images/profileIcon.svg"
                  alt="profileIcon"
                  className="profile-union3"
                />
              </div>
              <div className="profile-header">
                <div className="profile-bar-text">
                  <button className="profile-logo" onClick={() => navigate('/main-screen')}>
                    <img
                      src="/images/logo.png"
                      alt="Logo"
                      className="profile-image"
                    />
                  </button>
                  <div className="profile-page-title">
                    <div className="profile-text">
                      <span className="profile-text1">
                        <span>プロフィール</span>
                      </span>
                    </div>
                    <img
                      src="/images/profileIcon.svg"
                      alt="profileIcon"
                      className="profile-union3"
                    />
                  </div>
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
                    <button className="sub-menu-logout" onClick={handleLogoutBtnClick}>
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
            </div>
          </div>
          <div className='profile-main'>
            <div className='profile-main1'>
              <div className="profile-edit-area">
                <span className="profile-text08">
                  <span>ID：</span>
                </span>
                <span className="profile-text08">
                  <span>{user.id}</span>
                </span>
              </div>
              <img
                src={server+"/uploadIcon/"+iconID(user)+icon}
                alt="userIcon"
                className="profile-ellipse3"
              />
              <div className='profile-text-area'>
                <span className="profile-text06">
                  <span>{user.name}</span>
                </span>
              </div>
              <div className='profile-text-area'>
                <div className="profile-detail-area">
                  <span className="profile-text16">
                    <span>性別：</span>
                  </span>
                  <span className="profile-text18">
                    <span>{gend(user.gender)}</span>
                  </span>
                </div>
              </div>
              <div className='profile-text-area'>
                <div className="profile-detail-area">
                  <span className="profile-text16">
                    <span>ハンドサイン投稿数：</span>
                  </span>
                  <span className="profile-text18">
                    <span>{posts.length}個</span>
                  </span>
                </div>
              </div>
              <div className='profile-text-area'>
                <div className="profile-detail-area">
                  <span className="profile-text16">
                    <span>獲得いいね数：</span>
                  </span>
                  <span className="profile-text18">
                    <span>{sum}個</span>
                  </span>
                </div>
              </div>
              <div className='profile-edit-area'>
                <img
                  src="/images/editIcon.svg"
                  alt="editIcon"
                  className="profile-edit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default Profile
