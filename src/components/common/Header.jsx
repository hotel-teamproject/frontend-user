import { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/components/common/Header.scss";

const Header = ({ user }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const isLoggedIn = !!user;

  return (
    <header className="header">
      {/* LEFT: 로고 + 메뉴 */}
      <div className="header-left">
        <Link to="/" className="logo">HotelHub</Link>

        <nav className="nav">
          <Link to="/search">호텔검색</Link>
          <Link to="/help">고객센터</Link>
        </nav>
      </div>

      {/* RIGHT: 로그인/회원가입 or 프로필 */}
      <div className="header-right">

        {/* ======================
            🔹 로그아웃 상태
        ====================== */}
        {!isLoggedIn && (
          <div className="auth-buttons">
            <Link to="/login" className="btn login-btn">로그인</Link>
            <Link to="/signup" className="btn signup-btn">회원가입</Link>
          </div>
        )}

        {/* ======================
            🔹 로그인 상태
        ====================== */}
        {isLoggedIn && (
          <div className="logged-in-area">

            {/* ❤️ 찜하기 */}
            <Link to="/wishlist" className="wish-btn">
              <i className="fa-regular fa-heart"></i>
              찜하기
            </Link>

            {/* 👤 프로필 */}
            <div
              className="profile-area"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div className="profile">
                <img
                  src={user.profileImg || "/default_profile.png"}
                  alt="profile"
                />
                <span className="nickname">{user.nickname}</span>
              </div>

              {/* ======================
                  🔽 드롭다운 메뉴
              ====================== */}
              {openMenu && (
                <div className="profile-menu">
                  {/* 상단 유저 정보 */}
                  <div className="user-info">
                    <img
                      src={user.profileImg || "/default_profile.png"}
                      alt="avatar"
                      className="avatar"
                    />
                    <div className="user-details">
                      <span className="username">{user.nickname}</span>
                      <span className="status">Online</span>
                    </div>
                  </div>

                  {/* 메뉴 항목 */}
                  <div className="menu-items">
                    <Link className="item" to="/mypage/account">계정</Link>
                    <Link className="item" to="/mypage/payment">결제내역</Link>
                    <Link className="item" to="/mypage/settings">설정</Link>

                    <div className="divider"></div>

                    <button className="item logout" onClick={() => console.log("logout")}>
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
