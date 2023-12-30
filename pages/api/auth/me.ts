import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // const bearerToken = req.headers["authorization"] as string;

  // if (!bearerToken) {
  //   return res.status(401).json({
  //     errorMessage: "unauthorized request( no bearer token)",
  //   });
  // }

  // const token = bearerToken.split(" ")[1];

  // if (!token) {
  //   return res.status(401).json({
  //     errorMessage: "unauthorized request (no token)",
  //   });
  // }

  // const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  // try {
  //   await jose.jwtVerify(token, secret);
  // } catch (error) {
  //   return res.status(401).json({
  //     errorMessage: "unauthorized request (token invalid)",
  //   });
  // }
  /////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1];
  /////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////

  const payload = jwt.decode(token) as { email: string };
  if (!payload) {
    return res.status(401).json({
      errorMessage: "unauthorized request (token invalid)",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },

    // select what you want
    // everything except the password
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  return res.json({
    user,
  });
};
export default handler;
