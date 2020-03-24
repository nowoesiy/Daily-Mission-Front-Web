import React from 'react';
import './index.scss';
import Popup from 'reactjs-popup';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

class MissionCreatePopup extends React.Component {
  state = {
    title: '',
    content: '',
    file: '',
    startDate: new Date(),
    endDate: new Date(),
    sun: true,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
  };

  onChangeTitle = e => {
    this.setState({
      title: e.target.value,
    });
  };
  onChangeContent = e => {
    this.setState({
      content: e.target.value,
    });
  };
  onChangeStartDate = d => {
    this.setState({
      startDate: d,
    });
  };
  onChangeStartDate = d => {
    this.setState({
      startDate: d,
    });
  };

  onChangeEndDate = d => {
    this.setState({
      endDate: d,
    });
  };

  handleChangeFile = e => {
    this.setState({
      file: e.target.files[0],
    });
    console.log(this.state.file);
  };

  handleChangeSubmitDay = e => {
    this.setState({ ...this.state, [e.target.name]: e.target.checked });
  };

  postMission = () => {
    const {
      title,
      content,
      file,
      startDate,
      endDate,
      sun,
      mon,
      tue,
      wed,
      thu,
      fri,
      sat,
    } = this.state;

    const formData = new FormData();

    formData.set('week.sun', sun);
    formData.set('week.mon', mon);
    formData.set('week.tue', tue);
    formData.set('week.wed', wed);
    formData.set('week.thu', thu);
    formData.set('week.fri', fri);
    formData.set('week.sat', sat);
    formData.set('title', title);
    formData.set('content', content);
    formData.set('file', file);
    formData.set('startDate', startDate.toISOString().substring(0, 10));
    formData.set('endDate', endDate.toISOString().substr(0, 10));

    console.log(formData);

    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    axios
      .post('https://api.daily-mission.com/api/mission', formData, config)
      .then(() => {
        console.log('--------------------> 미션 생성 성공');
      })
      .catch(error => {
        console.log('failed', error);
      });
  };

  render() {
    const {
      title,
      content,
      startDate,
      endDate,
      file,
      sun,
      mon,
      tue,
      wed,
      thu,
      fri,
      sat,
    } = this.state;
    return (
      <Popup
        modal
        closeOnDocumentClick
        trigger={<button className="create-mission-btn">미션 만들기</button>}
      >
        {close => (
          <div className="new-mission">
            <a
              className="submit-board__cancel-button"
              onClick={() => {
                close();
              }}
              href
            >
              ×
            </a>
            <div className="new-mission__title">
              <label>미션 이름</label>
              <label
                className="title__description"
                style={{ fontSize: '1rem', marginLeft: '15px' }}
              >
                {title.length >= 20 || title.length <= 5
                  ? '5~20자 사이로 맞춰주세요'
                  : ''}
              </label>
              <input
                className="new-mission__input new-mission__input--good"
                name="title"
                type="text"
                autoComplete="off"
                value={title}
                onChange={this.onChangeTitle}
              />
            </div>
            <div className="new-mission__contents">
              <label>미션 설명</label>
              <input
                className="new-mission__input"
                name="content"
                value={content}
                onChange={this.onChangeContent}
                placeholder="10자 ~ 20자"
              ></input>
            </div>

            <div className="new-mission__date">
              <div className="new-mission__start-date">
                <label>시작 날짜</label>
                <DatePicker
                  className="new-mission__input new-mission__input--start-date"
                  selected={startDate}
                  onChange={this.onChangeStartDate}
                />
              </div>
              <div className="new-mission__end-date">
                <label>종료 날짜</label>
                <DatePicker
                  className="new-mission__input new-mission__input--end-date"
                  selected={endDate}
                  onChange={this.onChangeEndDate}
                />
              </div>
            </div>
            <div className="new-mission__submit-day">
              <label>미션 제출 요일</label>
              <div className="new-mission__submit-day-check">
                일
                <input
                  type="checkbox"
                  name="sun"
                  value={sun}
                  onChange={this.handleChangeSubmitDay}
                />
                월
                <input
                  type="checkbox"
                  name="mon"
                  value={mon}
                  onChange={this.handleChangeSubmitDay}
                />
                화{' '}
                <input
                  type="checkbox"
                  name="tue"
                  value={tue}
                  onChange={this.handleChangeSubmitDay}
                />
                수{' '}
                <input
                  type="checkbox"
                  name="wed"
                  value={wed}
                  onChange={this.handleChangeSubmitDay}
                />
                목{' '}
                <input
                  type="checkbox"
                  name="thu"
                  value={thu}
                  onChange={this.handleChangeSubmitDay}
                />
                금{' '}
                <input
                  type="checkbox"
                  name="fri"
                  value={fri}
                  onChange={this.handleChangeSubmitDay}
                />
                토
                <input
                  type="checkbox"
                  name="sat"
                  value={sat}
                  onChange={this.handleChangeSubmitDay}
                />
              </div>
            </div>
            <div className="new-mission__thumbnail-file">
              <label style={{ display: 'block' }}>이미지</label>
              <label
                for="thumbnail-file"
                className="new-mission__thumbnail-file-input"
              >
                찾아보기
              </label>
              <span>{file.name}</span>
              <input
                id="thumbnail-file"
                style={{ display: 'none' }}
                type="file"
                onChange={this.handleChangeFile}
              />
            </div>
            <div className="new-mission__submit-button-wrap">
              <button
                type="sumbit"
                className="new-mission__submit-button"
                onClick={() => {
                  this.postMission();
                  close();
                }}
              >
                미션 만들기
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}
export default MissionCreatePopup;
