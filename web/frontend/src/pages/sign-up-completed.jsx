import React, { useEffect } from 'react'
import { Helmet ,HelmetProvider} from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { server } from '../App';
import './sign-up-completed.css'

function SignUpCompleted () {
  const navigate=useNavigate();
  return (
    <HelmetProvider>
      <div className="sign-up-completed-container">
        <Helmet>
          <title>しまコネクト</title>
        </Helmet>
        <div className="sign-up-completed-sign-up-completed">
          <div className="sign-up-completed-main">
            <div className="sign-up-completed-title">
              <span className="sign-up-completed-text">
                <span>登録完了</span>
              </span>
            </div>
            <img
              src="/images/riyouCompleted.png"
              alt="riyouCompleted"
              className="sign-up-completed-image1"
            />
            <span className="sign-up-completed-text2">
              <span>コンテンツ名へようこそ！</span>
            </span>
            <div className="sign-up-completed-button-field">
              <button className="sign-up-completed-log-in-button" onClick={() => navigate('/main-screen')}>
                <span className="sign-up-completed-text4">
                  <span>つぎへ</span>
                </span>
              </button>
              <button className="sign-up-completed-back-button" onClick={() => navigate('/')}>
                <span className="sign-up-completed-text6">
                  <span>タイトルに戻る</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>  
    </HelmetProvider>
  )
}

export default SignUpCompleted
