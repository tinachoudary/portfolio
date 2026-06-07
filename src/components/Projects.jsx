import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

function Projects() {
  const [selectedTech, setSelectedTech] = useState(null);

  const engineeringContributions = [
    {
      title: "Enterprise Security Modernization",
      description:
        "Remediated 216+ high-severity security vulnerabilities across a production enterprise application, improving security compliance and code quality.",
      tech: ["Java", "Spring Boot", "Security", "AWS"]
    },
    {
      title: "Production Release Readiness",
      description:
        "Contributed to Spring Boot API production readiness, testing coordination, deployment activities, and successful enterprise releases.",
      tech: ["Java", "Spring Boot", "Testing", "DevOps"]
    }
  ];

  const personalProjects = [
    {
      title: "AI Portfolio Assistant",
      description:
        "An AI-powered portfolio that answers questions about my experience, projects, and technical background using Gemini and resume-grounded responses.",
      tech: ["React", "Node.js", "Gemini API", "AI"]
    },
    {
      title: "Smart Agriculture IoT System",
      description:
        "Built an IoT-based monitoring system featuring automated irrigation, fire detection, pest monitoring, and environmental sensing.",
      tech: ["IoT", "Python", "Sensors", "Real-time"]
    }
  ];

  // Get all unique tech tags
  const allTechs = [
    ...new Set([
      ...engineeringContributions.flatMap(p => p.tech),
      ...personalProjects.flatMap(p => p.tech)
    ])
  ].sort();

  // Filter projects based on selected tech
  const filteredEngineering = selectedTech
    ? engineeringContributions.filter(p => p.tech.includes(selectedTech))
    : engineeringContributions;

  const filteredPersonal = selectedTech
    ? personalProjects.filter(p => p.tech.includes(selectedTech))
    : personalProjects;

  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 py-24">

      <h2 className="text-4xl font-bold mb-8">
        Projects
      </h2>

      {/* Tech Filter */}
      <div className="mb-12">
        <p className="text-gray-400 text-sm mb-4">Filter by tech stack:</p>
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

      <motion.div
        className="grid md:grid-cols-2 gap-8 mb-24"
        layout
      >
        {filteredEngineering.map((project, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
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

      <motion.div
        className="grid md:grid-cols-2 gap-8"
        layout
      >
        {filteredPersonal.map((project, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
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