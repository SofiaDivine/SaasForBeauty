import { cache } from "react";
import { connection } from "next/server";
import { auth } from "@/auth";

export const getSession = cache(async () => {
  await connection();
  return auth();
});
