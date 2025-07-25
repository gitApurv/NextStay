"use server";
import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsSeen(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId)
    throw new Error("User ID is required");

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  if (message.recipient.toString() !== userId) throw new Error("Unauthorized");

  message.seen = !message.seen;

  await message.save();
  revalidatePath("/messages", "page");
  return message.seen;
}

export default markMessageAsSeen;
