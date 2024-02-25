import dayJs from "@/shared/core/dayjs";
import { timezoneData } from "@/shared/core/timezone";
import { cookies } from "next/headers";

export const setCookiesTimezoneUser = async () => {
  "use server";
  const cookiesStore = cookies();

  const utcCount = dayJs().utcOffset() / 60;
  const utc = `UTC${utcCount > 0 ? "+" : "-"}${utcCount}`;
  const userTimezone = timezoneData.find((time) => time.utc === utc);

  const utcId = cookiesStore.get("utc_id")?.value;

  if (userTimezone && (!utcId || utcId?.length === 0)) {
    cookiesStore.set("utc_id", `${userTimezone.id}`);
    cookiesStore.set("timezone", userTimezone.utc);
  }
};
