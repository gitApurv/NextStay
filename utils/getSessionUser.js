import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getSessionUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;
  console.log(session.user.id);
  return {
    user: session.user,
    userId: session.user.id,
  };
};
