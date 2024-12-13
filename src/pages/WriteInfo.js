import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import ImageScroll from "../components/image/Image";
import Navigator from "../components/navigator/Navigator";
import "./style/style.css";

function LoadingModal({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>리뷰 템플릿 만드는 중...</p>
      </div>
    </div>
  );
}

function WriteInfo() {
  const navigate = useNavigate();

  // 상태 관리
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // 이미지 파일
  const [fileName, setFileName] = useState("파일을 선택하세요");
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setFileName(file.name);
    }
  };

  const handleButtonClick = async () => {
    if (
      productName.trim() === "" ||
      productPrice.trim() === "" ||
      productDescription.trim() === "" ||
      !selectedImage
    ) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    // 로딩 시작
    setIsLoading(true);

    const productDto = {
      name: productName,
      description: productDescription,
      price: productPrice,
    };

    const formData = new FormData();
    formData.append(
      "productDto",
      new Blob([JSON.stringify(productDto)], {
        type: "application/json",
      })
    );
    formData.append("image", selectedImage);

    try {
      const response = await apiClient.post("/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Product created:", response.data);
      navigate("/MakeTem", { state: response.data });
    } catch (error) {
      console.error("Error creating product:", error);
      alert("서버 요청에 실패했습니다.");
    } finally {
      // 로딩 종료
      setIsLoading(false);
    }
  };

  return (
    <div className="main">
      <Navigator />
      <LoadingModal isLoading={isLoading} />
      <div className="mainInfo">
        <div>
          <p className="subTitle">
            저희 서비스에서는 회사에서 판매하고 있는 제품 설명을 등록하면
            <br /> AI가 제품 설명을 읽고 분석하여 태그에 맞게 리뷰 템플릿을
            작성해줍니다.
            <br />
            해당 리뷰 템플릿을 유저가 리뷰를 쉽게 작성하도록 도와주고, <br />
            랜덤으로 특징을 뽑아서 리뷰를 작성하기에 여러 리뷰를 뽑아 낼 수
            있습니다.
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
                onChange={(e) => setProductName(e.target.value)}
                placeholder="제품명을 입력하세요"
              />
            </div>
            <div>
              <p className="productInfo">제품 가격</p>
              <input
                type="text"
                className="productInput"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                placeholder="제품 가격을 입력하세요"
              />
            </div>
          </div>
          <div>
            <p className="productInfo2">제품 이미지</p>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <div className="row">
              <label htmlFor="fileInput" className="customFileButton">
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
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="제품 설명을 입력하세요"
            ></textarea>
          </div>
          <div className="buttonDiv">
            <button className="mainButton" onClick={handleButtonClick}>
              리뷰 템플릿 만들기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteInfo;
