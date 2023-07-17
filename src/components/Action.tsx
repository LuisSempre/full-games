import { FC } from "react";
import Container from "./Container";

const Action: FC = () => {
  return (
    <Container className="flex-col items-center justify-center hidden sm:flex">
      <div
        className="relative flex 
      place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 
      before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl 
      before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 
      after:bg-gradient-conic after:from-indigo-100 after:via-indigo-200 after:blur-2xl after:content-[''] 
      before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-indigo-700 before:dark:opacity-10 
      after:dark:from-indigo-900 after:dark:via-indigo-700 after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
      >
        <div className="max-w-2xl mx-auto py-16 space-y-4">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="font-bold text-6xl tracking-tight text-indigo-500">
              Crie sua conta hoje!
            </h2>
            <p className="mt-4 text-lg tracking-tight text-indigo-500">
              Para aproveitar todos os recursos da lista de games e não perder
              mais nada.
            </p>
          </div>
        </div>
      </div>

    </Container>
  );
};

export default Action;
