import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

// map role -> trang tương ứng
const HOME_BY_ROLE = {
  CUSTOMER: "/customer",
  RECEPTIONIST: "/receptionist",
  WASHER: "/washer",
  ADMIN: "/admin",
};

export default function Login() {
  const [identifier, setIdentifier] = useState(""); // email hoặc SĐT
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await authService.login(identifier, password);
      navigate(HOME_BY_ROLE[data.role] || "/");
    } catch (err) {
      setError(
        err.response?.status === 401
          ? "Sai tài khoản hoặc mật khẩu"
          : "Đăng nhập thất bại, thử lại sau",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "80px auto",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h2>Đăng nhập AutoWash Pro</h2>

      <input
        placeholder="Email hoặc số điện thoại"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />

      {error && <p style={{ color: "red", fontSize: 14 }}>{error}</p>}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </div>
  );
}
