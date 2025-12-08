import React from "react";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import BookingSummaryCard from "./BookingSummaryCard";
import { mockHotelDetail } from "../../api/mockHotelDetail";
import { mockHotelRooms } from "../../api/mockHotelRooms";
import "../../styles/pages/booking/BookingStep.scss";

const BookingComplete = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const location = useLocation();
  const qs = new URLSearchParams(location.search);
  const paid = qs.get("paid") === "true";

  const checkIn = qs.get("checkIn");
  const checkOut = qs.get("checkOut");
  const guests = qs.get("guests") || "2";
  const roomId = qs.get("roomId") || mockHotelRooms[0].id;
  const extras = qs.get("extras")?.split(",").filter(Boolean) || [];

  const room = mockHotelRooms.find((r) => r.id === roomId) || mockHotelRooms[0];
  const nights = (() => {
    if (!checkIn || !checkOut) return 1;
    const diff =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24);
    return Number.isNaN(diff) || diff <= 0 ? 1 : diff;
  })();

  return (
    <div className="booking-page inner">
      <h2 className="booking-title">예약이 완료되었습니다 🎉</h2>

      <div className="booking-grid">
        <div className="booking-left">
          <div className="complete-card">
            <p>
              {paid
                ? "결제가 정상적으로 처리되었습니다."
                : "예시 화면입니다. 결제가 완료되었다고 가정합니다."}
            </p>
            <div className="complete-actions">
              <button className="btn-primary" onClick={() => navigate("/")}>
                홈으로 가기
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate(`/booking/${hotelId}`)}
              >
                다시 예약
              </button>
              <Link className="btn-secondary" to="/mypage/bookings">
                내 예약 보기
              </Link>
            </div>
          </div>

          <div className="booking-section">
            <h3 className="section-title">예약 정보 확인</h3>
            <ul className="info-list">
              <li>예약 내역은 마이페이지 &gt; 내 예약에서 확인할 수 있습니다.</li>
              <li>변경/취소는 체크인 24시간 전까지 가능합니다.</li>
              <li>현장 체크인 시 신분증 또는 여권이 필요합니다.</li>
            </ul>
          </div>

          <div className="booking-section">
            <h3 className="section-title">고객센터 & 문의</h3>
            <ul className="info-list">
              <li>예약 관련 문의: support@example.com</li>
              <li>현지 긴급 연락처는 체크인 전날 이메일로 발송됩니다.</li>
              <li>특별 요청(침대 타입/층수)은 호텔 가용성에 따라 반영됩니다.</li>
            </ul>
          </div>
        </div>

        <aside className="booking-right">
          <BookingSummaryCard
            hotel={mockHotelDetail}
            roomName={room.name}
            nights={nights}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            extras={extras}
            roomPrice={room.price}
          />
        </aside>
      </div>
    </div>
  );
};

export default BookingComplete;