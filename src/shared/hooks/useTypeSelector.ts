import { RootState } from "@/app/providers/StoreProvider/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
