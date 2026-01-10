import {
  ArrowRight,
  Infinity,
  Search,
  Sparkles,
  Target,
  Heart,
  BarChart3,
  CalendarIcon,
  Trophy,
  Brain,
  Leaf,
  Code,
} from "lucide-react";
import { Link } from "react-router-dom";
import MainCard from "../Cards/MainCard";

import Faint from "../components/Faint";

function General() {
  const statistic = [
    {
      icon: <Infinity />,
      iconColor: "oklch(66.6% 0.179 58.318)",
      text: "Привычек",
      description: "Создавай сколько хочешь",
    },
    {
      icon: "Free",
      iconColor: "oklch(76.5% 0.177 163.223)",
      text: "Навсегда",
      description: "Без скрытых платежей",
    },
    {
      icon: "5+",
      iconColor: "oklch(70.7% 0.165 254.624)",
      text: "Категорий",
      description: "Для здоровья и жизни",
    },
    {
      icon: "PWA",
      iconColor: "oklch(67.3% 0.182 276.935)",
      text: "На телефон",
      description: "Работает везде",
    },
  ];

  // Список для "Что тут можно делать"
  const thingsYouCanDo = [
    {
      icon: <Target />,
      iconColor: "oklch(54.6% 0.245 262.881)",
      bgColor: "oklch(88.2% 0.059 254.128)",
      title: "Привычки, которые прилипают",
      text: "Создай свою цепочку маленьких побед. Не просто галочки, а история твоего роста.",
      description: "Начинай с самой простой привычки",
    },
    {
      icon: <Heart />,
      iconColor: "oklch(57.7% 0.245 27.325)",
      bgColor: "oklch(88.5% 0.062 18.334)",
      title: "Здоровье без цифрозависимости",
      text: "Отслеживай сон, воду и активность, но не становись их рабом. Баланс — наша цель.",
      description: "Пей воду до завтрака",
    },
    {
      icon: <BarChart3 />,
      iconColor: "oklch(59.6% 0.145 163.225)",
      bgColor: "oklch(90.5% 0.093 164.15)",
      title: "Графики, которые говорят",
      text: "Смотри не на кривые линии, а на то, что за ними стоит. Прогресс виден сразу.",
      description: "Сравнивай неделю с неделей",
    },
    {
      icon: <CalendarIcon />,
      iconColor: "oklch(66.6% 0.179 58.318)",
      bgColor: "oklch(92.4% 0.12 95.746)",
      title: "Планы, которые работают",
      text: "Составляй расписание, которое реально выполнить. Без перфекционизма.",
      description: "Оставляй буферное время",
    },
  ];

  const additionalFeatures = [
    {
      icon: <Trophy />,
      iconColor: "oklch(66.6% 0.179 58.318)",
      title: "Челленджи",
      description: "Соревнуйся с собой",
    },
    {
      icon: <Brain />,
      iconColor: "oklch(54.1% 0.281 293.009)",
      title: "Советы",
      description: "Основано на науке",
    },
    {
      icon: <Leaf />,
      iconColor: "oklch(59.6% 0.145 163.225)",
      title: "Экология",
      description: "Ничего лишнего",
    },
    {
      icon: <Code />,
      iconColor: "oklch(44.6% 0.03 256.802)",
      title: "Код открыт",
      description: "Можно посмотреть",
    },
  ];

  return (
    <div>
      {/* Главный экран */}
      <section className="pt-24 px-4">
        <div className="mb-10 inline-flex justify-center items-center gap-2 px-4 py-2 rounded-3xl border border-primary-400 bg-primary-300">
          <p className="text-primary-700">
            <Sparkles size={16} />
          </p>
          <p className="text-primary-800 font-semibold">Ранний доступ</p>
        </div>

        <h1 className="mb-15 group">
          Привычки, которые <br />
          <span className="relative inline-block">
            <span className="relative z-10">меняют жизнь</span>
            {/* underline */}
            <div className="absolute bottom-0 left-0 w-full h-4 -rotate-1 z-0 bg-linear-to-r from-primary-300 to-secondary-300 opacity-60 group-hover:opacity-100 group-hover:bg-linear-to-l transition-all duration-500"></div>
          </span>
        </h1>

        <Faint className="mb-10">
          Не очередное приложение для продуктивности, а простой инструмент,
          который действительно помогает не забросить полезные ритуалы. Без
          сложных настроек и лишней теории.
        </Faint>

        <div className="inline-flex justify-center items-center gap-4 mb-10">
          <Link
            to="/login"
            className="group inline-flex justify-center items-center gap-2 px-6 py-4 bg-success-500 hover:bg-success-600 text-white font-semibold rounded-2xl"
          >
            Начать бесплатно
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-all duration-500"
            />
          </Link>
          <a
            className="group inline-flex justify-center items-center gap-1 px-6 py-4 border border-primary-500 text-primary-500 bg-transparent hover:bg-primary-50 font-semibold rounded-2xl"
            href="#about"
          >
            Посмотреть возможности{" "}
            <Search
              size={20}
              className="group-hover:translate-x-1 group-hover:rotate-10 transition-all duration-500"
            />
          </a>
        </div>

        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {statistic.map((item) => (
              <MainCard
                icon={item.icon}
                iconColor={item.iconColor}
                text={item.text}
                description={item.description}
                brightBorder={true}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="about">
        <h4 className="mb-5">Что тут можно делать?</h4>
        <Faint className="mb-10">
          Никаких сложных функций. Только то, что реально работает.
        </Faint>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {thingsYouCanDo.map((item) => (
            <MainCard
              icon={item.icon}
              iconColor={item.iconColor}
              bgColor={item.bgColor}
              title={item.title}
              text={item.text}
              description={item.description}
              hover={true}
              brightBorder={true}
            />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {additionalFeatures.map((item) => (
            <MainCard
              px={6}
              py={6}
              icon={item.icon}
              iconColor={item.iconColor}
              text={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section>Как это работает на деле</section>
      <section>Почему это работает?</section>
    </div>
  );
}

export default General;
