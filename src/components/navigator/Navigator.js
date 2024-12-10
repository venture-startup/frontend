import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

function Navigator() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <header className="header">
      <h1 className="mainTitle">리뷰 템플릿 제작 서비스</h1>
      <nav className="navi">
        <button
          className="naviTitle"
          onClick={() => handleNavigation('/')}
        >
          제품 등록
        </button>
        <button
          className="naviTitle"
          onClick={() => handleNavigation('/FindPro')}
        >
          제품 찾기
        </button>
      </nav>
    </header>
  );
}

export default Navigator;
