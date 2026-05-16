import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";

function OtpVerifyPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("otpToken");
      const res = await authAPI.verifyOtp({ token, otp });

      login(res.data.token, res.data.user);
      localStorage.removeItem("otpToken");
      navigate("/home");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="otp"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <br />
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default OtpVerifyPage;
