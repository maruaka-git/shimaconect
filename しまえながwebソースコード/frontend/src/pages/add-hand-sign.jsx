import React, {useEffect , useState } from 'react'
import { Helmet ,HelmetProvider} from 'react-helmet-async'
import { Form, useNavigate } from 'react-router-dom'
import { useFormState, useFormDispatch } from './formContext';
import axios from "axios"
import './add-hand-sign.css'
import { server } from '../App';

function AddHandSign (){
  const { formValues } = useFormState();
  const dispatch = useFormDispatch();

  const [formErros, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);  
  const navigate=useNavigate();


  const handleChange = (e) =>{
    console.log(image);
    const { name, value } = e.target;
    dispatch({ type: 'UPDATE_FORM_VALUES', payload: { [name]: value } });
    console.log('Change:',formValues);
  }

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

  const handleSubmit = async (e) => {
    if(formValues.handSignName!=null && formValues.category!=null){
      e.preventDefault();
      console.log();
      try {
        const file = new FormData();
        Object.keys(formValues).forEach(key => {
          file.append(key, formValues[key]);
        });
        file.append("token",document.cookie);
        await axios.post(server+"/hand",file,{
          headers:{
            'content-type': 'multipart/form-data',
          },
        })
        .then(respons =>{
          console.log(respons);
        })
        alert("送信成功！！")
      }catch(err){
        console.log("失敗");
        alert("送信失敗、、、\n登録内容を確認してください")
      }
    }
  };
  
  

  useEffect(() => {
    console.log(formErros);
    //エラーなしでかつ送信されているなら。
    if (Object.keys(formErros).length === 0 && isSubmit) {
      console.log(formValues);
    } else {
    }
  }, [formErros]);


  //詳細の入力制限
  const handleDetailChange = (e) => {
    const DETAIL_MAX_LENGTH = 150;
    const { value } = e.target;

    // 最大文字数を超えた場合は入力を制限
    if (value.length > DETAIL_MAX_LENGTH) {
      e.target.value = value.slice(0, DETAIL_MAX_LENGTH);
    }

    // フォームの状態を更新
    dispatch({ type: 'UPDATE_FORM_VALUES', payload: { detail: e.target.value } });
  };

  // ハッシュタグ1の入力制限
  const handleHashTag1Change = (e) => {
    const HASHTAG_MAX_LENGTH = 20;
    const { value } = e.target;

    // 最大文字数を超えた場合は入力を制限
    if (value.length > HASHTAG_MAX_LENGTH) {
      e.target.value = value.slice(0, HASHTAG_MAX_LENGTH);
    }

    // フォームの状態を更新
    dispatch({ type: 'UPDATE_FORM_VALUES', payload: { hashTag1: e.target.value } });
  };

  // ハッシュタグ2の入力制限
  const handleHashTag2Change = (e) => {
    const HASHTAG_MAX_LENGTH = 20;
    const { value } = e.target;

    // 最大文字数を超えた場合は入力を制限
    if (value.length > HASHTAG_MAX_LENGTH) {
      e.target.value = value.slice(0, HASHTAG_MAX_LENGTH);
    }

    // フォームの状態を更新
    dispatch({ type: 'UPDATE_FORM_VALUES', payload: { hashTag2: e.target.value } });
  };

  // ハッシュタグ3の入力制限
  const handleHashTag3Change = (e) => {
    const HASHTAG_MAX_LENGTH = 20;
    const { value } = e.target;

    // 最大文字数を超えた場合は入力を制限
    if (value.length > HASHTAG_MAX_LENGTH) {
      e.target.value = value.slice(0, HASHTAG_MAX_LENGTH);
    }

    // フォームの状態を更新
    dispatch({ type: 'UPDATE_FORM_VALUES', payload: { hashTag3: e.target.value } });
  };

  // ハッシュタグ4の入力制限
  const handleHashTag4Change = (e) => {
    const HASHTAG_MAX_LENGTH = 20;
    const { value } = e.target;

    // 最大文字数を超えた場合は入力を制限
    if (value.length > HASHTAG_MAX_LENGTH) {
      e.target.value = value.slice(0, HASHTAG_MAX_LENGTH);
    }

    // フォームの状態を更新
    dispatch({ type: 'UPDATE_FORM_VALUES', payload: { hashTag4: e.target.value } });
  };


  //ファイル名を更新するための関数
  const updateFileName = (e, field) => {
    const file = e.target.files[0];
    dispatch({ type: 'UPDATE_FORM_VALUES', payload: { [field]: file } });
  };

  return (
    <HelmetProvider>
      <div className="registration-container">
        <Helmet>
          <title>しまコネクト</title>
        </Helmet>
        <div className="registration-registration">
          <div className="registration-header">
            <div className="registration-bar-text">
              <button className="registration-logo" onClick={() => navigate('/main-screen')}>
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="registration-image"
                />
              </button>
              <button className="registration-page-title" onClick={() => navigate('/internet-forum-popu')}>
                <div className="registration-text">
                  <span className="registration-text01">
                    <span>掲示板</span>
                  </span>
                </div>
                <img
                  src="/images/keijibanImage.png"
                  alt="Keijiban"
                  className="registration-image1"
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
          <div className="registration-main">
            <div className="registration-registration-title">
              <span className="registration-text05">
                <span>ハンドサイン投稿</span>
              </span>
            </div>
            <div className="registration-input-area">
              <div className="registration-hand-sign-name">
                <div className="registration-frame-input-label">
                  <span className="registration-text07">
                    <span>ハンドサインの名前</span>
                  </span>
                  <div className="registration-requirement">
                    <span className="registration-text09">
                      <span>必須</span>
                    </span>
                  </div>
                </div>
                <input 
                  type="text" 
                  name="handSignName"
                  value={formValues.handSignName}
                  onChange={(e)=>handleChange(e)}
                  className="registration-input" 
                />
              </div>
              <div className="registration-hand-sign-image">
                <div className="registration-frame-input-label">
                  <span className="registration-text07">
                    <span>ハンドサインの動画データ</span>
                  </span>
                  <div className="registration-requirement">
                    <span className="registration-text09">
                      <span>必須</span>
                    </span>
                  </div>
                </div>
                <div className="registration-support-text">
                  <span className="registration-text22">
                    <span>ハンドサインを撮影してください。</span>
                  </span>
                </div>
                <button className="registration-image-button" onClick={() => navigate('/hand-sign-video')}>
                  <span className='registration-image-button-text'>
                    <span>撮影する</span>
                  </span>
                </button>
                <div className="registration-support-text">
                  <span className="registration-text22">
                    <span>撮影したハンドサインをアップロードしてください。</span>
                  </span>
                </div>
                <div className='sokuseki'>
                  <label htmlFor="handSignVideo">ファイルを選択</label>
                  <input 
                    type="file" 
                    id="handSignVideo" 
                    onChange={(e) => { setVideo[e.target.files]; updateFileName(e, 'handSignVideo'); }} 
                    accept=".npy,.npz" />
                    <span className="select-image">{formValues.handSignVideo ? formValues.handSignVideo.name : '選択されていません'}</span>
                </div>
              </div>
              <div className="registration-hand-sign-image">
                <div className="registration-frame-input-label">
                  <span className="registration-text07">
                    <span>サムネイル画像</span>
                  </span>
                  <div className="registration-requirement">
                    <span className="registration-text09">
                      <span>必須</span>
                    </span>
                  </div>
                </div>
                <div className="registration-support-text">
                  <span className="registration-text22">
                    <span>ハンドサインを表わす画像を撮影してください。</span>
                  </span>
                </div>
                <button className="registration-image-button" onClick={() => navigate('/hand-sign-image')}>
                  <span className='registration-image-button-text'>
                    <span>撮影する</span>
                  </span>
                </button>
                <div className="registration-support-text">
                  <span className="registration-text22">
                    <span>撮影した画像をアップロードしてください。</span>
                  </span>
                </div>
                <div className='sokuseki'>
                  <label htmlFor="handSignImage">ファイルを選択</label>
                  <input 
                  type="file"
                  id="handSignImage" 
                  onChange={(e) => { setImage[e.target.files]; updateFileName(e, 'handSignImage'); }} 
                  accept="image/*" 
                  />
                  <span className="select-image">{formValues.handSignImage ? formValues.handSignImage.name : '選択されていません'}</span>
                </div>
              </div>
              <div id="preview"></div>
              <div className="registration-category">
                <div className="registration-frame-input-label1">
                  <span className="registration-text11">
                    <span>カテゴリー</span>
                  </span>
                  <div className="registration-requirement1">
                    <span className="registration-text13">
                      <span>必須</span>
                    </span>
                  </div>
                </div>
                <div className="sign-up-radio-dairy">
                  <div className="sign-up-radiodefault">
                    <span className="sign-up-text18">
                      <span>日常</span>
                    </span>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="日常 挨拶" 
                        checked={formValues.category === "日常 挨拶"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>挨拶</span>
                      </span>
                    </div>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="日常 学校" 
                        checked={formValues.category === "日常 学校"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>学校</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sign-up-radio-dairy">
                  <div className="sign-up-radiodefault">
                    <span className="sign-up-text18">
                      <span>音楽</span>
                    </span>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="音楽 邦楽" 
                        checked={formValues.category === "音楽 邦楽"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>邦楽</span>
                      </span>
                    </div>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="音楽 洋楽" 
                        checked={formValues.category === "音楽 洋楽"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>洋楽</span>
                      </span>
                    </div>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="音楽 K-POP" 
                        checked={formValues.category === "音楽 K-POP"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>K-POP</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sign-up-radio-dairy">  
                  <div className="sign-up-radiodefault">
                    <span className="sign-up-text18">
                      <span>アニメ</span>
                    </span>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="アニメ SF" 
                        checked={formValues.category === "アニメ SF"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>SF</span>
                      </span>
                    </div>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="アニメ バトル" 
                        checked={formValues.category === "アニメ バトル"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>バトル</span>
                      </span>
                    </div>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="アニメ 恋愛" 
                        checked={formValues.category === "アニメ 恋愛"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>恋愛</span>
                      </span>
                    </div>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="アニメ 日常" 
                        checked={formValues.category === "アニメ 日常"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>日常</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sign-up-radio-dairy">
                  <div className="sign-up-radiodefault">
                    <span className="sign-up-text18">
                      <span>ゲーム</span>
                    </span>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="ゲーム コンシューマー" 
                        checked={formValues.category === "ゲーム コンシューマー"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>コンシューマー</span>
                      </span>
                    </div>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="ゲーム スマホ" 
                        checked={formValues.category === "ゲーム スマホ"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>スマホ</span>
                      </span>
                    </div>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="ゲーム PC" 
                        checked={formValues.category === "ゲーム PC"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>PC</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sign-up-radio-dairy">
                  <div className="sign-up-radiodefault">
                    <span className="sign-up-text18">
                      <span>ドラマ</span>
                    </span>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="ドラマ 日本" 
                        checked={formValues.category === "ドラマ 日本"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>日本</span>
                      </span>
                    </div>
                    <div className="sign-up-radio-group">
                      <input 
                        className="sign-up-radiobutton" 
                        type="radio" 
                        name="category" 
                        value="ドラマ 海外" 
                        checked={formValues.category === "ドラマ 海外"} 
                        onChange={(e) => handleChange(e)}
                      />
                      <span className="sign-up-text17">
                        <span>海外</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="registration-detail">
                <span className="registration-frame-input-label2">
                    <span>詳細</span>
                </span>
                <textarea
                  type="text"
                  name="detail" 
                  className="registration-input1"
                  id="detailForm"
                  value={formValues.detail}
                  onChange={(e) => { handleDetailChange(e); handleChange(e); }}
                />
                <div className="registration-count">
                  <div className="registration-letter-counter">
                    <span className="registration-text18" id="inputCounter">{formValues.detail.length}</span>
                    <span className="registration-text19">/</span>
                    <span className="registration-text20">
                      <span>150</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="registration-hash-tags">
                <span className="registration-frame-input-label3">
                  <span>ハッシュタグ</span>
                </span>
                <div className="registration-support-text">
                  <span className="registration-text22">
                    <span>最大4個まで設定可能です。</span>
                  </span>
                </div>
                <input 
                  className="registration-input2" 
                  type="text"
                  name="hashTag1"
                  value={formValues.hashTag1}
                  onChange={(e) => { handleHashTag1Change(e); handleChange(e); }}
                />
                <div className="registration-count1">
                  <div className="registration-letter-counter1">
                    <span className="registration-text24" id="inputCounter">{formValues.hashTag1.length}</span>
                    <span className="registration-text25">/</span>
                    <span className="registration-text26">
                      <span>20</span>
                    </span>
                  </div>
                </div>
                <input 
                  className="registration-input2" 
                  type="text"
                  name="hashTag2"
                  value={formValues.hashTag2}
                  onChange={(e) => { handleHashTag2Change(e); handleChange(e); }}
                />
                <div className="registration-count2">
                  <div className="registration-letter-counter2">
                    <span className="registration-text24" id="inputCounter">{formValues.hashTag2.length}</span>
                    <span className="registration-text29">/</span>
                    <span className="registration-text30">
                      <span>20</span>
                    </span>
                  </div>
                </div>
                <input 
                  className="registration-input2" 
                  type="text"
                  name="hashTag3"
                  value={formValues.hashTag3}
                  onChange={(e) => { handleHashTag3Change(e); handleChange(e); }}
                />
                <div className="registration-count3">
                  <div className="registration-letter-counter3">
                    <span className="registration-text24" id="inputCounter">{formValues.hashTag3.length}</span>
                    <span className="registration-text33">/</span>
                    <span className="registration-text34">
                      <span>20</span>
                    </span>
                  </div>
                </div>
                <input 
                  className="registration-input2" 
                  type="text"
                  name="hashTag4"
                  value={formValues.hashTag4}
                  onChange={(e) => { handleHashTag4Change(e); handleChange(e); }}
                />
                <div className="registration-count4">
                  <div className="registration-letter-counter4">
                    <span className="registration-text24" id="inputCounter">{formValues.hashTag4.length}</span>
                    <span className="registration-text37">/</span>
                    <span className="registration-text38">
                      <span>20</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="registration-button-field">
              <button className="registration-resist-button"  onClick={(e) => handleSubmit(e)}>
                <span className="registration-text40">
                  <span>投稿する</span>
                </span>
              </button>
              <button className="registration-back-button" onClick={() => navigate('/internet-forum-popu')}>
                <span className="registration-text42">
                  <span>掲示板に戻る</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  )
}
// () => navigate('/internet-forum-popu')

export default AddHandSign