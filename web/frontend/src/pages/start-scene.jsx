import React, { useEffect } from 'react'
import { Helmet ,HelmetProvider} from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { server } from '../App';
import './start-scene.css';
export default function StartScene () {
  useEffect(()=>{
    console.log(document.cookie);
  })
  const navigate= useNavigate();
  return (
    <div className="start-scene-container">
      <HelmetProvider>
        <Helmet>
          <title>しまコネクト</title>
        </Helmet>
        <div className="start-scene-start-scene">
          <div className="start-scene-main">
            <div className="start-scene-title">
              <span className="start-scene-text">
                <span>しまコネクト</span>
              </span>
            </div>
            <img
              src="/images/titleImage.png"
              alt="titleImage"
              className="start-scene-image1"
            />
            <div className="start-scene-button">
              <button className="start-scene-secondary" onClick={() => navigate('/registration-for-use')}>
                <span className="start-scene-text2">
                  <span>はじめる</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </HelmetProvider>
    </div>
  )
}
