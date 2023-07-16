"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getCurrentUser, signOutUser } from "@/firebase/auth";
import Container from "./Container";

function Navigation() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUser(user);
      console.log(user);
    });
  }, []);

  if (user) {
    return (
      <Container className="flex flex-col items-center justify-center">
        <footer className="relative z-10 -mx-4 shadow-lg ring-1 ring-indigo-500/10 rounded-b-3xl w-full text-center">
          <div className="absolute -bottom-px left-1/2 -ml-48 flex h-[2px] w-96">
            <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
            <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
            <div className="-ml-[100%] w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
            <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          </div>
          <div className="relative bg-white px-4 py-10 sm:rounded-3xl sm:px-10">
            <div className="px-8 flex justify-between py-2 items-center">
              <h1 className="font-semibold text-indigo-700 text-xl">Lista de games</h1>
              <div className="flex">
                <button
                  className="border rounded-md mx-2 py-1 cursor-pointer  border-black px-4"
                  onClick={async () => {
                    await signOutUser();
                    window.location.reload();
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </footer>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col items-center justify-center">
      <footer className="relative z-10 -mx-4 shadow-lg ring-1 ring-indigo-500/10 rounded-b-3xl w-full text-center">
        <div className="absolute -bottom-px left-1/2 -ml-48 flex h-[2px] w-96">
          <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          <div className="-ml-[100%] w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
        </div>
        <div className="relative bg-white px-4 py-10 sm:rounded-3xl sm:px-10">
          <div className="px-8 flex justify-between py-2 items-center">
          <h1 className="text-2xl bg-gradient-to-br bg-clip-text text-transparent from-blue-600 via-indigo-300 to-pink-400">Lista de games</h1>
            <div className="flex">
              <Link
                className="inline-flex gap-0.5 justify-center overflow-hidden text-xl font-medium transition rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-1 dark:ring-inset dark:ring-indigo-400/20 dark:hover:bg-indigo-400/10 dark:hover:text-indigo-300 dark:hover:ring-indigo-300"
                href="/auth"
              >
                Logar
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </Container>
  );
}

export default Navigation;
