import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./components/layouts/MainLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import MyPageLayout from "./components/layouts/MyPageLayout";
import SearchLayout from "./components/layouts/SearchLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Booking
import BookingStepLayout from "./pages/booking/BookingStepLayout";
import BookingStepDates from "./pages/booking/BookingStepDates";
import BookingStepRoom from "./pages/booking/BookingStepRoom";
import BookingStepExtras from "./pages/booking/BookingStepExtras";
import BookingStepPayment from "./pages/booking/BookingStepPayment";
import BookingComplete from "./pages/booking/BookingComplete";

// Home / Search / Hotels
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/search/SearchPage";
import HotelListPage from "./pages/search/HotelListPage";
import HotelDetailPage from "./pages/hotel/HotelDetailPage";

// Auth
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import BusinessSignupForm from "./components/auth/BusinessSignupForm";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import KakaoCallbackPage from "./pages/auth/KakaoCallbackPage";
import GoogleCallbackPage from "./pages/auth/GoogleCallbackPage";
import AddPaymentPage from "./pages/payment/AddPaymentPage";

// Mypage
import MyAccountPage from "./pages/mypage/MyAccountPage";
import MyBookingsPage from "./pages/mypage/MyBookingsPage";
import MyBookingDetailPage from "./pages/mypage/MyBookingDetailPage";
import MyReviewsPage from "./pages/mypage/MyReviewsPage";
import WishlistPage from "./pages/mypage/WishlistPage";
import MyCouponsPage from "./pages/mypage/MyCouponsPage";
import MyPointsPage from "./pages/mypage/MyPointsPage";
import MyInquiriesPage from "./pages/mypage/MyInquiriesPage";

// Support
import FaqPage from "./pages/support/FaqPage";
import NoticeListPage from "./pages/support/NoticeListPage";
import NoticeDetailPage from "./pages/support/NoticeDetailPage";
import ContactPage from "./pages/support/ContactPage";

// 404
import NotFoundPage from "./pages/common/NotFoundPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* MAIN */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />

          {/* 호텔 리스트 */}
          <Route path="hotels">
            <Route index element={<HotelListPage />} />
            <Route path=":hotelId" element={<HotelDetailPage />} />
          </Route>
        </Route>

        {/* SEARCH */}
        <Route element={<SearchLayout />}>
          <Route path="search" element={<SearchPage />} />
        </Route>

        {/* BOOKING (로그인 필요) */}
        <Route
          path="booking/:hotelId"
          element={
            <ProtectedRoute>
              <BookingStepLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<BookingStepDates />} />
          <Route path="room" element={<BookingStepRoom />} />
          <Route path="extras" element={<BookingStepExtras />} />
          <Route path="payment" element={<BookingStepPayment />} />
          <Route path="complete" element={<BookingComplete />} />
        </Route>

        {/* SUPPORT */}
        <Route path="support">
          <Route index element={<FaqPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="notices" element={<NoticeListPage />} />
          <Route path="notices/:noticeId" element={<NoticeDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* MY PAGE (로그인 필요) */}
        <Route
          path="mypage"
          element={
            <ProtectedRoute>
              <MyPageLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MyAccountPage />} />
          <Route path="account" element={<MyAccountPage />} />
          <Route path="bookings">
            <Route index element={<MyBookingsPage />} />
            <Route path=":bookingId" element={<MyBookingDetailPage />} />
          </Route>

          <Route path="payment" element={<MyPaymentPage />} />
          <Route path="reviews" element={<MyReviewsPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="coupons" element={<MyCouponsPage />} />
          <Route path="points" element={<MyPointsPage />} />
          <Route path="inquiries" element={<MyInquiriesPage />} />
        </Route>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="signup/business" element={<BusinessSignupForm />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="add-payment" element={<AddPaymentPage />} />

          {/* Social */}
          <Route path="oauth/kakao/callback" element={<KakaoCallbackPage />} />
          <Route path="oauth/google/callback" element={<GoogleCallbackPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
