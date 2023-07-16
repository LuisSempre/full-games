"use client";

import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { signUpUserWithEmailAndPassword,getCurrentUser } from "@/firebase/auth";

function LogUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });

  const onFormDataChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormDataSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
    } else {
      await signUpUserWithEmailAndPassword(formData.email, formData.password);
      router.push("/");
    }
  };

  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        router.replace("/");
      }
    });
  }, [router]);

  return (
    <div className="text-indigo-800">
      <h1 className="text-xl font-bold">Criar conta:</h1>
      <div>
        <div>
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            name="email"
            id=""
            value={formData["email"]}
            onChange={onFormDataChange}
            className="border border-indigo-700 block rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="">
            Senha
          </label>
          <input
            type="password"
            name="password"
            id=""
            value={formData["password"]}
            onChange={onFormDataChange}
            className="border border-indigo-700 block rounded-md"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="">
            Confirmar senha
          </label>
          <input
            type="password"
            name="confirmPassword"
            id=""
            value={formData["confirmPassword"]}
            onChange={onFormDataChange}
            className="border border-indigo-700 block rounded-md"
          />
        </div>
        <button 
          type="button" 
          onClick={onFormDataSubmit}  
          className="bg-indigo-700 text-white my-4 px-8 rounded-md uppercase">
          criar
        </button>
      </div>
    </div>
  );
}

export default LogUp;
