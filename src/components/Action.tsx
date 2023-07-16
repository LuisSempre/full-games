import { FC } from "react";
import Container from "./Container";

const Action: FC = () => {
  return (
    <Container className="flex flex-col items-center justify-center">
      <div className="relative z-10 -mx-4 shadow-lg ring-1 ring-indigo-500/10  rounded-3xl w-full text-center my-16 max-w-2xl py-8">
        <div className="absolute -top-px left-1/2 -ml-48 flex h-[2px] w-96">
          <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          <div className="-ml-[100%] w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
        </div>
        <div className="relative bg-white px-4 py-10 sm:rounded-3xl sm:px-10">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="font-display text-3xl tracking-tight text-indigo-500 sm:text-4xl">
              Crie uma conta hoje
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
