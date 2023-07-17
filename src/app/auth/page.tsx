import Container from "@/components/Container";
import LogIn from "@/components/LogIn";
import LogUp from "@/components/LogUp";

function SignIn() {
  return (
    <Container className="flex flex-col items-center justify-center h-screen">
      <div className="relative z-10 shadow-lg ring-1 ring-indigo-500/10 rounded-xl sm:w-1/3 w-3/3 hover:border hover:border-indigo-100">
        <div className="absolute -bottom-px left-1/2 sm:-ml-48 -ml-24 flex h-[2px] sm:w-96 w-48">
          <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          <div className="-ml-[100%] w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
          <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
        </div>
        <div className="relative bg-white px-4 py-10 sm:rounded-3xl sm:px-10">
          <LogIn />
          <LogUp />
        </div>
      </div>
    </Container>
  );
}

export default SignIn;
