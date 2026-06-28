import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

function Projects() {
  const [selectedTech, setSelectedTech] = useState(null);

  const engineeringContributions = [
    {
      title: "Enterprise Security Modernization",
      description:
        "Resolved 200+ high-severity SonarQube (SAST) vulnerabilities across an enterprise application, significantly improving security, maintainability, and overall code quality.",
      tech: ["Java", "Spring Boot", "Security", "SonarQube"]
    },
    {
      title: "Production Release & API Development",
      description:
        "Contributed to Spring Boot API development, optimized backend interactions, and led deployment and production readiness activities for enterprise applications.",
      tech: ["Java", "Spring Boot", "REST APIs", "DevOps"]
    }
  ];

  const personalProjects = [
    {
      title: "RenovAI – Multi-Agent AI Interior Design Assistant",
      description:
        "Built an AI-powered interior design assistant using Google's Agent Development Kit that analyzes room images, stores user preferences, recommends furniture through Google Shopping, and generates renovation concepts using multiple AI agents.",
      tech: [
        "Python",
        "Google ADK",
        "Gemini",
        "Serper API",
        "Pydantic",
        "AI"
      ]
    },
    {
      title: "Developer Portfolio Website",
      description:
        "Designed and developed a modern portfolio website with weather-based UI personalization, customizable themes, project filtering, and a Gemini-powered chatbot that answers recruiter questions using resume-grounded responses.",
      tech: [
        "React",
        "Node.js",
        "Gemini API",
        "Tailwind CSS",
        "Vercel"
      ]
    },
    {
      title: "Quiz Web Application",
      description:
        "Developed a web-based quiz management system supporting quiz creation, participation, and result management while improving usability through frontend enhancements and testing.",
      tech: [
        "HTML",
        "CSS",
        "PHP",
        "Jira",
        "SonarQube"
      ]
    },
    {
      title: "Smart Agriculture IoT System",
      description:
        "Developed an IoT-based smart farming prototype featuring automated irrigation, fire detection, pest monitoring, and environmental sensing to improve agricultural productivity.",
      tech: [
        "IoT",
        "ESP32",
        "Arduino",
        "Sensors"
      ]
    }
  ];

  const allTechs = [
    ...new Set([
      ...engineeringContributions.flatMap((p) => p.tech),
      ...personalProjects.flatMap((p) => p.tech)
    ])
  ].sort();

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
          Filter by tech stack:
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

          {allTechs.map((tech) => (
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
        Professional Experience Highlights
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
          No projects found with this tech stack.
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
          No projects found with this tech stack.
        </p>
      )}

    </section>
  );
}

export default Projects;