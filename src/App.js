import { useEffect, useRef, useState } from "react";
import "./App.css"

;const correctOTP = "1234";

export default function App() {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [isComplete, setIsComplete] = useState(false); // New state to track completion
  const [displayInfo, setDisplayInfo] = useState(null);
  const otpBoxReference = useRef([]);

  function handleChange(value, index) {
    console.log({ index });
    let newArr = [...otp];
    newArr[index] = value;

    setOtp(newArr);

    // Check for completeness only after all inputs are potentially filled
    if (index === 3 && value) {
      console.log({ value });
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }

    if (value && index < 4 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < 4 - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  useEffect(() => {
    const enteredOTP = otp.join("");
    console.log({ enteredOTP });
    if (enteredOTP.length === 4) {
      if (enteredOTP === correctOTP && isComplete) {
        setDisplayInfo("✅ Correct OTP!");
      } else {
        setDisplayInfo("❌ Wrong OTP!"); // Clear error message if not complete or incorrect
      }
    } else {
      setDisplayInfo(null);
    }
  }, [otp, isComplete, correctOTP]);

  return (
    <div className="container">
      <b> OTP received on your phone: {correctOTP} </b>
      <p className="text-base text-white mt-6 mb-4">
        One Time Password (OTP) to validate:
      </p>

      <div className="box-wrapper">
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className="inputBox"
          />
        ))}
      </div>

      <p
        className={`text-lg text-white mt-4 ${displayInfo ? "error-show" : ""}`}
      >
        {displayInfo}
      </p>
    </div>
  );
}
