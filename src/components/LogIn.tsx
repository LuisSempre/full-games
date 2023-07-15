"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {signInUserWithEmailAndPassword,getCurrentUser} from "@/firebase/auth";

function LogIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: ""});

  const onFormDataChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormDataSubmit = async () =>{
    await signInUserWithEmailAndPassword(formData.email, formData.password);
    router.push("/");
  }

  useEffect(()=>{
    getCurrentUser().then((user) => {
      if (user) {
        router.replace("/");
      }
    })
  },[router]);

  return (
    <div>
      <h1 className="text-xl">Entrar com conta:</h1>
      <div>
        <div>
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input type="email" name="email" id="" value={formData["email"]} onChange={onFormDataChange} className="border border-black block" />
        </div>
        <div>
          <label htmlFor="password" className="font-semibold">
            Senha
          </label>
          <input type="password" name="password" id="" value={formData["password"]} onChange={onFormDataChange} className="border border-black block" />
        </div>
        <button type="button" onClick={onFormDataSubmit} className="bg-black text-white my-4 px-2 rounded-md uppercase">
          entrar
        </button>
      </div>
    </div>
  );
}

export default LogIn;
