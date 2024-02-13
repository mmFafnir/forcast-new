import { RootState } from "@/app/providers/StoreProvider/store";

export const selectActiveNotifyCount = (state: RootState) =>
  state.auth.notification.filter((not) => not.status === "1").length;
