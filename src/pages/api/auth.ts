import { NextApiRequest, NextApiResponse } from "next";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Sucesso ao fazer login, retornar dados relevantes ou redirecionar para uma página
      res.status(200).json({ user: userCredential.user });
    } catch (error) {
      console.log(error); 
      if (error instanceof Error) {
         console.log(error);
       } else {
         console.log("Unknown error occurred");
       }
    }
  } else if (req.method === "PUT") {
    const { email, password } = req.body;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Sucesso ao criar usuário, retornar dados relevantes ou redirecionar para uma página
      res.status(200).json({ user: userCredential.user });
    } catch (error) {
      if (error instanceof Error) {
         console.log(error);
       } else {
         console.log("Unknown error occurred");
       } 
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
