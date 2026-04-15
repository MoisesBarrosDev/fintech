export function Contato() {
  return (
    <div className="box max-w-xl">
      <h2 className="text-xl font-semibold mb text-[#463220]">Contato</h2>

      <div className="flex flex-col gap-3 text-[#66593c]">
        <p>
          <strong>Nome: Moisés Barros</strong>
        </p>

        <p>
          <strong>Email: moisesbarrosdev@gmail.com</strong>
        </p>

        <p>
          <strong>LinkedIn: </strong>
          <a
            href="https://www.linkedin.com/in/mois%C3%A9s-barros-5b3629314/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Moisés Barros
          </a>
        </p>

        <p>
          <strong>GitHub:</strong>{" "}
          <a
            href="https://github.com/MoisesBarrosDev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            github.com/MoisesBarrosDev
          </a>
        </p>
      </div>
    </div>
  );
}
