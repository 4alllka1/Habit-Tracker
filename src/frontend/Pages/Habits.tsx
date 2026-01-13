import { Plus, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import { API_URL } from "../api";

interface Habit {
  id?: number;
  name: string;
  description?: string;
  frequency?: string;
  category?: string;
}

type Frequency = "daily" | "weekly" | "monthly";

const FrequencyTranslation: Record<Frequency, string> = {
  // TODO: добавить перевод
  daily: "Ежедневно",
  weekly: "Еженедельно",
  monthly: "Ежемесячно",
};

const defaultHabit = {
  name: "",
  description: "",
  frequency: "daily",
  category: "",
};

function Habits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState<Habit>(defaultHabit);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHabits = async () => {
      if (!token) {
        console.log("Нет токена");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }

        const data = await response.json();

        console.log(data);

        setHabits(data.habits || []);
      } catch (err: any) {
        console.log("Error: ", err.message);
      }
    };

    fetchHabits();
  }, [token]);

  const handleCreateHabit = async (habitToAdd: Habit) => {
    setIsLoading(true);
    try {
      if (newHabit.name.trim() == "") {
        setError("Введите имя для привычки!");
        setIsLoading(false);
        return;
      }

      console.log(newHabit);
      const response = await fetch(`${API_URL}/api/users/habits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newHabit),
      });

      setIsLoading(false);

      if (!response.ok) {
        // setError
        const errData = await response.json();
        throw new Error(errData.detail || "Ошибка создания");
      }

      const data = await response.json();
      setHabits((prevHabits) => [...prevHabits, data]);
      setNewHabit(defaultHabit);

      setIsModalOpen(false);
      setError(null);
    } catch (err: any) {
      // setError
      console.log("Error: ", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteHabit = async (habitToDelete: Habit) => {
    try {
      console.log(habitToDelete);
      const response = await fetch(
        `${API_URL}/api/users/habits/${habitToDelete.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(habitToDelete),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Ошибка удаления");
      }

      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit !== habitToDelete)
      );
    } catch (err: any) {
      console.log("Error: ", err.message);
    }
  };

  useEffect(() => {
    console.log("Текущее состояние habits:", habits);
  }, [habits]);

  // Перевод для частоты (frequency)
  function getTranslation(freq: string): string {
    if (freq in FrequencyTranslation) {
      return FrequencyTranslation[freq as Frequency];
    }
    return freq;
  }

  return (
    <div>
      <h2 className="relative group select-none mb-20 mt-10 ml-10">
        <span className="relative">
          <span className="relative z-10">Мои привычки</span>
          <div className="absolute bottom-1 left-0 w-full h-4 -rotate-1 z-0 bg-linear-to-r from-primary-300 to-secondary-300 opacity-60 group-hover:opacity-100 group-hover:bg-linear-to-l transition-all duration-500"></div>
        </span>
      </h2>
      <div className="flex gap-6 w-full">
        <button
          className="fixed bottom-6 right-6 p-3 border border-primary-400 text-primary-400 font-semibold lg:text-lg rounded-full md:rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="flex justify-center items-center gap-2 pl-1">
            <p className="hidden md:block">Добавить привычку</p>
            <Plus />
          </span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="max-w-lg shadow-xl w-full bg-white p-12 rounded-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateHabit(newHabit);
              }}
              className="flex flex-col"
            >
              <h4 className="mb-6">Новая привычка</h4>

              <div className="mb-4">
                <label className="font-semibold">
                  Название<span className="text-neutral-500 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  value={newHabit.name}
                  onChange={(e) => {
                    setNewHabit({ ...newHabit, name: e.target.value });
                    setError(null);
                  }}
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <span className="font-semibold">Описание</span>
                <input
                  type="text"
                  value={newHabit.description}
                  onChange={(e) =>
                    setNewHabit({ ...newHabit, description: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div className="mb-4">
                <span className="font-semibold">Частота</span>
                <select
                  className="block border border-neutral-300 rounded-lg p-3 w-full outline-none"
                  onChange={(e) => (newHabit.frequency = e.target.value)}
                >
                  <option value="daily">Ежедневно</option>
                  <option value="every_other_day">Через день</option>
                  <option value="weekly">Еженедельно</option>
                  <option value="weekdays">По будням</option>
                  <option value="weekends">По выходным</option>
                  <option value="monthly">Раз в месяц</option>
                </select>
              </div>

              {/* TODO: Сделать select с созданием новой категории */}
              <div className="mb-6">
                <span className="font-semibold">Категория</span>
                <input
                  onChange={(e) =>
                    setNewHabit({ ...newHabit, category: e.target.value })
                  }
                />
              </div>

              {error?.trim() && (
                <div className="text-error-500 mb-5">{error}</div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-3 rounded border"
                >
                  Отмена
                </button>

                <button
                  type="submit"
                  className={`px-5 py-3 rounded bg-primary-500  ${
                    isLoading ? "text-white/80" : "text-white"
                  }`}
                >
                  {isLoading ? "Создание..." : "Создать"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="w-full flex justify-center px-6">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {habits.map((item, index) => (
            <div key={index} className="p-6 border rounded-xl">
              <div className="flex justify-between items-center">
                <h4>{item.name}</h4>
                <Trash
                  onClick={() => handleDeleteHabit(item)}
                  size={30}
                  className="text-red-500"
                />
              </div>
              <div className="text-neutral-600">{item.description}</div>
              {item.frequency && <div>{getTranslation(item.frequency)}</div>}
              {item.category && <div>Категория: {item.category}</div>}{" "}
              {/* TODO: Сделать цвета по категориям */}
              {/* TODO: Добавить возможность изменять привычку */}
              {/* TODO: Добавить сортировку по категориям */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Habits;
