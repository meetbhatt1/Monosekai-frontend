import { useRouter } from "expo-router";

import { BottomNav } from "../ui";
import { APP_TAB_HREF } from "./app-tabs";

export function AppBottomNav({ active }) {
  const router = useRouter();

  return (
    <BottomNav
      active={active}
      onChange={(tab) => {
        router.replace(APP_TAB_HREF[tab]);
      }} />);


}