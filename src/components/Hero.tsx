import { FC } from "react";
import Container from "./Container";

const Hero: FC = () => {
  return (
    <Container className="flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto py-16 space-y-4">
        <p className="text-6xl font-bold text-indigo-500">
          Uma lista de jogos de diversos gêneros.
        </p>
        <p className="text-base font-bold text-indigo-500">
          A próxima geração de jogos é experiente em tecnologia.
        </p>
        <p className="text-base font-bold text-indigo-500">
          Nesta Lista de jogos você vai poder pesquisar por nomes e favoritar
          após um simples cadastro.
        </p>
      </div>
    </Container>
  );
};

export default Hero;
