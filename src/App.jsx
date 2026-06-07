import Navbar from "./components/Navbar";
import HeroWrapper from "./components/HeroWrapper";
import About from "./components/About";
import Projects from "./components/Projects";
import ChatBox from "./components/ChatBox";
import Contact from "./components/Contact";

const App = () => {
  return (
    <main className="bg-[#111827] text-white">

      <Navbar />

      <HeroWrapper />

      <About />
      <Projects />

      <ChatBox />
      <Contact/>

    </main>
  );
};

export default App;