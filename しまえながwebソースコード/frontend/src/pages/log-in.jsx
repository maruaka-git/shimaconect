import React,{useEffect, useState} from 'react';
import { Helmet,HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { server } from '../App';
import './log-in.css'
import { useCookies } from 'react-cookie';
import { getCookie } from '../App';

function LogIn(){
  const navigate=useNavigate();

  const initialValues = { id: "", password: ""};
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [isSubmit, setIsSubmit] = useState(false);
  const [cookie, setCookie,removeCookie] = useCookies([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }
  useEffect(()=>{
    const check = async()=>{
      const res = getCookie('token');
      const checkJWT = await axios.post(server+'/jwt',document.cookie);
      if(checkJWT.data){
        navigate('/log-in-completed');
      }else{
        return 
      }

    }
    check();
   
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmit(true);
    } else {
    }
    
  };

  const validate = async(values) => {
    const errors = {};
    if (!values.id) {
      errors.id = "IDを入力してください";
    }
    if (!values.password) {
      errors.password = "　passwordを入力してください";
    }else{
      const res = await axios.post(server+'/login',formValues);
      if(res.status !== 200 || res.error || !res.data.valid){
        errors.id ="IDが違います";
        errors.password = "　passwordが違います";
      }else{
        document.cookie="token="+res.data.token+";path=/;max-age=7200;";
        console.log(document.cookie);
      }
    };
    return errors;
  }

  return (
    <HelmetProvider>
      <div className="log-in-container">
        <Helmet>
          <title>しまコネクト</title>
        </Helmet>
        <div className="log-in-log-in">
          <div className="log-in-main">
            <div className="log-in-title">
              <div className="log-in-text">
                <span className="log-in-text01">
                  <span>ログイン</span>
                </span>
              </div>
              <img
                src="/images/logInShima.png"
                alt="login"
                className="log-in-image2"
              />
            </div>
            <div className="log-in-input-area">
              <div className="log-in-id">
                <div className="log-in-frame-input-label">
                  <span className="log-in-text03">
                    <span>ID</span>
                  </span>
                </div>
                <div className="log-in-support-text">
                  <span className="log-in-text07">
                    <span>半角英数字で回答してください。</span>
                  </span>
                </div>
                <input 
                  className="log-in-input" 
                  type="text"
                  value={formValues.id}
                  onChange={(e)=>handleChange(e)}
                  name="id"
                />
                <div className="log-in-requirement">
                  <span className="log-in-text05">
                    <span>{formErrors.id}</span>
                  </span>
                </div>
              </div>
              <div className="log-in-pass-word">
                <div className="log-in-frame-input-label">
                  <span className="log-in-text09">
                    <span>パスワード</span>
                  </span>
                </div>
                <div className="log-in-support-text1">
                  <span className="log-in-text13">
                    <span>半角英数字で入力してください。</span>
                  </span>
                </div>
                <input 
                  className="log-in-input1"
                  type={passwordType}
                  name="password"
                  value={formValues.password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleChange(e);
                  }}
                />
                <div className="log-in-requirement">
                  {/* // 非表示 */}
                  {passwordType === "password" && (
                    <VisibilityOffIcon
                      onClick={() => setPasswordType("text")}
                      className="Password__visual"
                    />
                  )}
                  {/* // 表示 */}
                  {passwordType === "text" && (
                    <VisibilityIcon
                      onClick={() => setPasswordType("password")}
                      className="Password__visual"
                    />
                  )}
                  <span className="log-in-text05">
                    <span>{formErrors.password}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="log-in-button-field">
              <button className="log-in-resist-button" onClick={(e) => { handleSubmit(e) }}>
                <span className="log-in-text15">
                  <span>ログインする</span>
                </span>
              </button>
              {isSubmit && Object.keys(formErrors).length === 0 && (
                <meta httpEquiv="refresh" content="2;URL=/log-in-completed" />
              )}
              <button className="log-in-back-button" onClick={() => navigate('/registration-for-use')}>
                <span className="log-in-text17">
                  <span>戻る</span>
                </span>
              </button>
            </div>
          </div>
        </div>
    </div>
  </HelmetProvider>
  )
}

export default LogIn