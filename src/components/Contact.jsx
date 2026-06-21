function Contact() {
  return (
    <section
      id="contact"
      className="max-w-4xl mx-auto px-6 py-24"
    >
      <h3 className="text-3xl font-bold mb-8">
        Want more details than the site can show? Contact me...
      </h3>

      <div className="space-y-4 text-gray-300">

        <a
          href="mailto:tinachoudary1762@gmail.com"
          className="block hover:text-white transition"
        >
          Email → tinachoudary1762@gmail.com
        </a>

        <a
          href="https://www.linkedin.com/in/tina-choudary-yalamanchili-968b04215/"
          target="_blank"
          rel="noreferrer"
          className="block hover:text-white transition"
        >
          LinkedIn → Click here to go to my LinkedIn profile
        </a>

        <a
          href="/Tina_Choudary_Yalamanchili_Resume.pdf"
          download
          className="block hover:text-white transition"
        >
          Resume → Click here to download my resume
        </a>

      </div>
    </section>
  );
}

export default Contact;