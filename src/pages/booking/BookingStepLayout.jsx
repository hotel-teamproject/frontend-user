import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import StepNavigation from "./StepNavigation";
import "../../styles/pages/booking/BookingStepLayout.scss";
import FloatingNav from "../../components/common/FloatingNav";
import { Outlet } from "react-router-dom";

const BookingStepLayout = () => {
  return (
    <>
      <Header />

      <div className="booking-layout">
        <StepNavigation />

        <div className="booking-content">
          <Outlet />
        </div>
      </div>

      <Footer />
      <FloatingNav />
    </>
  );
};

export default BookingStepLayout;
