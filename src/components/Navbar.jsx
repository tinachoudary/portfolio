function Navbar() {
  return (
<nav
  className="
    fixed
    top-0
    left-0
    w-full
    z-[9999]
    flex
    justify-between
    items-center
    px-8
    md:px-12
    py-6

    bg-[#0f1117]/80
    backdrop-blur-xl

    border-b
    border-white/5
  "
>
      {/* Logo / Name */}
      <a
        href="#"
        className="
          text-lg
          font-semibold
          tracking-wide
          text-white
        "
      >
        Tina
      </a>

      {/* Navigation */}
      <div
        className="
          flex
          items-center
          gap-6
          md:gap-8
          text-sm
          md:text-base
        "
      >
        <a
          href="#about"
          className="text-gray-400 hover:text-white transition"
        >
          About
        </a>

        <a
          href="#projects"
          className="text-gray-400 hover:text-white transition"
        >
          Projects
        </a>

        <a
  href="/TinaChoudaryYalamanchili.pdf"
  download
  className="text-gray-400 hover:text-white transition"
>
          Resume
        </a>

        <a
          href="#contact"
          className="
            px-4
            py-2
            rounded-full
            border
            border-white/10
            hover:border-white/30
            transition
          "
        >
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;