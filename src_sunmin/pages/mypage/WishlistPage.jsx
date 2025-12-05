import React, { useState, useEffect } from "react";
import WishlistCard from "../../components/wishlist/WishlistCard";
import WishlistEmpty from "../../components/wishlist/WishlistEmpty";
import "../../styles/pages/mypage/WishlistPage.scss";

const WishlistPage = () => {
  const [wishlistHotels, setWishlistHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock 데이터 - 실제로는 API에서 가져와야 합니다
  useEffect(() => {
    // 임시로 로컬 스토리지에서 가져오거나 Mock 데이터 사용
    const loadWishlist = () => {
      // Mock 데이터 예시
      const mockWishlist = [
        {
          id: 1,
          name: "Grand Hyatt Seoul",
          location: "Seoul, South Korea",
          image: "/images/hotel-1.jpg",
          imageCount: 8,
          stars: 5,
          amenities: 25,
          rating: 9.2,
          ratingLabel: "Excellent",
          reviews: 1234,
          basePrice: 250000,
        },
        {
          id: 2,
          name: "Paradise City",
          location: "Incheon, South Korea",
          image: "/images/hotel-2.jpg",
          imageCount: 12,
          stars: 5,
          amenities: 30,
          rating: 8.9,
          ratingLabel: "Very Good",
          reviews: 856,
          basePrice: 320000,
        },
        {
          id: 3,
          name: "The Shilla Seoul",
          location: "Seoul, South Korea",
          image: "/images/hotel-3.png",
          imageCount: 10,
          stars: 5,
          amenities: 28,
          rating: 9.5,
          ratingLabel: "Exceptional",
          reviews: 2103,
          basePrice: 450000,
        },
      ];

      // 실제 구현시에는 localStorage나 API에서 가져옴
      // const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      setWishlistHotels(mockWishlist);
      setLoading(false);
    };

    loadWishlist();
  }, []);

  const handleRemoveWishlist = (hotelId) => {
    // 찜 목록에서 제거
    setWishlistHotels((prev) => prev.filter((hotel) => hotel.id !== hotelId));
    
    // 실제 구현시에는 API 호출 및 localStorage 업데이트
    // localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  if (loading) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-page__loading">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-page__header">
        <h1 className="wishlist-page__title">내 찜 목록</h1>
        <p className="wishlist-page__subtitle">
          찜한 호텔 {wishlistHotels.length}개
        </p>
      </div>

      <div className="wishlist-page__content">
        {wishlistHotels.length === 0 ? (
          <WishlistEmpty />
        ) : (
          <div className="wishlist-page__list">
            {wishlistHotels.map((hotel) => (
              <WishlistCard
                key={hotel.id}
                hotel={hotel}
                onRemove={handleRemoveWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;