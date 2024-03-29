import React from 'react';
import './index.scss';
import Popup from 'reactjs-popup';
import moment from 'moment';

class MissionCreatePopup extends React.Component {
  state = {
    title: '',
    content: '',
    file: '',
    fileName: '',
    startDate: moment(new Date()).format('YYYY-MM-DD'),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    sun: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
  };

  onChangeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleChangeFile = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.files[0].name,
    });
  };

  handleChangeSubmitDay = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.checked });
  };

  render() {
    const {
      title,
      content,
      startDate,
      endDate,
      file,
      fileName,
      sun,
      mon,
      tue,
      wed,
      thu,
      fri,
      sat,
    } = this.state;
    const today = moment(new Date()).format('YYYY-MM-DD');

    const formData = new FormData();
    const ext = fileName
      .slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)
      .toLowerCase();

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
    formData.set('startDate', startDate);
    formData.set('endDate', endDate);

    const error =
      content.length > 50 ||
      content.length <= 10 ||
      title.length > 20 ||
      title.length <= 5 ||
      (!sun && !mon && !tue && !wed && !thu && !fri && !sat) ||
      !file ||
      (ext !== 'jpg' && ext !== 'jpeg' && ext !== 'gif' && ext !== 'png');

    return (
      <Popup
        modal
        closeOnDocumentClick
        trigger={<button className="create-mission-btn">미션 만들기</button>}
      >
        {(close) => (
          <div className="new-mission">
            <span
              className="submit-board__cancel-button"
              onClick={() => {
                close();
              }}
            >
              ×
            </span>
            <form
              onSubmit={() => {
                this.props.postMission(formData);
                close();
              }}
            >
              <div className="new-mission__title">
                <label>미션 이름</label>
                <label className="new-mission__descrition">
                  {title.length > 20 || title.length <= 5
                    ? '5~20자 사이로 맞춰주세요'
                    : ''}
                </label>
                <input
                  className="new-mission__input new-mission__input"
                  name="title"
                  type="text"
                  autoComplete="off"
                  value={title}
                  maxlength="10"
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="new-mission__contents">
                <label>미션 설명</label>
                <label className="new-mission__descrition">
                  {content.length > 50 || content.length <= 10
                    ? '10~50자 사이로 맞춰주세요'
                    : ''}
                </label>
                <input
                  className="new-mission__input"
                  name="content"
                  value={content}
                  maxlength="50"
                  autoComplete="off"
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="new-mission__date">
                <div className="new-mission__start-date">
                  <label>시작 날짜</label>
                  <input
                    className="new-mission__input new-mission__input--start-date"
                    type="date"
                    value={startDate}
                    name="startDate"
                    onChange={this.onChangeInput}
                    min={today}
                  />
                </div>
                <div className="new-mission__end-date">
                  <label>종료 날짜</label>
                  <input
                    className="new-mission__input new-mission__input--start-date"
                    type="date"
                    value={endDate}
                    name="endDate"
                    min={startDate}
                    onChange={this.onChangeInput}
                  />
                </div>
              </div>
              <div className="new-mission__submit-day">
                <label>미션 제출 요일</label>
                <label className="new-mission__descrition">
                  {!sun && !mon && !tue && !wed && !thu && !fri && !sat
                    ? '하나 이상의 제출 요일을 선택해 주세요'
                    : ''}
                </label>
                <div className="new-mission__submit-day-check">
                  <div className="submit-day-check__wrap">
                    일
                    <input
                      type="checkbox"
                      name="sun"
                      value={sun}
                      onChange={this.handleChangeSubmitDay}
                    />
                  </div>
                  <div className="submit-day-check__wrap">
                    월
                    <input
                      type="checkbox"
                      name="mon"
                      value={mon}
                      onChange={this.handleChangeSubmitDay}
                    />
                  </div>
                  <div className="submit-day-check__wrap">
                    화
                    <input
                      type="checkbox"
                      name="tue"
                      value={tue}
                      onChange={this.handleChangeSubmitDay}
                    />
                  </div>
                  <div className="submit-day-check__wrap">
                    수
                    <input
                      type="checkbox"
                      name="wed"
                      value={wed}
                      onChange={this.handleChangeSubmitDay}
                    />
                  </div>
                  <div className="submit-day-check__wrap">
                    목
                    <input
                      type="checkbox"
                      name="thu"
                      value={thu}
                      onChange={this.handleChangeSubmitDay}
                    />
                  </div>
                  <div className="submit-day-check__wrap">
                    금
                    <input
                      type="checkbox"
                      name="fri"
                      value={fri}
                      onChange={this.handleChangeSubmitDay}
                    />
                  </div>
                  <div className="submit-day-check__wrap">
                    토
                    <input
                      type="checkbox"
                      name="sat"
                      value={sat}
                      onChange={this.handleChangeSubmitDay}
                    />
                  </div>
                </div>
              </div>
              <div className="new-mission__thumbnail-file">
                <label style={{ display: 'block' }}>
                  이미지
                  <label className="new-mission__descrition">
                    {!file
                      ? '미션 관련 이미지를 업로드 해주세요'
                      : ext !== 'jpg' &&
                        ext !== 'jpeg' &&
                        ext !== 'gif' &&
                        ext !== 'png' &&
                        ext !== 'bmp'
                      ? '저장 할 수 있는 이미지의 확장자는 jpg/jpeg/gif/png/bmp 입니다'
                      : ''}
                  </label>
                </label>
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
                  accept="image/x-png,image/gif,image/jpeg"
                />
              </div>
              <div className="new-mission__submit-button-wrap">
                <button
                  type="submit"
                  className={`new-mission__submit-button new-mission__submit-button${
                    error ? '--error' : ''
                  }`}
                  disabled={error}
                >
                  미션 만들기
                </button>
              </div>
            </form>
          </div>
        )}
      </Popup>
    );
  }
}
export default MissionCreatePopup;
