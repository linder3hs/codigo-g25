import { useEffect } from "react";
import { getSession } from "@/services/supabase";
import { Outlet } from "react-router";

export function Protected() {
  const validateSession = async () => {
    await getSession();
  };

  useEffect(() => {
    validateSession();
  }, []);

  return <Outlet />;
}
