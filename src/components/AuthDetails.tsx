import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

interface CustomUser extends User {
  user: string;
}

const AuthDetails: React.FC = () => {
  const [authUser, setAuthUser] = useState<CustomUser | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({ ...user, user: "" }); // Replace "" with the appropriate value for the `user` property
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-24 mx-auto">
      <SignIn />
      <SignUp />
      <div className="flex justify-center items-center my-4 flex-col space-y-4">
        {authUser ? (
          <>
            <button className="rounded-md text-white bg-indigo-500 px-4 py-2" >{`Signed In as ${authUser.email}`}</button>
            <button className="rounded-md text-white bg-indigo-500 px-4 py-2" onClick={userSignOut}>Sign Out</button>
          </>
        ) : (
          <button className="rounded-md text-white bg-indigo-500 px-4 py-2">Signed Out</button>
        )}
      </div>
    </div>
  );
};

export default AuthDetails;
