import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import Navigator from '../components/navigator/Navigator';
import './style/style.css';

function WriteRev() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state; // 이전 페이지에서 전달된 상품 정보

  const [reviews, setReviews] = useState([]); // 리뷰 템플릿 데이터를 저장할 state
  const [productReviews, setProductReviews] = useState([]); // 기존 리뷰 데이터를 저장할 state
  const [showSingleInput, setShowSingleInput] =
    useState(false);
  const [isAiReviewActive, setIsAiReviewActive] =
    useState(false);
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [reviewText, setReviewText] = useState(''); // 텍스트 리뷰 상태
  const [aiReviewAnswers, setAiReviewAnswers] = useState(
    {}
  ); // AI 리뷰 답변 상태

  // 랜덤 리뷰 템플릿을 서버에서 받아오는 useEffect
  useEffect(() => {
    if (product) {
      const productId = product.id; // productId를 product에서 가져옴

      const fetchReviews = async () => {
        try {
          const response = await apiClient.get(
            `/review/ai/${productId}`
          );
          setReviews(response.data); // 리뷰 데이터를 state에 저장
        } catch (err) {
          console.error('Error fetching reviews:', err);
        }
      };

      const fetchProductReviews = async () => {
        try {
          const response = await apiClient.get(
            `/review/${productId}`
          );
          console.log(response.data);
          setProductReviews(response.data); // 기존 리뷰 데이터를 state에 저장
        } catch (err) {
          console.error(
            'Error fetching product reviews:',
            err
          );
        }
      };

      fetchReviews();
      fetchProductReviews();
    }
  }, [product]); // product가 변경될 때마다 리뷰 데이터를 다시 요청

  // 리뷰 템플릿을 보여줄지 말지 결정하는 toggle 함수
  const toggleInput = () => {
    setShowSingleInput((prev) => !prev);
    setIsAiReviewActive((prev) => !prev);
  };

  // 리뷰 제출 후 페이지 이동
  const handleNavigateClick = async () => {
    setShowModal(true); // 모달 표시

    try {
      if (showSingleInput) {
        // AI 리뷰 템플릿 데이터를 서버에 보낼 때
        const questionAnswers = Object.keys(
          aiReviewAnswers
        ).map((question) => ({
          question,
          answer: aiReviewAnswers[question],
        }));

        const response = await apiClient.post(
          `/review/ai`,
          {
            questionAnswers,
          }
        );
        setReviewText(response.data.reviewContent);
        toggleInput();
      } else {
        // 텍스트 리뷰를 서버에 보낼 때
        const response = await apiClient.post(`/review`, {
          productId: product.id,
          text: reviewText,
        });
        navigate('/');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
    }
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  // AI 리뷰 템플릿 입력값 변경 함수
  const handleAiReviewChange = (question, answer) => {
    setAiReviewAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  // 텍스트 리뷰 입력값 변경 함수
  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
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
              {Number(product.price).toLocaleString()} 원
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
              // 서버에서 받아온 리뷰 템플릿을 동적으로 렌더링
              <>
                {reviews.map((review, index) => (
                  <div key={index} className="revDiv">
                    <p className="subTitle">
                      {review.question}
                    </p>
                    <input
                      className="revTem"
                      value={
                        aiReviewAnswers[review.question] ||
                        ''
                      }
                      onChange={(e) =>
                        handleAiReviewChange(
                          review.question,
                          e.target.value
                        )
                      }
                      placeholder="답변을 작성해주세요"
                    />
                  </div>
                ))}
              </>
            ) : (
              <textarea
                className="mainInputRev"
                placeholder="리뷰를 작성하세요"
                value={reviewText}
                onChange={handleReviewTextChange}
              />
            )}
          </div>

          <div className="temButtonDiv">
            {showSingleInput ? (
              <button
                className="mainButton"
                onClick={handleNavigateClick}
              >
                AI 리뷰 생성
              </button>
            ) : (
              <button
                className="mainButton"
                onClick={handleNavigateClick}
              >
                리뷰 작성
              </button>
            )}
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

      {/* 기존 리뷰 내역 표시 */}
      <div className="reviewContainer">
        <h1>리뷰 내역</h1>
        <div className="existingReviews">
          {productReviews.length > 0 ? (
            productReviews.map((review, index) => (
              <div
                key={index}
                className={`reviewItem ${
                  index === productReviews.length - 1
                    ? 'lastItem'
                    : ''
                }`}
              >
                <div className="reviewHeader">
                  <div className="userIcon"></div>
                  <span className="userName">
                    User {index + 1}
                  </span>
                </div>
                <p className="reviewText">{review.text}</p>
              </div>
            ))
          ) : (
            <p className="noReviews">
              등록된 리뷰가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WriteRev;
