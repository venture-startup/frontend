import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/style.css';
import ImageScroll from '../components/image/Image';
import Navigator from '../components/navigator/Navigator';
import axios from 'axios'; // axios import 추가

function WriteInfo() {
  const navigate = useNavigate();

  // 상태 관리
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] =
    useState('');
  const [fileName, setFileName] =
    useState('파일을 선택하세요');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = async () => {
    const productData = {
      name: productName,
      price: productPrice,
      image: fileName, // 서버로 보낼 때 파일 URL이 아닌 파일 이름만 보내는 경우입니다.
      description: productDescription,
    };

    try {
      // POST 요청으로 서버에 데이터 전송
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/product`,
        productData,
        {
          headers: {
            'Content-Type': 'application/json', // 요청 헤더 설정
          },
        }
      );
      // 'response.data'는 서버에서 받아온 데이터입니다.
      navigate('/MakeTem', { state: response.data });
    } catch (err) {
      console.error('Error sending product data:', err);
    }
  };

  return (
    <div className="main">
      <Navigator />
      <div className="mainInfo">
        <div>
          <p className="subTitle">
            저희 서비스에서는 회사에서 판매하고 있는 제품
            설명을 등록하면
            <br /> AI가 제품 설명을 읽고 분석하여 태그에
            맞게 리뷰 템플릿을 작성해줍니다.
            <br />
            해당 리뷰 템플릿을 유저가 리뷰를 쉽게 작성하도록
            도와주고, <br />
            랜덤으로 특징을 뽑아서 리뷰를 작성하기에 여러
            리뷰를 뽑아 낼 수 있습니다.
          </p>
          <ImageScroll />
        </div>
        <div className="inputDiv">
          <div className="rowDiv">
            <div>
              <p className="productInfo">제품 명</p>
              <input
                type="text"
                className="productInput"
                value={productName}
                onChange={(e) =>
                  setProductName(e.target.value)
                }
                placeholder="제품명을 입력하세요"
              />
            </div>
            <div>
              <p className="productInfo">제품 가격</p>
              <input
                type="text"
                className="productInput"
                value={productPrice}
                onChange={(e) =>
                  setProductPrice(e.target.value)
                }
                placeholder="제품 가격을 입력하세요"
              />
            </div>
          </div>
          <div>
            <p className="productInfo2">제품 이미지</p>
            {/* 숨겨진 파일 입력 */}
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }} // 숨김 처리
            />
            {/* 커스텀 버튼 */}
            <div className="row">
              <label
                htmlFor="fileInput"
                className="customFileButton"
              >
                파일 업로드
              </label>
              <p className="fileName">{fileName}</p>
            </div>
          </div>
          <div>
            <p className="productInfo2">제품 설명</p>
            <textarea
              className="mainInput"
              value={productDescription}
              onChange={(e) =>
                setProductDescription(e.target.value)
              }
              placeholder="제품 설명을 입력하세요"
            ></textarea>
          </div>
          <div className="buttonDiv">
            <button
              className="mainButton"
              onClick={handleButtonClick}
            >
              리뷰 템플릿 만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteInfo;
