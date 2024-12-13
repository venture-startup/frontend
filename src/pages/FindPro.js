import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/style.css';
import Navigator from '../components/navigator/Navigator';
import axios from 'axios';

function ProductGrid() {
  const [products, setProducts] = useState([]); // 상품 데이터를 저장할 state
  const navigate = useNavigate();

  // 서버에서 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/product`
        ); // 요청 경로 설정
        setProducts(response.data); // 받은 데이터를 상태에 저장
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  // 클릭 시 해당 상품 정보로 이동
  const handleProductClick = (product) => {
    navigate('/WriteRev', { state: product }); // 상품 정보를 상태로 전달
  };

  return (
    <div className="main">
      <Navigator />
      <div className="productGrid">
        {products.map((product) => (
          <div
            key={product.id}
            className="productCard"
            onClick={() => handleProductClick(product)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="productImage"
            />
            <h3 className="productName">{product.name}</h3>
            <p className="productPrice">
              {product.price.toLocaleString()} 원
            </p>
            <p className="productDescription">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
