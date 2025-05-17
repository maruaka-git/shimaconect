import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import './sign-up.css'
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { server } from '../App';

function SignUp() {
  const initialValues = { name: "", id: "", gender: "", password: "", passwordConfirm: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmType, setPasswordConfirmType] = useState("password");
  const navigate = useNavigate();

  //入力時にformvalueを更新
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("登録しようとしたね？");
    const errors = await validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      console.log('Submit:', formValues);
      console.log("成功");
      setIsSubmit(true);
      let res = await axios.post(server + '/sign-up', formValues);
      document.cookie = `${res.data.token}; path=/ ;max-age=7200`;
      console.log(document.cookie);
    } else {
    }
  };




  //バリデーションチェック
  const validate = async (values) => {
    const errors = {};
    const res = await axios.post(server + '/sign-up-valid', formValues);
    if (!values.name) {
      errors.name = "ユーザー名を入力してください。";
    } else if (values.name.length > 10) {
      errors.name = "ユーザー名は10文字以下にしてください";
    }
    if (!values.id) {
      errors.id = "IDを入力してください。";
    } else if (values.id.length > 15) {
      errors.id = "IDは15文字以下にしてください";
    }
    else {

      //console.log(res);
      if (!res.data.valid) {
        console.log("dame");
        errors.id = "このIDは既に使用されています";
      }
    }

    if (!values.gender) {
      errors.gender = "性別を選択してください。";
    }
    if (!values.password) {
      errors.password = "　パスワードを入力してください。";
    } else if (values.password.length < 4) {
      errors.password = "　4文字以上15文字以下のパスワードを入力してください。";
    } else if (values.password.length > 15) {
      errors.password = "　4文字以上15文字以下のパスワードを入力してください。";
    }
    if (!values.passwordConfirm) {
      errors.passwordConfirm = "　確認用パスワードを入力してください。";
    } else if (values.password != values.passwordConfirm) {
      errors.passwordConfirm = "　パスワードが異なります。";
    }
    return errors;
  };

  return (
    <HelmetProvider>
      <div className="sign-up-container">
        <Helmet>
          <title>しまコネクト</title>
        </Helmet>
        <div className="sign-up-sign-up">
          <form onSubmit={handleSubmit} className="sign-up-main">
            <div className="sign-up-title">
              <div className="sign-up-text">
                <span className="sign-up-text01">
                  <span>新規登録</span>
                </span>
              </div>
              <div className="sign-up-image">
                <img
                  src="/images/signUpShima.png"
                  alt="signUp"
                  className="sign-up-image1"
                />
              </div>
            </div>
            <div className="sign-up-input-area">
              <div className="sign-up-text-field">
                <div className="sign-up-frame-input-label">
                  <span className="sign-up-text03">
                    <span>お名前</span>
                  </span>
                </div>
                <div className="sign-up-support-text">
                  <span className="sign-up-text07">
                    <span>ニックネームでも可。</span>
                  </span>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formValues.name}
                  onChange={(e) => handleChange(e)}
                  className="sign-up-input"
                />
                <div className="sign-up-requirement">
                  <span className="sign-up-text05">
                    <span>{formErrors.name}</span>
                  </span>
                </div>
              </div>
              <div className="sign-up-id">
                <div className="sign-up-frame-input-label">
                  <span className="sign-up-text09">
                    <span>ID</span>
                  </span>
                </div>
                <div className="sign-up-support-text1">
                  <span className="sign-up-text13">
                    <span>半角英数字で回答してください。</span>
                  </span>
                </div>
                <input
                  type="text"
                  name="id"
                  value={formValues.id}
                  onChange={(e) => handleChange(e)}
                  className="sign-up-input1"
                />
                <div className="sign-up-requirement">
                  <span className="sign-up-text05">
                    <span>{formErrors.id}</span>
                  </span>
                </div>
              </div>
              <div className="sign-up-gender">
                <div className="sign-up-frame-input-label">
                  <span className="sign-up-text15">
                    <span>性別</span>
                  </span>
                </div>
                <div className="sign-up-radio">
                  <div className="sign-up-radiodefault">
                    <input
                      className="sign-up-radiobutton"
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formValues.gender === "male"}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="sign-up-text17">
                      <span>男性</span>
                    </span>
                  </div>
                  <div className="sign-up-radiodefault1">
                    <input
                      className="sign-up-radiobutton1"
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formValues.gender === "female"}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="sign-up-text19">
                      <span>女性</span>
                    </span>
                  </div>
                  <div className="sign-up-radiodefault2">
                    <input
                      className="sign-up-radiobutton2"
                      type="radio"
                      name="gender"
                      value="non"
                      checked={formValues.gender === "non"}
                      onChange={(e) => handleChange(e)}
                    />
                    <span className="sign-up-text21">
                      <span>無回答・その他</span>
                    </span>
                  </div>
                </div>
                <div className="sign-up-requirement">
                  <span className="sign-up-text05">
                    <span>{formErrors.gender}</span>
                  </span>
                </div>
              </div>
              <div className="sign-up-pass-word">
                <div className="sign-up-frame-input-label">
                  <span className="sign-up-text23">
                    <span>パスワード</span>
                  </span>
                </div>
                <div className="sign-up-support-text2">
                  <span className="sign-up-text27">
                    <span>半角英数字で入力してください。</span>
                  </span>
                </div>
                <input
                  className="sign-up-input2"
                  name="password"
                  value={formValues.password}
                  type={passwordType}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleChange(e);
                  }}

                />
                <div className="sign-up-requirement">
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
                  <span className="sign-up-text05">
                    <span>{formErrors.password}</span>
                  </span>
                </div>
              </div>
              <div className="sign-up-pass-word2">
                <div className="sign-up-frame-input-label">
                  <span className="sign-up-text29">
                    <span>パスワード確認用</span>
                  </span>
                </div>
                <div className="sign-up-support-text3">
                  <span className="sign-up-text33">
                    <span>確認のため再度入力してください。</span>
                  </span>
                </div>
                <input
                  className="sign-up-input3"
                  name="passwordConfirm"
                  value={formValues.passwordConfirm}
                  type={passwordConfirmType}
                  onChange={(e) => {
                    setPasswordConfirm(e.target.value);
                    handleChange(e);
                  }}

                />
                <div className="sign-up-requirement">
                  {/* 非表示 */}
                  {passwordConfirmType === "password" && (
                    <VisibilityOffIcon
                      onClick={() => setPasswordConfirmType("text")}
                      className="Password__visual"
                    />
                  )}
                  {/* // 表示 */}
                  {passwordConfirmType === "text" && (
                    <VisibilityIcon
                      onClick={() => setPasswordConfirmType("password")}
                      className="Password__visual"
                    />
                  )}
                  <span className="sign-up-text05">
                    <span>{formErrors.passwordConfirm}</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="sign-up-button-field">
              <button className="sign-up-resist-button" onClick={(e) => { handleSubmit(e) }}>
                <span className="sign-up-text35">
                  <span>登録する</span>
                </span>
              </button>
              {isSubmit && Object.keys(formErrors).length === 0 && (
                <meta httpEquiv="refresh" content="2;URL=/sign-up-completed" />
              )}
              <button className="sign-up-back-button" onClick={() => navigate('/registration-for-use')}>
                <span className="sign-up-text37">
                  <span>戻る</span>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default SignUp;