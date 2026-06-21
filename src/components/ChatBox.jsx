import { useState } from "react";

function ChatBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const suggestions = [
    "Tell me about your projects",
    "What technologies do you work with?",
    "What are your skills?"
  ];

  const handleAskAI = async () => {
    if (question.trim() === "" || isLoading) return;

    setIsLoading(true);
    setAnswer("");

    try {
      const response = await fetch(
        "https://portfolio-jlrr.onrender.com/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setAnswer(
          data.error || "Something went wrong."
        );
      } else {
        setAnswer(data.answer);
      }
    } catch (error) {
      console.log(error);
      setAnswer("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="ask-tina"
      className="max-w-5xl mx-auto px-6 py-32"
    >
      <h2 className="text-4xl font-bold">
        Ask Tina
      </h2>

      <p className="text-gray-400 mt-3 mb-10">
        Curious about my experience, projects,
        publications, or tech stack?
      </p>

      <div
        className="
          bg-[#171b24]
          border
          border-white/5
          rounded-3xl
          p-6
        "
      >
        <div className="text-sm text-gray-500 mb-5">
          Resume-powered AI Assistant
        </div>

        <input
          type="text"
          placeholder="What do you do at HSBC?"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          disabled={isLoading}
          onKeyDown={(e) =>
            e.key === "Enter" && handleAskAI()
          }
          className="
            w-full
            bg-[#0f1117]
            border
            border-white/5
            p-4
            rounded-xl
            outline-none
            focus:border-white/20
            disabled:opacity-50
          "
        />

        <div className="flex flex-wrap gap-2 mt-4">
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => setQuestion(item)}
              className="
                px-3
                py-2
                text-sm
                rounded-full
                border
                border-white/10
                text-gray-400
                hover:text-white
                hover:border-white/20
                transition
              "
            >
              {item}
            </button>
          ))}
        </div>

        <button
          onClick={handleAskAI}
          disabled={isLoading}
          className={`
            mt-6
            px-5
            py-3
            rounded-xl
            font-medium
            transition
            ${
              isLoading
                ? "bg-gray-700 cursor-not-allowed opacity-50"
                : "bg-white text-black hover:opacity-90"
            }
          `}
        >
          {isLoading
            ? "Tina is thinking..."
            : "Ask"}
        </button>

        {answer && (
          <div className="mt-8 flex">
            <div
              className="
                max-w-3xl
                bg-[#0f1117]
                border
                border-white/5
                rounded-2xl
                p-5
                text-gray-300
                whitespace-pre-wrap
                leading-8
              "
            >
              {answer}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ChatBox;