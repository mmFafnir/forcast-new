import { TypeTab } from "@/shared/UI/Tabs/ui/Tab";
import { Login } from "../components/Login";

export const tabs: TypeTab[] = [
  {
    title: "login",
    id: "login",
    content: <Login />,
  },
  {
    title: "Ругистрация",
    id: "reg",
    content: <p>sad</p>,
  },
];
