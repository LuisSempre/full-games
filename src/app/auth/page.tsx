import LogIn from "@/components/LogIn";
import LogUp from "@/components/LogUp";

function SignIn() {
  return (
    <div className="max-w-7xl mx-auto p-4 justify-center items-center flex">
      <div>
        <LogIn />
        <LogUp />
      </div>
    </div>
  );
}

export default SignIn;
