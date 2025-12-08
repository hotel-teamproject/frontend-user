import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { mockHotelRooms } from "../../api/mockHotelRooms";
import { mockHotelDetail } from "../../api/mockHotelDetail";
import BookingSummaryCard from "./BookingSummaryCard";
import { extrasOptions } from "./extrasOptions";
import "../../styles/pages/booking/BookingStep.scss";

const BookingStepPayment = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const location = useLocation();

  const qs = new URLSearchParams(location.search);
  const checkIn = qs.get("checkIn");
  const checkOut = qs.get("checkOut");
  const guests = qs.get("guests") || "2";
  const roomId = qs.get("roomId") || mockHotelRooms[0].id;
  const extras = qs.get("extras")?.split(",").filter(Boolean) || [];

  const room = mockHotelRooms.find((r) => r.id === roomId) || mockHotelRooms[0];

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return Number.isNaN(diff) || diff <= 0 ? 1 : diff;
  }, [checkIn, checkOut]);

  const extrasTotal = useMemo(() => {
    return extrasOptions
      .filter((opt) => extras.includes(opt.id))
      .reduce((sum, opt) => sum + opt.price, 0);
  }, [extras]);

  const roomTotal = room.price * nights;
  const total = roomTotal + extrasTotal;

  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePay = () => {
    if (!form.name || !form.cardNumber || !form.expiry || !form.cvc) {
      alert("결제 정보를 모두 입력해주세요.");
      return;
    }
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", guests);
    params.set("roomId", room.id);
    if (extras.length > 0) params.set("extras", extras.join(","));
    params.set("paid", "true");
    navigate(`/booking/${hotelId}/complete?${params.toString()}`);
  };

  return (
    <div className="booking-page inner">
      <h2 className="booking-title">결제</h2>

      <div className="booking-grid">
        {/* LEFT: payment form */}
        <div className="booking-left">
          <div className="booking-section">
            <h3 className="section-title">결제 방법</h3>
            <div className="payment-options">
              <label className="payment-option">
                <input type="radio" name="payType" defaultChecked />
                전체 결제 후 예약 확정
              </label>
              <label className="payment-option">
                <input type="radio" name="payType" />
                부분 결제, 나머지 결제
              </label>
            </div>

            <h3 className="section-title" style={{ marginTop: 12 }}>
              카드 정보
            </h3>
            <div className="card-list-box">카드를 추가해 주세요</div>

            <div className="payment-form-grid" style={{ marginTop: 12 }}>
              <input
                className="full"
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
              />
              <input
                type="text"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
              />
              <input
                type="password"
                name="cvc"
                value={form.cvc}
                onChange={handleChange}
                placeholder="CVC"
              />
              <input
                className="full"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Cardholder Name"
              />
            </div>
          </div>

          <div className="booking-buttons">
            <button className="btn-secondary" onClick={() => navigate(-1)}>
              이전 단계
            </button>
            <button className="btn-primary" onClick={handlePay}>
              결제하기
            </button>
          </div>
        </div>

        {/* RIGHT: summary */}
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
          <button className="btn-primary summary-action" onClick={handlePay}>
            결제하기
          </button>
        </aside>
      </div>
    </div>
  );
};

export default BookingStepPayment;