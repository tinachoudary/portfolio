import { motion } from "framer-motion";

const Raindrop = ({ delay, duration, x, y }) => (
  <motion.div
    initial={{ y: -100, opacity: 1 }}
    animate={{ y: window.innerHeight + 100, opacity: 0 }}
    transition={{ delay, duration, repeat: Infinity, ease: "linear" }}
    style={{ left: `${x}%` }}
    className="absolute w-1 h-4 bg-blue-200 rounded-full opacity-60"
  />
);

const Rainstorm = () => {
  const raindrops = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    delay: Math.random() * 2,
    duration: 0.5 + Math.random() * 0.5,
    x: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {raindrops.map((drop) => (
        <Raindrop
          key={drop.id}
          delay={drop.delay}
          duration={drop.duration}
          x={drop.x}
        />
      ))}
    </div>
  );
};

const Snowflake = ({ delay, duration, x, size }) => (
  <motion.div
    initial={{ y: -50, opacity: 1 }}
    animate={{ y: window.innerHeight + 50, opacity: 0 }}
    transition={{
      delay,
      duration,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{ left: `${x}%` }}
    className="absolute bg-white rounded-full opacity-70"
    style={{
      width: size,
      height: size,
      left: `${x}%`,
    }}
  />
);

const Snowstorm = () => {
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 3,
    x: Math.random() * 100,
    size: 3 + Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.id}
          delay={flake.delay}
          duration={flake.duration}
          x={flake.x}
          size={flake.size}
        />
      ))}
    </div>
  );
};

const ClearSky = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      animate={{ scale: [1, 1.025, 1] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-16 right-16 w-56 h-56 rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(255,255,255,0.96) 0%, rgba(198,230,255,0.55) 35%, rgba(143,205,255,0.18) 70%, rgba(143,205,255,0) 100%)",
        filter: "blur(28px)",
      }}
    />

    <motion.div
      animate={{ opacity: [0.85, 1, 0.85] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-24 right-24 w-28 h-28 rounded-full bg-white/90 shadow-white/70 shadow-2xl"
    />

    <motion.div
      animate={{ x: [0, 12, 0], y: [0, -4, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-36 left-10 w-36 h-24 rounded-full bg-white/70 blur-sm"
      style={{
        boxShadow: "0 20px 40px rgba(255,255,255,0.18)",
      }}
    />

    <motion.div
      animate={{ x: [0, -10, 0], y: [0, 4, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-24 left-24 w-44 h-28 rounded-full bg-white/65 blur-sm"
      style={{
        boxShadow: "0 20px 40px rgba(255,255,255,0.15)",
      }}
    />

  </div>
);

const Lightning = () => {
  const strikes = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: Math.random() * 5 + 1,
    x: Math.random() * 90 + 5,
    y: Math.random() * 60,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Screen flash effect */}
      {strikes.map((strike) => (
        <motion.div
          key={`flash-${strike.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{
            delay: strike.delay,
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 4,
          }}
          className="absolute inset-0 bg-white"
        />
      ))}

      {/* Lightning bolts */}
      {strikes.map((strike) => (
        <motion.div
          key={`bolt-${strike.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 0] }}
          transition={{
            delay: strike.delay,
            duration: 0.4,
            repeat: Infinity,
            repeatDelay: 4,
          }}
          style={{
            left: `${strike.x}%`,
            top: `${strike.y}%`,
          }}
          className="absolute"
        >
          <svg width="60" height="200" viewBox="0 0 60 200" className="drop-shadow-2xl">
            <path
              d="M 30 0 L 20 40 L 35 50 L 15 120 L 35 130 L 20 200"
              stroke="rgba(255, 255, 255, 0.9)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 30 0 L 20 40 L 35 50 L 15 120 L 35 130 L 20 200"
              stroke="rgba(200, 220, 255, 0.6)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const MovingClouds = () => {
  const clouds = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    top: 5 + i * 25,
    delay: i * 2,
    size: 60 + i * 20,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          initial={{ x: -300 }}
          animate={{ x: window.innerWidth + 300 }}
          transition={{
            delay: cloud.delay,
            duration: 20 + cloud.id * 3,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: `${cloud.top}%` }}
          className="absolute whitespace-nowrap"
        >
          <svg
            width={cloud.size}
            height={cloud.size * 0.6}
            viewBox="0 0 100 60"
            className="drop-shadow-lg"
          >
            <path
              d="M 30 40 Q 20 40 15 30 Q 10 20 20 15 Q 25 5 35 5 Q 50 0 55 10 Q 70 5 75 15 Q 85 20 80 30 Q 75 40 65 40 Z"
              fill="rgba(255, 255, 255, 0.4)"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

const Fog = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        animate={{ x: [-100, 100, -100], y: [-20, 20, -20] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.45) 100%)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        animate={{ x: [100, -100, 100], y: [20, -20, 20] }}
        transition={{ duration: 30, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.35) 100%)",
          filter: "blur(70px)",
        }}
      />
      <motion.div
        animate={{ x: [-80, 80, -80], y: [-15, 15, -15] }}
        transition={{ duration: 35, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.3) 100%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        animate={{ x: [80, -80, 80], y: [15, -15, 15] }}
        transition={{ duration: 40, delay: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.25) 100%)",
          filter: "blur(90px)",
        }}
      />
    </div>
  );
};

export function WeatherEffects({ condition }) {
  if (condition === "rain" || condition === "shower rain") {
    return <Rainstorm />;
  }

  if (condition === "snow") {
    return <Snowstorm />;
  }

  if (condition === "clear sky") {
    return <ClearSky />;
  }

  if (condition === "thunderstorm") {
    return (
      <>
        <Rainstorm />
        <Lightning />
      </>
    );
  }

  if (
    condition === "few clouds" ||
    condition === "scattered clouds" ||
    condition === "broken clouds"
  ) {
    return <MovingClouds />;
  }

  if (condition === "mist") {
    return <Fog />;
  }

  return null;
}
