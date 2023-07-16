"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  signInUserWithEmailAndPassword,
  getCurrentUser,
} from "@/firebase/auth";

function LogIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const onFormDataChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "E-mail é obrigatório";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Senha requerida";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "A senha deve ter no mínimo 8 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onFormDataSubmit = async () => {
    if (validateForm()) {
      await signInUserWithEmailAndPassword(formData.email, formData.password);
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
      <h1 className="text-xl font-bold">Entrar com conta:</h1>
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
          {errors.email && <span className="text-red-500">{errors.email}</span>}
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
          {errors.password && <span className="text-red-500">{errors.password}</span>}
        </div>
        <button
          type="button"
          onClick={onFormDataSubmit}
          className="bg-indigo-700 text-white my-4 px-8 rounded-md uppercase"
        >
          entrar
        </button>
      </div>
    </div>
  );
}

export default LogIn;
