import axios from "@/shared/core/axios";

interface IParams {
  id: string;
  type: "google";
  email: string;
  name: string;
}
export const loginWithOtherSocials = async ({
  id,
  type,
  email,
  name,
}: IParams) => {
  const { data } = await axios.post(
    "/login_or_register_with_google_yandex_apple",
    {
      type: type,
      soc_network_id: id,
      email: email,
      name: name,
    }
  );

  return { token: data.token, user: data.user };
};
