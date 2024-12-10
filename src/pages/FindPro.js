import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/style.css';
import Navigator from '../components/navigator/Navigator';
function ProductGrid() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 서버에서 데이터 가져오기 (예시 데이터 사용)
  useEffect(() => {
    // 서버에서 데이터를 가져온다고 가정
    const fetchData = async () => {
      const exampleData = [
        {
          id: 1,
          name: '상품 1',
          price: '1000원',
          image: '/images/image1.png',
          description: '상품 1 설명',
        },
        {
          id: 2,
          name: '상품 2',
          price: '2000원',
          image: '/images/image2.png',
          description: '상품 2 설명',
        },
        // 추가 상품 데이터
      ];
      setProducts(exampleData);
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
            <p className="productPrice">{product.price}</p>
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
