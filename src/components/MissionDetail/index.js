import React from 'react';
import './index.scss';
import { Line } from 'rc-progress';

const MissionAttendPopup = ({
  mission,
  password,
  postAttednigMission,
  handleInputChange,
  handleOnClickPopUp,
  closetAttendModal,
  isPasswordRight,
}) => {
  return (
    <div className="overlay">
      <div className="detail__password-wrap">
        <div className="password-wrap">
          <span
            className="submit-board__cancel-button"
            onClick={() => {
              handleOnClickPopUp();
              closetAttendModal();
            }}
          >
            ×
          </span>
          <div
            className={`password-wrap__label ${
              isPasswordRight === false ? 'password-wrap__label--alert' : ''
            }`}
          >
            {isPasswordRight === undefined
              ? '해당 미션에 참여하기 위해서는 참여코드가 필요합니다.'
              : '참여코드가 일치 하지 않습니다'}
          </div>
          <div className="password-wrap__attend">
            <input
              className="password-wrap__attend-pwd"
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e)}
              placeholder="참여 코드"
            />

            <button
              className={`password-wrap__attend-btn ${
                password ? '' : 'password-wrap__attend-btn--error'
              }`}
              onClick={() => {
                postAttednigMission(mission.id, password);
                if (isPasswordRight === true) closetAttendModal();
              }}
              disabled={!password}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateDayInfo = ({ mission }) => {
  return (
    <>
      <div
        className={`content-wrap__day ${
          mission.week.sun ? '' : 'content-wrap__day--not-submit'
        }`}
      >
        일
      </div>
      <div
        className={`content-wrap__day ${
          mission.week.mon ? '' : 'content-wrap__day--not-submit'
        }`}
      >
        월
      </div>
      <div
        className={`content-wrap__day ${
          mission.week.tue ? '' : 'content-wrap__day--not-submit'
        }`}
      >
        화
      </div>
      <div
        className={`content-wrap__day ${
          mission.week.wed ? '' : 'content-wrap__day--not-submit'
        }`}
      >
        수
      </div>
      <div
        className={`content-wrap__day ${
          mission.week.thu ? '' : 'content-wrap__day--not-submit'
        }`}
      >
        목
      </div>
      <div
        className={`content-wrap__day ${
          mission.week.fri ? '' : 'content-wrap__day--not-submit'
        }`}
      >
        금
      </div>
      <div
        className={`content-wrap__day ${
          mission.week.sat ? '' : 'content-wrap__day--not-submit'
        }`}
      >
        토
      </div>
    </>
  );
};

const CreatePeriodProgress = ({ mission }) => {
  const now = new Date();
  const startDate = new Date(mission.startDate);
  const endDate = new Date(mission.endDate);
  endDate.setDate(endDate.getDate() + 1);
  const startToNow = now.getTime() - startDate.getTime();
  const leftTime = endDate.getTime() - now.getTime();
  const leftDay = Math.floor(leftTime / (1000 * 3600 * 24) + 1);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDay = diffTime / (1000 * 3600 * 24);

  return startToNow > 0 ? (
    mission.ended ? (
      <span className="content-wrap__attend-label">종료된 미션입니다.</span>
    ) : (
      <>
        <Line
          percent={100 - (leftDay / diffDay) * 100}
          strokeWidth="4"
          strokeColor="#D3D3D3"
        />
        <span className="content-wrap__leftDays">
          {diffDay}일 중 {Math.floor(leftDay)}일 남음
        </span>
        <span className="content-wrap__leftDate">
          {mission.endDate} 미션 종료
        </span>
      </>
    )
  ) : (
    <div className="content-wrap__not-start-mission">
      {mission.startDate} ~ {mission.endDate}
    </div>
  );
};

const CreateMissionAttendButton = ({ mission, handleOnClickPopUp }) => {
  const now = new Date();
  const startDate = new Date(mission.startDate);

  const startToNow = now.getTime() - startDate.getTime();
  return startToNow > 0 ? (
    mission.ended ? (
      ''
    ) : (
      <span className="content-wrap__attend-label">
        이미 시작한 미션입니다 😥
      </span>
    )
  ) : (
    <button className="content-wrap__attend-btn" onClick={handleOnClickPopUp}>
      미션 참여하기
    </button>
  );
};

const MissionDetail = ({
  postAttednigMission,
  currentUser,
  closetAttendModal,
  isPasswordRight,
  mission,
  password,
  isAttendPopup,
  handleOnClickPopUp,
  handleInputChange,
}) => {
  if (!mission) return <div></div>;
  return (
    <div className="App-detail">
      <div className="detail">
        <div className="detail__wrap">
          <img
            className="detail__img"
            src={mission.thumbnailUrlDetail}
            alt={mission.id}
          />
          <div className="detail__content-wrap">
            <div className="content-wrap">
              <div className="content-wrap__top">
                <div className="content-wrap__title">
                  {mission.userName}'s {mission.title}
                </div>
                <div className="content-wrap__content">{mission.content}</div>
              </div>
              <div className="content-wrap__period-info">
                <CreatePeriodProgress mission={mission} />
              </div>
              <div className="content-wrap__submit-day">
                <CreateDayInfo mission={mission} />
              </div>
              <div className="content-wrap__button-wrap">
                {currentUser ? (
                  mission.participants.filter(
                    (participant) => participant.id === currentUser.id,
                  )[0] ? (
                    <span className="content-wrap__attend-label">
                      참여 중인 미션 🏃‍♂️🏃‍♀️
                    </span>
                  ) : (
                    <CreateMissionAttendButton
                      mission={mission}
                      handleOnClickPopUp={handleOnClickPopUp}
                    />
                  )
                ) : (
                  <span className="content-wrap__attend-label">
                    로그인 후 참여해 주세요!
                  </span>
                )}
              </div>
              {!isPasswordRight && isAttendPopup && (
                <MissionAttendPopup
                  mission={mission}
                  password={password}
                  postAttednigMission={postAttednigMission}
                  closetAttendModal={closetAttendModal}
                  isPasswordRight={isPasswordRight}
                  handleOnClickPopUp={handleOnClickPopUp}
                  handleInputChange={handleInputChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionDetail;
