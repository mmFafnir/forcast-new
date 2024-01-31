import axios from "axios";

interface IConfirmParams {
  code: string;
  email: string;
}
export const confirm = async (params: IConfirmParams) => {
  const { data } = await axios.post("/confirm_register", params);
  console.log(data);
  return data;
};
