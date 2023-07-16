"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, FC } from "react";
import {
  signUpUserWithEmailAndPassword,
  getCurrentUser,
} from "@/firebase/auth";

const LogUp: FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onFormDataChange = (e: { target: { name: any; value: any } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "É necessário confirmar a senha";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const onFormDataSubmit = async () => {
    if (validateForm()) {
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
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
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
          {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword}</span>
          )}
        </div>
        <button
          type="button"
          onClick={onFormDataSubmit}
          className="bg-indigo-700 text-white my-4 px-8 rounded-md uppercase"
        >
          criar
        </button>
      </div>
    </div>
  );
}

export default LogUp;
