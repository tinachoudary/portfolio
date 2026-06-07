import Hero from "./Hero";
function HeroWrapper() {
  return (
    <section className="relative h-[150vh]">
      <div className="sticky top-0 h-screen">
        <Hero />
      </div>
    </section>
  );
}

export default HeroWrapper;