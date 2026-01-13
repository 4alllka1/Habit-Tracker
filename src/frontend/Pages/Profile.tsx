import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const Logout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div>
      <span>Profile</span>
      <button className="px-4 py-2 border rounded-xl" onClick={Logout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
