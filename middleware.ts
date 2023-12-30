import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export const middleware = async (req: NextRequest, res: NextResponse) => {
  console.log("i am the middleware and i was called before the endpoint");
  const bearerToken = req.headers.get("authorization") as string;

  if (!bearerToken) {
    // IN PAGES API
    // return res.status(401).json({
    //   errorMessage: "unauthorized request( no bearer token)",
    // });

    // IN MIDDLEWARE
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    // IN PAGES API
    // return res.status(401).json({
    //   errorMessage: "unauthorized request (no token)",
    // });

    // IN MIDDLEWARE
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    // IN PAGES API
    // return res.status(401).json({
    //   errorMessage: "unauthorized request (token invalid)",
    // });

    // IN MIDDLEWARE
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 401 }
    );
  }
};

export const config = {
  matcher: ["/api/auth/me"],
};
