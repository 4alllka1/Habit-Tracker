import { Eye, EyeOff } from "lucide-react";
import Faint from "../components/Faint";
import { useState } from "react";

function validateData() {}

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      `userName: ${userName}\npassword: ${password}\nshowPassword: ${showPassword}`
    );
  };

  return (
    <div className="mt-14 flex items-center justify-center w-full">
      <div className="w-2xl flex flex-col items-center">
        <h4 className="mb-3">Трекер Привычек</h4>
        <Faint>Войдите в свой аккаунт</Faint>

        {/* Карточка */}
        <div className="mt-10 min-w-[70%] rounded-2xl shadow-[0px_0px_30px_rgba(144,_135,_139,_0.6)]">
          <form onSubmit={submit} className="mx-5 mt-5 rounded-t-2xl p-5">
            <p className="text-sm text-black/80 font-semibold mb-2">
              Имя пользователя
            </p>
            <input
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              placeholder="Введите ваше имя пользователя"
            />

            <p className="text-sm text-black/80 font-semibold mt-5 mb-2">
              Пароль
            </p>
            <div className="relative mb-8">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Введите ваш пароль"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
              >
                {!showPassword && <Eye />}
                {showPassword && <EyeOff />}
              </button>
            </div>

            <button
              type="submit"
              className="mt-3 p-[2px] rounded-2xl w-full bg-gradient-to-r from-primary-500 to-secondary-500 font-bold cursor-pointer"
            >
              <div className="w-full h-full px-4 py-3 bg-red-200 rounded-[calc(var(--radius-2xl)-2px)] bg-white">
                <div className="w-full text-lg bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Войти в аккаунт
                </div>
              </div>
            </button>
          </form>

          {/* Разделительная линия */}
          <div className="mx-5 flex justify-center">
            <div className="h-[1px] w-full bg-linear-to-r from-transparent via-gray-600/20 to-transparent"></div>
          </div>

          <div className="mx-5 mb-5 rounded-b-2xl p-5 flex flex-col items-center">
            <Faint className="text-md">
              Ещё нет аккаунта? - Создайте его бесплатно
            </Faint>
            <button className="mt-5 w-full px-4 py-3 text-lg border rounded-2xl bg-primary-400 cursor-pointer">
              Создать новый аккаунт
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
