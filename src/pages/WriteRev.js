import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/style.css';
import Navigator from '../components/navigator/Navigator';
function WriteRev() {
  const navigate = useNavigate();
  const [showSingleInput, setShowSingleInput] =
    useState(false);
  const [isAiReviewActive, setIsAiReviewActive] =
    useState(false);
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가

  const handleNavigateClick = () => {
    setShowModal(true); // 모달 표시
    setTimeout(() => {
      setShowModal(false); // 3초 후 모달 숨김
      navigate('/'); // 페이지 이동
    }, 3000);
  };

  const toggleInput = () => {
    setShowSingleInput((prev) => !prev);
    setIsAiReviewActive((prev) => !prev);
  };

  return (
    <div
      className={`main ${
        isAiReviewActive ? 'mainTem' : 'main'
      }`}
    >
      <Navigator></Navigator>
      <div className="leftDiv">
        <button
          className={`mainButton ${
            isAiReviewActive ? 'activeButton' : ''
          }`}
          onClick={toggleInput}
        >
          Ai 리뷰
        </button>
      </div>
      <div>
        {showSingleInput ? (
          <>
            <div className="revDiv">
              <p className="subTitle">안정성</p>
              <input className="revTem"></input>
            </div>
            <div className="revDiv">
              <p className="subTitle">성능</p>
              <input className="revTem"></input>
            </div>
            <div className="revDiv">
              <p className="subTitle">색감 및 디자인</p>
              <input className="revTem"></input>
            </div>
            <div className="revDiv">
              <p className="subTitle">편안함</p>
              <input className="revTem"></input>
            </div>
            <div className="revDiv">
              <p className="subTitle">재구매 의사</p>
              <input className="revTem"></input>
            </div>
            <div className="revDiv">
              <p className="subTitle">가성비</p>
              <input className="revTem"></input>
            </div>
          </>
        ) : (
          <input
            className="mainInput"
            placeholder="리뷰 작성해주세요!"
          />
        )}
      </div>
      <div className="temButtonDiv">
        <button
          className="mainButton"
          onClick={handleNavigateClick}
        >
          리뷰 작성!
        </button>
      </div>

      {/* 모달 렌더링 */}
      {showModal && (
        <div className="modal">
          <div className="modalContent">
            리뷰 작성중입니다...
          </div>
        </div>
      )}
    </div>
  );
}

export default WriteRev;
