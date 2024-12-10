import { useNavigate } from 'react-router-dom'; // useNavigate import
import './style/style.css';
import Navigator from '../components/navigator/Navigator';
function MakeTem() {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleButtonClick = () => {
    navigate('/'); // '/MakeTem'으로 이동
  };
  return (
    <div className="mainTem">
      <Navigator></Navigator>
      <div className="titleDiv">
        <p className="mainTitle">리뷰 템플릿</p>
      </div>
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
