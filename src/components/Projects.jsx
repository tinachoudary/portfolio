import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

function Projects() {
  const [selectedTech, setSelectedTech] = useState(null);

  const engineeringContributions = [
    {
      title: "Enterprise Application Enhancement",
      description:
        "Enhanced an enterprise MERN application by implementing multiple user-facing features, resolving over 200 high-severity SAST vulnerabilities, refactoring the codebase to improve null safety and maintainability, and strengthening overall application quality.",
      tech: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "JavaScript",
      ],
    },
    {
      title: "Backend API Development & Production Readiness",
      description:
        "Developed and enhanced Spring Boot REST APIs, optimized backend integrations, and supported production release activities to deliver reliable, production-ready enterprise applications.",
      tech: [
        "Java",
        "Spring Boot",
        "REST APIs",
      ],
    },
  ];

  const personalProjects = [
    {
      title: "RenovAI – Multi-Agent AI Interior Design Assistant",
      description:
        "Built a multi-agent AI interior design assistant using Google's Agent Development Kit that analyzes room images, learns user preferences, recommends furniture via Google Shopping, and generates personalized renovation concepts using Gemini.",
      tech: [
        "Python",
        "Google ADK",
        "Gemini API",
        "AI",
      ],
    },
    {
      title: "Developer Portfolio Website",
      description:
        "Designed and developed a responsive developer portfolio featuring customizable themes, project filtering, weather-aware UI personalization, and a Gemini-powered recruiter assistant that answers questions using resume-grounded responses.",
      tech: [
        "React",
        "Node.js",
        "Gemini API",
        "Tailwind CSS",
        "AI",
      ],
    },
    {
      title: "Quiz Web Application",
      description:
        "Developed a quiz management system supporting quiz creation, participation, scoring, and result management through an intuitive web interface.",
      tech: [
        "HTML",
        "CSS",
        "PHP",
        "MySQL"
      ],
    },
    {
      title: "Smart Agriculture IoT System",
      description:
        "Developed an IoT-based smart farming prototype featuring automated irrigation, fire detection, pest monitoring, and environmental sensing to improve resource efficiency and agricultural productivity.",
      tech: [
        "IoT",
        "ESP32",
        "Arduino",
        "ML",
      ],
    },
  ];

  // Clean, recruiter-friendly filters
  const filters = [
    "Java",
    "Spring Boot",
    "React",
    "Node.js",
    "Python",
    "AI",
    "MongoDB",
    "IoT",
    "MySQL"
  ];

  const filteredEngineering = selectedTech
    ? engineeringContributions.filter((p) =>
        p.tech.includes(selectedTech)
      )
    : engineeringContributions;

  const filteredPersonal = selectedTech
    ? personalProjects.filter((p) =>
        p.tech.includes(selectedTech)
      )
    : personalProjects;

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
      <h2 className="text-4xl font-bold mb-8">
        Projects
      </h2>

      <div className="mb-12">
        <p className="text-gray-400 text-sm mb-4">
          Filter by technology:
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedTech(null)}
            className={`px-4 py-2 rounded-full transition ${
              selectedTech === null
                ? "bg-white text-black"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            All
          </button>

          {filters.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-full transition ${
                selectedTech === tech
                  ? "bg-white text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-8 mt-12">
        Professional Experience
      </h3>

      <motion.div className="grid md:grid-cols-2 gap-8 mb-24" layout>
        {filteredEngineering.map((project, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              tech={project.tech}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredEngineering.length === 0 && (
        <p className="text-gray-400 text-center py-8">
          No professional experience found for this technology.
        </p>
      )}

      <h3 className="text-2xl font-bold mb-8">
        Personal Projects
      </h3>

      <motion.div className="grid md:grid-cols-2 gap-8" layout>
        {filteredPersonal.map((project, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              tech={project.tech}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredPersonal.length === 0 && (
        <p className="text-gray-400 text-center py-8">
          No personal projects found for this technology.
        </p>
      )}
    </section>
  );
}

export default Projects;