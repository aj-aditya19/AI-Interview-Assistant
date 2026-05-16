import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../utils/api";
import "../styles/OtpVerify.css";

function OtpVerifyPage() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(
    () => sessionStorage.getItem("pendingEmail") || "",
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required for OTP verification");
      return;
    }

    try {
      setError("");
      const res = await authAPI.verifyOtp({ email, otp });

      login(res.data.token, res.data.user);
      sessionStorage.removeItem("pendingEmail");
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-card">
        <h2>OTP Verification</h2>
        <p>Enter the OTP sent to your email.</p>

        <form className="otp-form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          {error && <p className="otp-error">{error}</p>}

          <button type="submit">Verify OTP</button>
        </form>
      </div>
    </div>
  );
}

export default OtpVerifyPage;
