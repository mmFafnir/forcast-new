import axios from "@/shared/core/axios";
import { ITelegramUser } from "../types";

export const loginInWebView = async (user: ITelegramUser) => {
  const { data } = await axios.post("/login_with_telegram_chat_id", {
    code: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    lang: user.language_code,
    user_name: user.username,
  });

  return data;
};
