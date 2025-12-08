import { useLocation } from "react-router-dom";
import "../../styles/pages/booking/StepNavigation.scss";

const StepNavigation = () => {
  const { pathname } = useLocation();

  const steps = [
    { label: "날짜 선택", key: "dates" },
    { label: "객실 선택", key: "room" },
    { label: "옵션 선택", key: "extras" },
    { label: "결제", key: "payment" },
    { label: "완료", key: "complete" },
  ];

  const activeIndex = (() => {
    if (pathname.includes("/complete")) return 4;
    if (pathname.includes("/payment")) return 3;
    if (pathname.includes("/extras")) return 2;
    if (pathname.includes("/room")) return 1;
    return 0;
  })();

  return (
    <div className="step-nav">
      {steps.map((step, idx) => {
        const status =
          idx === activeIndex ? "active" : idx < activeIndex ? "done" : "";
        return (
          <div className={`step-item ${status}`} key={step.key}>
            <div className="step-number">{idx + 1}</div>
            <span>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default StepNavigation;
