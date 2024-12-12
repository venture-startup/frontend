import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/style.css';
import Navigator from '../components/navigator/Navigator';
import apiClient from '../api/apiClient.js';
import axios from 'axios';
function ProductGrid() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 서버에서 데이터 가져오기 (예시 데이터 사용)
  useEffect(() => {
    // 서버에서 데이터를 가져온다고 가정
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://venture.koyeb.app/product'
        ); // 요청 경로 설정
        console.log(response);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
      }
    };

    fetchData();
  }, []);

  // 클릭 시 해당 상품 정보로 이동
  const handleProductClick = (product) => {
    navigate('/WriteRev', { state: product }); // 상품 정보를 상태로 전달
  };

  return (
    <div className="main">
      <Navigator></Navigator>
      {/* <div className="productGrid">
        {products.map((product) => (
        ))}
      </div> */}
    </div>
  );
}

export default ProductGrid;
