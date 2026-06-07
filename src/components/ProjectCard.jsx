function ProjectCard(props) {
  return (
    <div className="bg-[#121826] border border-gray-800 rounded-2xl p-6 h-full flex flex-col">

      <h3 className="text-2xl font-semibold mb-4">
        {props.title}
      </h3>

      <p className="text-gray-400 mb-6 flex-grow">
        {props.description}
      </p>

      {props.tech && (
        <div className="flex flex-wrap gap-2">
          {props.tech.map((tech) => (
            <span
              key={tech}
              className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

    </div>
  );
}

export default ProjectCard;