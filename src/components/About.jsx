function About() {
  return (
    <section
      id="about"
      className="
        relative
        z-20
        bg-[#f5f3ee]
        text-black
        rounded-t-[48px]
        -mt-[50vh]
        px-6
        py-32
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          grid
          lg:grid-cols-[320px_1fr]
          gap-20
        "
      >
        {/* Sticky Card */}

        <div className="hidden lg:block">

          <div
            className="
              sticky
              top-32
              bg-white/5
              backdrop-blur-md
              border
              border-white/10
              text-black
              rounded-3xl
              p-8
              shadow-xl
            "
          >
            <h3 className="text-2xl font-bold mb-8">
              At a Glance
            </h3>

            <div className="space-y-6">

              <div>
                <p className="text-sm opacity-70 mb-1">
                  Current Role
                </p>

                <p className="font-semibold">
                  Software Engineer
                </p>

                <p className="text-sm">
                  HSBC Technology India
                </p>
              </div>

              <div>
                <p className="text-sm opacity-70 mb-1">
                  Education
                </p>

                <p className="font-semibold">
                  B.Tech CSE
                </p>

                <p className="text-sm">
                  Amrita Vishwa Vidyapeetham
                </p>
              </div>

              <div>
                <p className="text-sm opacity-70 mb-1">
                  Publications
                </p>

                <p className="font-semibold">
                  IEEE & Springer
                </p>
              </div>

              <div>
                <p className="text-sm opacity-70 mb-1">
                  Certification
                </p>

                <p className="font-semibold">
                  Google Cloud
                </p>

                <p className="text-sm">
                  Generative AI Leader
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Main Content */}

        <div>

          <h2 className="text-5xl font-bold mb-10">
            About Me
          </h2>

          <div
            className="
              text-lg
              leading-9
              text-gray-700
              space-y-8
            "
          >
            <p>
              I'm a Software Engineer at HSBC Technology
              India, where I work on enterprise applications,
              backend services, and modern web experiences.
            </p>

            <p>
              My work spans full-stack development,
              production-ready Spring Boot APIs,
              security remediation, release activities,
              and performance optimization.
            </p>

            <p>
              Beyond my day job, I enjoy exploring
              artificial intelligence, developer tools,
              animation, music, and creative technology.
              I'm particularly interested in building
              products that combine engineering with
              thoughtful user experiences.
            </p>

            <p>
              I also enjoy research and have authored
              publications in autonomous vehicle routing.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;