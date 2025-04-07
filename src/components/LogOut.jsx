import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // 1. Logout APIga so'rov yuborish
        await fetch("https://library-project-6agw.onrender.com/logout", {
          method: "POST",
          credentials: "include",
        });

        // 2. LocalStorage'dan tokenlarni o'chirish
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // 3. Login sahifasiga yo'naltirish
        navigate("/login");
      } catch (error) {
        console.error("Logout error:", error);
        // Agar xato bo'lsa ham, tokenlarni o'chirib login sahifasiga o'tkazish
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Logging out...</p>
    </div>
  );
}
