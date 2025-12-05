import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/wishlist/WishlistEmpty.scss";

const WishlistEmpty = () => {
  const navigate = useNavigate();

  return (
    <div className="wishlist-empty">
      <div className="wishlist-empty__icon">💔</div>
      <h2 className="wishlist-empty__title">찜한 호텔이 없습니다</h2>
      <p className="wishlist-empty__description">
        마음에 드는 호텔을 찜하고 나중에 다시 확인해보세요!
      </p>
      <button
        className="wishlist-empty__button"
        onClick={() => navigate("/hotels")}
      >
        호텔 둘러보기
      </button>
    </div>
  );
};

export default WishlistEmpty;

