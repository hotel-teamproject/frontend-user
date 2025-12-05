import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/search/HotelListCards.scss";

const HotelListCards = ({ hotels = [] }) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(new Set());

  const handleToggleWishlist = (e, hotelId) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(hotelId)) {
        newSet.delete(hotelId);
      } else {
        newSet.add(hotelId);
      }
      return newSet;
    });
    // 실제 구현 시에는 여기서 API 호출 또는 localStorage 저장
    // localStorage.setItem('wishlist', JSON.stringify(Array.from(newSet)));
  };

  if (!hotels || hotels.length === 0) {
    return (
      <div className="hotel-list-cards empty">호텔을 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className="hotel-list-cards">
      {hotels.map((hotel, i) => {
        const price = hotel.basePrice ?? hotel.price ?? 0;
        const isWishlisted = wishlist.has(hotel.id);

        return (
          <div
            key={i}
            className="hotel-card"
            onClick={() => navigate(`/hotels/${hotel.id}`)}
          >
            {/* ========== LEFT IMAGE (꽉 채우기) ========== */}
            <div className="hotel-image">
              <img src={hotel.image} alt={hotel.name} />
              <div className="image-count">{hotel.imageCount} images</div>
            </div>

            {/* ========== RIGHT CONTENT ========== */}
            <div className="hotel-content">

              {/* -------- TOP TEXT + PRICE -------- */}
              <div className="hotel-header">
                <div className="hotel-info">
                  <h3 className="hotel-name">{hotel.name}</h3>
                  <div className="hotel-location">{hotel.location}</div>

                  <div className="hotel-meta">
                    <span className="hotel-stars">
                      {"⭐".repeat(hotel.stars)} {hotel.stars} Star Hotel
                    </span>
                    <span className="hotel-amenities">
                      🏨 {hotel.amenities}+ Amenities
                    </span>
                  </div>

                  <div className="hotel-rating">
                    <span className="rating-score">{hotel.rating}</span>
                    <span className="rating-label">{hotel.ratingLabel}</span>
                    <span className="rating-reviews">
                      {hotel.reviews} reviews
                    </span>
                  </div>
                </div>

                <div className="hotel-price">
                  <div className="price-label">starting from</div>
                  <div className="price-amount">
                    ₩{Number(price).toLocaleString()}/night
                  </div>
                  <div className="price-note">excl. tax</div>
                </div>
              </div>

              {/* -------- BOTTOM BUTTONS -------- */}
              <div className="hotel-footer">
                <button
                  className={`wishlist-button ${isWishlisted ? "active" : ""}`}
                  onClick={(e) => handleToggleWishlist(e, hotel.id)}
                  title={isWishlisted ? "찜 해제" : "찜하기"}
                >
                  {isWishlisted ? "❤️" : "🤍"}
                </button>

                <button
                  className="view-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/hotels/${hotel.id}`);
                  }}
                >
                  View Place
                </button>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HotelListCards;
