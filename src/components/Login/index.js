import React from 'react';
import './index.scss';
import { GOOGLE_AUTH_URL } from '../../constants';
import googlelogo from '../../static/img/google-logo.png';
class Login extends React.Component {
  render() {
    return (
      <div className="login-modal">
        <div className="login-modal__title">소셜계정 로그인</div>
        <a href={GOOGLE_AUTH_URL}>
          <button className="login-modal__button" type="button">
            <img
              style={{ width: '25px', height: '25px' }}
              src={googlelogo}
              alt="google"
            ></img>
            <span>구글로 시작하기</span>
          </button>
        </a>
        <a href={GOOGLE_AUTH_URL}>
          <button
            className="login-modal__button"
            type="button"
            href={GOOGLE_AUTH_URL}
          >
            카카오로 시작하기
          </button>
        </a>
        <a href={GOOGLE_AUTH_URL}>
          <button
            className="login-modal__button"
            type="button"
            href={GOOGLE_AUTH_URL}
          >
            네이버로 시작하기
          </button>
        </a>
      </div>
    );
  }
}

export default Login;
