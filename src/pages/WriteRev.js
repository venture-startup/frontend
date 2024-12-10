import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './style/style.css';
import Navigator from '../components/navigator/Navigator';

function WriteRev() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state; // 이전 페이지에서 전달된 상품 정보

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
    <div className="mainTem">
      <Navigator />

      {/* 제품 정보 표시 */}
      <div className="productRow">
        <div className="productDetails">
          <img
            src={product.image}
            alt={product.name}
            className="productImageRev"
          />
          <div className="productInfo">
            <h2 className="productNameRev">
              {product.name}
            </h2>
            <p className="productPriceRev">
              {product.price}
            </p>
            <p className="productDescriptionRev">
              {product.description}
            </p>
          </div>
        </div>

        <div className="revForm">
          <div className="leftDiv">
            <button
              className={`notActiveButton ${
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
                  <input
                    className="revTem"
                    placeholder="안정성에 대한 리뷰를 작성하세요."
                  />
                </div>
                <div className="revDiv">
                  <p className="subTitle">성능</p>
                  <input
                    className="revTem"
                    placeholder="성능에 대한 리뷰를 작성하세요."
                  />
                </div>
                <div className="revDiv">
                  <p className="subTitle">색감 및 디자인</p>
                  <input
                    className="revTem"
                    placeholder="색감 및 디자인에 대한 리뷰를 작성하세요."
                  />
                </div>
                <div className="revDiv">
                  <p className="subTitle">편안함</p>
                  <input
                    className="revTem"
                    placeholder="편안함에 대한 리뷰를 작성하세요."
                  />
                </div>
                <div className="revDiv">
                  <p className="subTitle">재구매 의사</p>
                  <input
                    className="revTem"
                    placeholder="재구매 의사에 대한 리뷰를 작성하세요."
                  />
                </div>
                <div className="revDiv">
                  <p className="subTitle">가성비</p>
                  <input
                    className="revTem"
                    placeholder="가성비에 대한 리뷰를 작성하세요."
                  />
                </div>
              </>
            ) : (
              <textarea
                className="mainInputRev"
                placeholder="리뷰를 작성하세요!"
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
      </div>
    </div>
  );
}

export default WriteRev;
