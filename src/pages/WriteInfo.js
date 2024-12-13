import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/style.css';
import ImageScroll from '../components/image/Image';
import Navigator from '../components/navigator/Navigator';
import axios from 'axios';
import apiClient from '../api/apiClient';

function WriteInfo() {
  const navigate = useNavigate();

  // 상태 관리
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] =
    useState('');
  const [selectedImage, setSelectedImage] = useState(null); // 이미지 파일
  const [fileName, setFileName] =
    useState('파일을 선택하세요');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFileName(file.name);
    }
  };

  const handleButtonClick = async () => {
    if (
      productName.trim() === '' ||
      productPrice.trim() === '' ||
      productDescription.trim() === '' ||
      !selectedImage
    ) {
      alert('모든 필드를 채워주세요.');
      return;
    }

    // productDto 생성
    const productDto = {
      name: productName,
      description: productDescription,
      price: productPrice,
    };

    // FormData 생성
    const formData = new FormData();
    formData.append(
      'productDto',
      new Blob([JSON.stringify(productDto)], {
        type: 'application/json',
      })
    ); // JSON을 Blob으로 추가
    formData.append('image', selectedImage); // 이미지 추가

    try {
      // Axios POST 요청
      const response = await apiClient.post(
        '/product',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Product created:', response.data);
      navigate('/MakeTem', { state: response.data });
    } catch (error) {
      console.error('Error creating product:', error);
      alert('서버 요청에 실패했습니다.');
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
              style={{ display: 'none' }}
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
