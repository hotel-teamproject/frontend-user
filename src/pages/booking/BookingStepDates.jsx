import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../../styles/pages/booking/BookingStep.scss";
import { mockHotelDetail } from "../../api/mockHotelDetail";
import BookingSummaryCard from "./BookingSummaryCard";

const BookingStepDates = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const location = useLocation();

  const qs = new URLSearchParams(location.search);
  const initialCheckIn = qs.get("checkIn") ? new Date(qs.get("checkIn")) : null;
  const initialCheckOut = qs.get("checkOut") ? new Date(qs.get("checkOut")) : null;
  const initialGuests = qs.get("guests") ? Number(qs.get("guests")) : 2;

  const formatDateInput = (d) => (d ? d.toISOString().slice(0, 10) : "");

  const [checkIn, setCheckIn] = useState(formatDateInput(initialCheckIn));
  const [checkOut, setCheckOut] = useState(formatDateInput(initialCheckOut));
  const [guests, setGuests] = useState(initialGuests);

  useEffect(() => {
    if (checkIn && checkOut && new Date(checkOut) <= new Date(checkIn)) {
      setCheckOut("");
    }
  }, [checkIn, checkOut]);

  const handleNext = () => {
    if (!checkIn || !checkOut) {
      alert("체크인/체크아웃 날짜를 선택해 주세요.");
      return;
    }

    const params = new URLSearchParams();
    params.set("checkIn", new Date(checkIn).toISOString());
    params.set("checkOut", new Date(checkOut).toISOString());
    params.set("guests", String(guests));

    navigate(`/booking/${hotelId}/room?${params.toString()}`);
  };

  const hotel = mockHotelDetail;

  const nights = (() => {
    if (!checkIn || !checkOut) return 1;
    const diff =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24);
    return Number.isNaN(diff) || diff <= 0 ? 1 : diff;
  })();

  return (
    <div className="booking-page inner">
      <h2 className="booking-title">예약 - 날짜 선택</h2>

      <div className="booking-grid">
        
        {/* =========================
            LEFT FORM
        ========================= */}
        <div className="booking-left">
          <div className="booking-panel">
            <label>
              체크인
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </label>

            <label>
              체크아웃
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </label>

            <label>
              인원수
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}명
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="booking-buttons">
            <button className="btn-secondary" onClick={() => navigate(-1)}>
              취소
            </button>
            <button className="btn-primary" onClick={handleNext}>
              다음 단계
            </button>
          </div>

          <div className="bottom-group">
            <div className="booking-section">
              <h3 className="section-title">안내 및 취소 정책</h3>
              <ul className="info-list">
                <li>체크인 24시간 전까지 무료 취소 가능합니다.</li>
                <li>체크인 시간: 15:00 이후 / 체크아웃 시간: 11:00 이전</li>
                <li>정부 신분증 또는 여권을 지참해 주세요.</li>
              </ul>
              <p className="muted">현장 정책은 호텔 사정에 따라 달라질 수 있습니다.</p>
            </div>

            <div className="booking-section">
              <h3 className="section-title">도움이 필요하세요?</h3>
              <ul className="info-list">
                <li>여러 날짜를 비교하려면 달력 아이콘으로 다시 선택해 주세요.</li>
                <li>인원이 다른 경우, 객실 단계에서 추가 옵션을 선택할 수 있습니다.</li>
                <li>추가 문의: support@example.com</li>
              </ul>
            </div>
          </div>
        </div>

        {/* =========================
            RIGHT HOTEL SUMMARY (1개만)
        ========================= */}
        <aside className="booking-right">
          <BookingSummaryCard
            hotel={hotel}
            roomName="객실 선택 전"
            nights={nights}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            extras={[]}
            roomPrice={0}
          />
          <button className="btn-primary summary-action" onClick={handleNext}>
            객실 선택으로 이동
          </button>
        </aside>

      </div>
    </div>
  );
};

export default BookingStepDates;
