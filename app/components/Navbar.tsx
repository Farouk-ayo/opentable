"use client";

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signOut } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex">
          {loading ? null : data ? (
            <div className="flex justify-center items-center gap-6">
              <Link href="/account" className="font-lg font-medium">
                {data.firstName}
              </Link>
              <button
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
                onClick={signOut}
              >
                Sign out
              </button>
            </div>
          ) : (
            <>
              <AuthModal isSignin={true} />
              <AuthModal isSignin={false} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
