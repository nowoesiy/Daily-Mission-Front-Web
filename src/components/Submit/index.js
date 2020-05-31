import React from 'react';
import './index.scss';
import SubmitPopup from '../SubmitPopup';
import FileDrop from 'react-file-drop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

const CreateSubmitBox = ({ submit, handleDrop, handlePopUp }) => {
  return (
    <div className="submit__box">
      <div className={`box ${submit ? 'box--submit' : ''}`}>
        <div className={`box__top ${submit ? 'box__top--submit' : ''}`}>
          <h2 className="box__title">제출 보드</h2>
        </div>
        <div className="box__body">
          <div className="drop-upload-box">
            {!submit ? (
              <FileDrop onDrop={handleDrop}>
                <div className="drop-upload-box__wrap" onClick={handlePopUp}>
                  <FontAwesomeIcon icon={faUpload} size="2x" />
                  <span className="drop-upload-box__title">
                    미션 사진을 DRAG 해주세요!
                  </span>
                </div>
              </FileDrop>
            ) : (
              <div className="drop-upload-box__wrap--submit">
                <span className="drop-upload-box__title">
                  😊 오늘 하루도 수고하셨습니다!!!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CreateSubmitDetailBox = ({ histories, weekDates }) => {
  return (
    <div className="submit-detail__box">
      <div className="detail-box">
        <div className="detail-box__title">
          <span>제출 정보</span>
        </div>
        <div className="day-info">
          <table style={{ width: '100%' }}>
            <thead className="day-info__title">
              <tr>
                <th className="day-info__day--first-child"></th>
                {weekDates
                  ? weekDates.map((d) => {
                      return (
                        <th className="day-info__day">{d.day.substr(0, 3)}</th>
                      );
                    })
                  : ''}
              </tr>
            </thead>
            <tbody>
              {histories
                ? histories.map((user) => {
                    return (
                      <tr
                        className={
                          !user.banned
                            ? 'detail-box__user-wrap'
                            : 'detail-box__user-wrap detail-box__user-wrap--banned'
                        }
                      >
                        <td className="detail-box__submit-flag--name">
                          <img
                            className="detail-box__user-img"
                            src={user.thumbnailUrl}
                            alt={user.id}
                          />
                          {user.userName}
                        </td>
                        {weekDates.map((d) => {
                          return user.date.indexOf(d.date) >= 0 ? (
                            <td className="detail-box__submit-flag detail-box__submit-flag--submit">
                              <FontAwesomeIcon icon={faCheck} color="green" />
                            </td>
                          ) : d.mandatory ? (
                            <td className="detail-box__submit-flag detail-box__submit-flag--not-submit">
                              <FontAwesomeIcon icon={faTimes} color="red" />
                            </td>
                          ) : (
                            <td className="detail-box__submit-flag">휴무</td>
                          );
                        })}
                      </tr>
                    );
                  })
                : ''}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Submit = ({
  activeMyMission,
  isPostPopup,
  file,
  fileName,
  postBoard,
  histories,
  weekDates,
  handleDrop,
  handlePopUp,
  handleClickFile,
}) => {
  return (
    <>
      <div className="submit">
        <div className="submit__title">
          <h1 className="submit__title-who">{activeMyMission.title}</h1>
        </div>
        <div className="submit__contents">
          <CreateSubmitBox
            submit={activeMyMission.submit}
            handleDrop={handleDrop}
            handlePopUp={handlePopUp}
          />
        </div>
        <div className="submit-detail">
          <CreateSubmitDetailBox histories={histories} weekDates={weekDates} />
        </div>
      </div>
      {isPostPopup && (
        <SubmitPopup
          id={activeMyMission.id}
          postBoard={postBoard}
          file={file}
          fileName={fileName}
          handlePopUp={handlePopUp}
          handleClickFile={handleClickFile}
        />
      )}
    </>
  );
};

export default Submit;
