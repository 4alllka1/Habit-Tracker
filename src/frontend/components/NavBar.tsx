import { ChartColumnStacked, Heart, Home, LogIn, User } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { API_URL } from "../api";
import { useAuthStore } from "../Store/authStore";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token, logout } = useAuthStore();

  async function checkIsLoggedIn() {
    const response = await fetch(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      setIsLoggedIn(true);
    }
  }
  useEffect(() => {
    checkIsLoggedIn();
  }, [localStorage.getItem("token")]);

  const baseLinkStyle =
    "px-4 py-3 rounded-xl flex gap-2 items-center justify-center transition duration-500";
  const activeLinkStyles = "bg-white text-primary-600 font-bold";
  const inactiveLinkStyles =
    "bg-transparent text-white/90 font-semibold hover:bg-white/25";

  const getNavLinkStyles = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? `${baseLinkStyle} ${activeLinkStyles}`
      : `${baseLinkStyle} ${inactiveLinkStyles}`;
  };
  return (
    <nav className="top-0 w-full h-16 bg-gradient-to-r to-primary-500 from-secondary-500 flex px-2">
      <div className="container mx-auto h-full flex items-center justify-center">
        {/* Логотип */}
        <NavLink to="/" className="flex items-center h-full gap-3">
          <div className="h-10 w-10 border border-2 border-white rounded-xl flex items-center justify-center bg-gradient-to-br from-primary-300 to-secondary-500 text-2xl font-bold text-white/90">
            Т
          </div>
          <div className="text-white text-xl font-bold hidden md:block">
            Трекер привычек
          </div>
        </NavLink>
      </div>

      <div className="container flex items-center justify-center gap-3">
        <NavLink to="/" className={getNavLinkStyles}>
          <Home size={20} />
          Главная
        </NavLink>
        <NavLink className={getNavLinkStyles} to="/habits">
          <ChartColumnStacked size={20} />
          Привычки
        </NavLink>
        <NavLink className={getNavLinkStyles} to="/health">
          <Heart />
          Здоровье
        </NavLink>
      </div>

      {!token && (
        <div className="container flex items-center justify-center">
          <NavLink
            to="/login"
            className="group py-3 px-5 rounded-xl border border-white/40 bg-white font-bold text-white bg-white/20 hover:bg-white/30 flex items-center justify-center gap-2 translate-all duration-400"
          >
            Войти
            <LogIn
              className="group-hover:translate-x-0.5 translate-all duration-300"
              size={20}
            />
          </NavLink>
        </div>
      )}

      {token && (
        <div className="container flex items-center justify-center">
          <NavLink
            to="/profile"
            className="group py-3 px-5 rounded-xl border border-white/40 bg-white font-bold text-white bg-white/20 hover:bg-white/30 flex items-center justify-center gap-2 translate-all duration-400"
          >
            Профиль
            <User className="" size={20} />
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
