import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useEffect } from "react";
import { WeatherEffects } from "./WeatherEffects";
import "@fontsource/syne";

const weatherColorMap = {
  "clear sky": {
    day: ["#9AE1FF", "#71C7FF", "#4A90E2"],
    night: ["#1a1a2e", "#16213e", "#0f3460"],
  },
  "few clouds": {
    day: ["#87CEEB", "#E0F6FF", "#FFD89B"],
    night: ["#2d3561", "#1e2f5a", "#192e51"],
  },
  "scattered clouds": {
    day: ["#B0E0E6", "#D3D3D3", "#A9A9A9"],
    night: ["#404854", "#2f3d47", "#283139"],
  },
  "broken clouds": {
    day: ["#808080", "#A9A9A9", "#696969"],
    night: ["#2a2a3e", "#1f1f2e", "#161625"],
  },
  "shower rain": {
    day: ["#4a5f7f", "#2c3e50", "#546e7a"],
    night: ["#1a2634", "#0f192c", "#0d1626"],
  },
  "rain": {
    day: ["#36454F", "#2c3e50", "#34495e"],
    night: ["#0f1823", "#0a0f19", "#050a10"],
  },
  "thunderstorm": {
    day: ["#2c3e50", "#1a252f", "#1c2833"],
    night: ["#0a0e27", "#05070f", "#0a0a15"],
  },
  "snow": {
    day: ["#F0F8FF", "#E6F2FF", "#D0E8F2"],
    night: ["#c9d6e5", "#a8b8d8", "#7a8fa3"],
  },
  "mist": {
    day: ["#4a6fa5", "#2d5a7b", "#1a3a5c"],
    night: ["#2d4a6b", "#1a3a5c", "#0f2540"],
  },
};

function Hero() {
  const { scrollY } = useScroll();
  const [weatherCondition, setWeatherCondition] = useState("clear sky");
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,is_day&timezone=auto`
        );

        const data = await response.json();
        const weatherCode = data.current.weather_code;
        const dayStatus = data.current.is_day;
      console.log("Weather API response:", data.current);
console.log("Weather code:", weatherCode, "Is day:", dayStatus);
        setIsDay(dayStatus === 1);

        // Map WMO weather codes to descriptions
        const weatherMap = {
          0: "clear sky",
          1: "few clouds",
          2: "few clouds",
          3: "scattered clouds",
          45: "mist",
          48: "mist",
          51: "shower rain",
          53: "shower rain",
          55: "shower rain",
          61: "rain",
          63: "rain",
          65: "rain",
          71: "snow",
          73: "snow",
          75: "snow",
          77: "snow",
          80: "shower rain",
          81: "rain",
          82: "rain",
          85: "snow",
          86: "snow",
          95: "thunderstorm",
          96: "thunderstorm",
          99: "thunderstorm",
        };

        const condition = weatherMap[weatherCode] || "clear sky";
        setWeatherCondition(condition);
      } catch (error) {
        console.log("Weather fetch error:", error);
        setWeatherCondition("clear sky");
      }
    };

    fetchWeather();
  }, []);

  const colors = weatherColorMap[weatherCondition]?.[isDay ? "day" : "night"] || [
    "#8BD2FF",
    "#71C7FF",
    "#4A90E2",
  ];

  const backgroundStyle = {
    background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 50%, ${colors[2]} 100%)`,
    transition: "background 2s ease-in-out",
  };

  const isMist = weatherCondition === "mist";
  const textClass = isMist ? "text-black" : "text-white";
  const subTextClass = isMist ? "text-gray-800" : "text-gray-100";
  const descTextClass = isMist ? "text-gray-900" : "text-white";

  const scale = useTransform(
    scrollY,
    [0, 800],
    [1, 0.8]
  );

  const y = useTransform(
    scrollY,
    [0, 800],
    [0, -200]
  );

  const opacity = useTransform(
    scrollY,
    [0, 1000],
    [1, 0.5]
  );


  return (
    <section
      style={backgroundStyle}
      className="
        h-screen
        flex
        items-center
        justify-center
        px-6
        text-white
        relative
      "
    >
      <WeatherEffects condition={weatherCondition} />
      <motion.div
        style={{
          scale,
          opacity,
          y,
        }}
        className="
          max-w-5xl
          text-center
          relative
          z-10
        "
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`
            uppercase
            tracking-[0.3em]
            text-xs
            md:text-sm
            mb-8
            drop-shadow-lg
            ${subTextClass}
          `}
        >
          Software Engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
          style={{ fontFamily: "Syne" }}
          className={`
            text-6xl
            md:text-8xl
            font-black
            tracking-tight
            leading-none
            drop-shadow-2xl
            ${textClass}
          `}
        >
          Hello , I'm Tina.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
          }}
          className={`
            mt-8
            text-xl
            md:text-2xl
            drop-shadow-lg
            ${descTextClass}
          `}
        >
          Building reliable software.
          <br />
          Exploring AI and curious side projects.
        </motion.p>

        <div
          className="
            mt-12
            flex
            justify-center
            gap-3
            flex-wrap
          "
        >
          {[
            "AI",
            "Systems",
            "Music",
            "Anime",
            "Design",
          ].map((item) => (
            <span
              key={item}
              className={`
                px-4
                py-2
                rounded-full
                border
                backdrop-blur-sm
                drop-shadow-lg
                ${isMist 
                  ? "border-gray-600 text-black" 
                  : "border-white/30 text-white"
                }
              `}
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;