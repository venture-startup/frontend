import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

function Navigator() {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 정보를 가져옴

  const handleNavigation = (path) => {
    navigate(path);
  };

  // 현재 경로와 버튼 경로가 일치하면 활성화 클래스를 추가
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <header className="header">
      <h1 className="mainTitle">리뷰 템플릿 제작 서비스</h1>
      <nav className="navi">
        <button
          className={`naviTitle ${isActive("/")}`} // 현재 경로에 따라 'active' 클래스 추가
          onClick={() => handleNavigation("/")}
        >
          제품 등록
        </button>
        <button
          className={`naviTitle ${isActive("/FindPro")}`} // 현재 경로에 따라 'active' 클래스 추가
          onClick={() => handleNavigation("/FindPro")}
        >
          제품 찾기
        </button>
      </nav>
    </header>
  );
}

export default Navigator;
