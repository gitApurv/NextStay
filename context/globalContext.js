"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import getUnseenMessageCount from "@/app/actions/getUnseenMessageCount";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [unseenCount, setUnseenCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (session && session.user) {
      getUnseenMessageCount().then((res) => {
        if (res.unseenCount) setUnseenCount(res.unseenCount);
      });
    }
  }, [getUnseenMessageCount, session]);

  return (
    <GlobalContext.Provider value={{ unseenCount, setUnseenCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
