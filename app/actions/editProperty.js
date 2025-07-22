"use server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/config/cloudinary";

async function editProperty(formData) {
  const propertyId = formData.get("propertyId");
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId)
    throw new Error("User ID is required");

  const { userId } = sessionUser;

  const amenities = formData.getAll("amenities");
  const images = formData
    .getAll("images")
    .filter((image) => image.name !== "undefined");

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: formData.get("beds"),
    baths: formData.get("baths"),
    square_feet: formData.get("square_feet"),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const imageUrls = [];
  if (images.length > 0) {
    for (const imageFile of images) {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      const imageBase64 = imageData.toString("base64");
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "NextStay",
        }
      );
      imageUrls.push(result.secure_url);
    }
  }

  const propertyToEdit = await Property.findById(propertyId);

  propertyData.images =
    imageUrls.length > 0 ? imageUrls : propertyToEdit.images;
  await Property.findByIdAndUpdate(propertyId, propertyData);

  revalidatePath("/", "layout");
  redirect(`/properties/${propertyId}`);
}

export default editProperty;
