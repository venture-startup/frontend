import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useLocation 추가
import './style/style.css';
import Navigator from '../components/navigator/Navigator';
import axios from 'axios';

function MakeTem() {
  const navigate = useNavigate();
  const location = useLocation(); // location 객체 사용
  const [product, setProduct] = useState(null); // product 상태 추가
  const [reviews, setReviews] = useState([]); // 리뷰 데이터를 저장할 state

  // 서버에서 product 데이터를 받아오는 useEffect
  useEffect(() => {
    if (location.state) {
      setProduct(location.state); // 서버에서 받은 product 데이터를 state에 저장
    }
  }, [location.state]); // location.state가 변경될 때마다 실행

  // 랜덤 리뷰 템플릿을 서버에서 받아오는 useEffect
  useEffect(() => {
    if (product) {
      const productId = product.id; // productId를 product에서 가져옴
      const fetchReviews = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/review/ai/${productId}`
          );
          setReviews(response.data); // 리뷰 데이터를 state에 저장
        } catch (err) {
          console.error('Error fetching reviews:', err);
        }
      };

      fetchReviews();
    }
  }, [product]); // product가 변경될 때마다 리뷰 데이터를 다시 요청

  // 리뷰 템플릿 확인 버튼 클릭 시
  const handleButtonClick = () => {
    navigate('/'); // 홈으로 이동
  };

  return (
    <div className="mainTem">
      <Navigator />
      <div className="titleDiv">
        <p className="mainTitle">리뷰 템플릿</p>
      </div>

      {/* 리뷰 항목 (서버에서 받아온 리뷰 데이터로 맵핑) */}
      <div className="revSection">
        {reviews.map((review) => (
          <div key={review.id} className="revDiv">
            <p className="subTitle">{review.question}</p>
            <input
              className="revTem"
              value={review.comment || ''} // 리뷰 내용
              readOnly
            />
          </div>
        ))}
      </div>

      {/* 버튼 */}
      <div className="temButtonDiv">
        <button
          className="mainButton"
          onClick={handleButtonClick}
        >
          리뷰 템플릿 확인
        </button>
      </div>
    </div>
  );
}

export default MakeTem;
