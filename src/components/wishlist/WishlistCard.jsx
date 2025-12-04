import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/wishlist/WishlistCard.scss";

const WishlistCard = ({ hotel, onRemove }) => {
  const navigate = useNavigate();

  if (!hotel) return null;

  const price = hotel.basePrice ?? hotel.price ?? 0;

  const handleRemoveWishlist = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(hotel.id);
    }
  };

  return (
    <div
      className="wishlist-card"
      onClick={() => navigate(`/hotels/${hotel.id}`)}
    >
      {/* 왼쪽 이미지 */}
      <div className="wishlist-card__image">
        <img src={hotel.image} alt={hotel.name} />
        {hotel.imageCount && (
          <div className="image-count">{hotel.imageCount} images</div>
        )}
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className="wishlist-card__content">
        {/* 상단: 정보 + 가격 */}
        <div className="wishlist-card__header">
          <div className="wishlist-card__info">
            <h3 className="hotel-name">{hotel.name}</h3>
            <div className="hotel-location">📍 {hotel.location}</div>

            <div className="hotel-meta">
              {hotel.stars && (
                <span className="hotel-stars">
                  {"⭐".repeat(hotel.stars)} {hotel.stars} Star Hotel
                </span>
              )}
              {hotel.amenities && (
                <span className="hotel-amenities">
                  🏨 {hotel.amenities}+ Amenities
                </span>
              )}
            </div>

            {hotel.rating && (
              <div className="hotel-rating">
                <span className="rating-score">{hotel.rating}</span>
                <span className="rating-label">{hotel.ratingLabel || "Very Good"}</span>
                {hotel.reviews && (
                  <span className="rating-reviews">{hotel.reviews} reviews</span>
                )}
              </div>
            )}
          </div>

          <div className="wishlist-card__price">
            <div className="price-label">starting from</div>
            <div className="price-amount">
              ₩{Number(price).toLocaleString()}/night
            </div>
            <div className="price-note">excl. tax</div>
          </div>
        </div>

        {/* 하단: 버튼 */}
        <div className="wishlist-card__footer">
          <button
            className="remove-wishlist-button"
            onClick={handleRemoveWishlist}
          >
            💔 Remove
          </button>

          <button
            className="view-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/hotels/${hotel.id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;

