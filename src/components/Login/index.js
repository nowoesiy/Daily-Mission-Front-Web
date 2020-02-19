import React from 'react';
import './index.scss';
import { GOOGLE_AUTH_URL } from '../../constants';
import googlelogo from '../../static/img/google-logo.png';
import kakaologo from '../../static/img/kakao--logo.png';
import naverlogo from '../../static/img/naver-logo.png';

class Login extends React.Component {
  render() {
    return (
      <div className="login-modal">
        <div className="login-modal__title">로그인</div>
        <a href={GOOGLE_AUTH_URL}>
          <button
            className="login-modal__button login-modal__button--google"
            type="button"
          >
            <img
              className="login-modal__button-image"
              src={googlelogo}
              alt="google"
            ></img>
            <span> 구글로 시작하기</span>
          </button>
        </a>
        <a href={GOOGLE_AUTH_URL}>
          <button
            className="login-modal__button login-modal__button--kakao"
            type="button"
            href={GOOGLE_AUTH_URL}
          >
            <img
              className="login-modal__button-image"
              src={kakaologo}
              alt="kakao"
            ></img>
            <span> 카카오로 시작하기</span>
          </button>
        </a>
        <a href={GOOGLE_AUTH_URL}>
          <button
            className="login-modal__button login-modal__button--naver"
            type="button"
            href={GOOGLE_AUTH_URL}
          >
            <img
              className="login-modal__button-image"
              src={naverlogo}
              alt="naver"
            ></img>
            <span> 네이버로 시작하기</span>
          </button>
        </a>
      </div>
    );
  }
}

export default Login;
