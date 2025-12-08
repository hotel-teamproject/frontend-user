import React from "react";
import { extrasOptions } from "./extrasOptions";

const BookingSummaryCard = ({
  hotel,
  roomName,
  nights,
  checkIn,
  checkOut,
  guests,
  extras = [],
  roomPrice = 0,
}) => {
  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString() : "-";

  const extrasLabels = extrasOptions
    .filter((o) => extras.includes(o.id))
    .map((o) => o.label);

  const extrasTotal = extrasOptions
    .filter((o) => extras.includes(o.id))
    .reduce((sum, o) => sum + o.price, 0);

  const roomTotal = roomPrice * Math.max(nights, 1);
  const total = roomTotal + extrasTotal;

  return (
    <div className="booking-summary-card">
      <div className="summary-image">
        <img src={hotel.images[0]} alt={hotel.name} />
      </div>

      <div className="summary-body">
        <h3 className="summary-title">{hotel.name}</h3>
        <p className="summary-location">
          {hotel.city} • {hotel.location}
        </p>
        <div className="summary-rating">
          {hotel.ratingAverage} • {hotel.ratingCount} reviews
        </div>
      </div>

      <div className="summary-details">
        <div>
          <strong>객실</strong>
          <p>{roomName || "선택된 객실 없음"}</p>
        </div>
        <div>
          <strong>숙박일</strong>
          <p>{nights}박</p>
        </div>
        <div>
          <strong>체크인/아웃</strong>
          <p>
            {formatDate(checkIn)} ~ {formatDate(checkOut)}
          </p>
        </div>
        <div>
          <strong>인원</strong>
          <p>{guests}명</p>
        </div>
        <div>
          <strong>옵션</strong>
          <p>{extrasLabels.length ? extrasLabels.join(", ") : "선택 없음"}</p>
        </div>
      </div>

      <div className="summary-price-box">
        <div className="row">
          <span>객실 ({Math.max(nights, 1)}박)</span>
          <strong>₩{roomTotal.toLocaleString()}</strong>
        </div>
        <div className="row">
          <span>옵션</span>
          <strong>₩{extrasTotal.toLocaleString()}</strong>
        </div>
        <div className="row total">
          <span>예상 결제 금액</span>
          <strong>₩{total.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  );
};

export default BookingSummaryCard;

