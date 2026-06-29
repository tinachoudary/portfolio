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
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    const fetchWeather = async () => {
      const startTime = Date.now();

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setLoadingStep(1); // Detecting Location complete

        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=weather_code,is_day&timezone=auto`
        );

        const data = await response.json();
        const weatherCode = data.current.weather_code;
        const dayStatus = data.current.is_day;

        setLoadingStep(2); // Reading Weather complete

        console.log("Weather API response:", data.current);
        console.log("Weather code:", weatherCode, "Is day:", dayStatus);

        setIsDay(dayStatus === 1);
        setLoadingStep(3); // Determining Time of Day complete

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
        setLoadingStep(4); // Applying Context complete

        // Ensure minimum 1000ms duration
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1000 - elapsedTime);

        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      } catch (error) {
        console.log("Weather fetch error:", error);
        setWeatherCondition("clear sky");
        setLoadingStep(4);

        // Ensure minimum 1000ms duration even on error
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 1000 - elapsedTime);

        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
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

  const steps = [
    "Detecting Location",
    "Reading Weather",
    "Determining Time of Day",
    "Applying Context",
  ];

  return (
    <section
      style={isLoading ? { background: "#111827" } : backgroundStyle}
className="
  min-h-screen
  flex
  items-center
  justify-center
  px-5 sm:px-6
  py-24 sm:py-16
  text-white
  relative
"
    >
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-16">
              Personalizing your experience...
            </h2>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: loadingStep > index ? 1 : 0.4,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    {loadingStep > index ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="text-green-400 text-lg"
                      >
                        ✓
                      </motion.div>
                    ) : (
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-gray-500 text-lg"
                      >
                        ...
                      </motion.div>
                    )}
                  </div>
                  <span
                    className={
                      loadingStep > index ? "text-white" : "text-gray-500"
                    }
                  >
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ) : (
        <>
          <WeatherEffects condition={weatherCondition} />
          <motion.div
            style={{
              scale,
              opacity,
              y,
            }}
className="
  max-w-5xl
  w-full
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
          Hello, I'm Tina.
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
        </>
      )}
    </section>
  );
}

export default Hero;