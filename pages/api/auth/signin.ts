import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import * as jose from "jose";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const errors: string[] = [];
    const { email, password } = req.body;

    const validateSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: "Password is invalid",
      },
    ];
    validateSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });
    if (errors.length) {
      return res.status(400).json({
        errorMessage: errors[0],
      });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userWithEmail) {
      return res.status(401).json({
        errorMessage: "Email or Password is invalid",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      userWithEmail.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        errorMessage: "Email or Password is invalid",
      });
    }
    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: userWithEmail.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);
    return res.status(200).json({
      token: token,
    });
  }
  return res.status(404).json("Unknown endpoint");
};
export default handler;
