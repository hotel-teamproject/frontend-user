import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { mockHotelRooms } from "../../api/mockHotelRooms";
import { mockHotelDetail } from "../../api/mockHotelDetail";
import BookingSummaryCard from "./BookingSummaryCard";
import { extrasOptions } from "./extrasOptions";
import "../../styles/pages/booking/BookingStep.scss";

const BookingStepExtras = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const location = useLocation();

  const qs = new URLSearchParams(location.search);
  const checkIn = qs.get("checkIn");
  const checkOut = qs.get("checkOut");
  const guests = qs.get("guests") || "2";
  const roomId = qs.get("roomId") || mockHotelRooms[0].id;
  const selectedExtras = qs.get("extras")?.split(",").filter(Boolean) || [];

  const [extras, setExtras] = useState(new Set(selectedExtras));

  const toggleExtra = (id) => {
    setExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const room = mockHotelRooms.find((r) => r.id === roomId) || mockHotelRooms[0];
  const hotel = mockHotelDetail;

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return Number.isNaN(diff) || diff <= 0 ? 1 : diff;
  }, [checkIn, checkOut]);

  const extrasTotal = useMemo(() => {
    return extrasOptions
      .filter((opt) => extras.has(opt.id))
      .reduce((sum, opt) => sum + opt.price, 0);
  }, [extras]);

  const roomTotal = room.price * nights;
  const total = roomTotal + extrasTotal;

  const handleNext = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", guests);
    params.set("roomId", room.id);
    if (extras.size > 0) params.set("extras", Array.from(extras).join(","));
    navigate(`/booking/${hotelId}/payment?${params.toString()}`);
  };

  return (
    <div className="booking-page inner">
      <h2 className="booking-title">옵션 선택</h2>

      <div className="booking-grid">
        {/* LEFT: extras list */}
        <div className="booking-left">
          <div className="extras-list booking-panel">
            {extrasOptions.map((opt) => (
              <label key={opt.id} className="extra-item">
                <input
                  type="checkbox"
                  checked={extras.has(opt.id)}
                  onChange={() => toggleExtra(opt.id)}
                />
                <div className="extra-body">
                  <div className="extra-title">{opt.label}</div>
                  <div className="extra-price">
                    +₩{opt.price.toLocaleString()} / 1회
                  </div>
                </div>
              </label>
            ))}
          </div>

          <div className="booking-buttons">
            <button className="btn-secondary" onClick={() => navigate(-1)}>
              이전 단계
            </button>
            <button className="btn-primary" onClick={handleNext}>
              결제 단계
            </button>
          </div>

          <div className="bottom-group">
            <div className="booking-section">
              <h3 className="section-title">추천 옵션 & 혜택</h3>
              <ul className="info-list">
                <li>조식 포함 시 체크아웃 연장(최대 1시간) 요청 가능</li>
                <li>공항 픽업은 항공편 정보 입력 시 대기시간 단축</li>
                <li>레이트 체크아웃은 가용 객실에 따라 조정됩니다</li>
              </ul>
            </div>

            <div className="booking-section">
              <h3 className="section-title">유의사항</h3>
              <ul className="info-list">
                <li>옵션 금액은 총액에 즉시 반영됩니다.</li>
                <li>현장 결제 불가 옵션은 온라인 결제만 제공됩니다.</li>
                <li>변경/취소는 체크인 24시간 전까지 가능합니다.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT: summary */}
        <aside className="booking-right">
          <BookingSummaryCard
            hotel={hotel}
            roomName={room.name}
            nights={nights}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            extras={Array.from(extras)}
            roomPrice={room.price}
          />
          <button className="btn-primary summary-action" onClick={handleNext}>
            결제 단계로 이동
          </button>
        </aside>
      </div>
    </div>
  );
};

export default BookingStepExtras;