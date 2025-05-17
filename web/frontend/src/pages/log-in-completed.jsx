import React, { useEffect } from 'react'
import { Helmet ,HelmetProvider} from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { server } from '../App';
import './log-in-completed.css'
import { getCookie } from '../App';
function LogInCompleted(){
  const navigate=useNavigate();
  useEffect(() => {
    console.log(document.cookie);
  }, []);
  return (
    <HelmetProvider>
      <div className="log-in-completed-container">
        <Helmet>
          <title>しまコネクト</title>
        </Helmet>
        <div className="log-in-completed-log-in-completed">
          <div className="log-in-completed-main">
            <div className="log-in-completed-title">
              <span className="log-in-completed-text">
                <span>ログイン完了</span>
              </span>
            </div>
            <img
              src="/images/riyouCompleted.png"
              alt="riyouCompleted"
              className="log-in-completed-image2"
            />
            <span className="log-in-completed-text2">
              <span>おかえりなさい！</span>
            </span>
            <div className="log-in-completed-button-field">
              <button className="log-in-completed-log-in-button" onClick={() => navigate('/main-screen')}>
                <span className="log-in-completed-text4">
                  <span>つぎへ</span>
                </span>
              </button>
              <button className="log-in-completed-back-button" onClick={() => navigate('/')}>
                <span className="log-in-completed-text6">
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

export default LogInCompleted
