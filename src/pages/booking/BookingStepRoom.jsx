import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { mockHotelRooms } from "../../api/mockHotelRooms";
import { mockHotelDetail } from "../../api/mockHotelDetail";
import BookingSummaryCard from "./BookingSummaryCard";
import { extrasOptions } from "./extrasOptions";
import "../../styles/pages/booking/BookingStep.scss";

const BookingStepRoom = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const location = useLocation();

  const qs = new URLSearchParams(location.search);
  const checkIn = qs.get("checkIn");
  const checkOut = qs.get("checkOut");
  const guests = qs.get("guests") || "2";
  const initialRoomId = qs.get("roomId");
  const extrasFromQs = qs.get("extras")?.split(",").filter(Boolean) || [];

  const [selectedRoom, setSelectedRoom] = useState(
    initialRoomId || mockHotelRooms[0].id
  );

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = (end - start) / (1000 * 60 * 60 * 24);
    return Number.isNaN(diff) || diff <= 0 ? 1 : diff;
  }, [checkIn, checkOut]);

  const handleNext = () => {
    const params = new URLSearchParams();
    if (checkIn) params.set("checkIn", checkIn);
    if (checkOut) params.set("checkOut", checkOut);
    params.set("guests", guests);
    params.set("roomId", selectedRoom);
    if (extrasFromQs.length > 0) {
      params.set("extras", extrasFromQs.join(","));
    }
    navigate(`/booking/${hotelId}/extras?${params.toString()}`);
  };

  const hotel = mockHotelDetail;

  return (
    <div className="booking-page inner">
      <h2 className="booking-title">객실 선택</h2>

      <div className="booking-grid">
        {/* LEFT: Room list */}
        <div className="booking-left">
          <div className="room-list">
            {mockHotelRooms.map((room) => {
              const active = selectedRoom === room.id;
              return (
                <div
                  key={room.id}
                  className={`room-card ${active ? "active" : ""}`}
                  onClick={() => setSelectedRoom(room.id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="room-image">
                    <img src={room.images[0]} alt={room.name} />
                  </div>
                  <div className="room-body">
                    <div className="room-title">
                      <h3>{room.name}</h3>
                      <span className="room-type">{room.type}</span>
                    </div>
                    <div className="room-price">
                      ₩{room.price.toLocaleString()} <span>/night</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="booking-buttons">
            <button className="btn-secondary" onClick={() => navigate(-1)}>
              이전 단계
            </button>
            <button className="btn-primary" onClick={handleNext}>
              옵션 선택
            </button>
          </div>
        </div>

        {/* RIGHT: summary */}
        <aside className="booking-right">
          <BookingSummaryCard
            hotel={hotel}
            roomName={
              mockHotelRooms.find((r) => r.id === selectedRoom)?.name || "-"
            }
            nights={nights}
            checkIn={checkIn}
            checkOut={checkOut}
            guests={guests}
            extras={extrasFromQs}
            roomPrice={
              mockHotelRooms.find((r) => r.id === selectedRoom)?.price || 0
            }
          />
          <button className="btn-primary summary-action" onClick={handleNext}>
            옵션 선택으로 이동
          </button>
        </aside>
      </div>
    </div>
  );
};

export default BookingStepRoom;