"use server";
import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function getUnseenMessageCount() {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId)
    throw new Error("User ID is required");

  const { userId } = sessionUser;
  const unseenCount = await Message.countDocuments({
    recipient: userId,
    seen: false,
  });
  return { unseenCount };
}

export default getUnseenMessageCount;
