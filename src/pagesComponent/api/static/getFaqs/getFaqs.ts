import { TypeFaq } from "@/shared/types/faq";
import axios from "axios";

export const getFaqs = async (): Promise<TypeFaq[]> => {
  try {
    const { data } = await axios("/get_all_faqs");
    return data.data;
  } catch (error) {
    return [];
  }
};
