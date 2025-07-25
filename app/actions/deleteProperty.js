"use server";
import Property from "@/models/Property";
import connectDB from "@/config/db";
import cloudinary from "@/config/cloudinary";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

export default async function deleteProperty(propertyId) {
  await connectDB;
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId)
    throw new Error("User Id is required");

  const { userId } = sessionUser;
  const property = await Property.findById(propertyId);

  if (!property) throw new Error("Property Not Found");
  if (property.owner.toString() != userId) throw new Error("Unauthorized!");

  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split("/");
    return parts.at(-1).split(".").at(0);
  });

  if (publicIds.length > 0) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy("NextStay/" + publicId);
    }
  }
  await property.deleteOne();
  revalidatePath("/", "layout");
}
