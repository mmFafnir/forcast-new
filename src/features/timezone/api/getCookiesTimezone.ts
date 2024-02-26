"use server";

import { cookies } from "next/headers";

export const getCookiesTimezone = async () => {
  const cookieStore = cookies();
  return cookieStore.get("utc_id");
};
