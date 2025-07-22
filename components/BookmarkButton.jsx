"use client";
import { FaBookmark } from "react-icons/fa";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

const BookmarkButton = ({ property }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((res) => {
      if (res.error) {
        toast(res.error);
        return;
      }
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [userId, property, isBookmarked]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to be signed in to bookmark a property");
      return;
    }
    bookmarkProperty(property._id).then((res) => {
      if (res.error) return toast.error(res.error);
      toast.success(res.message);
      setIsBookmarked(res.isBookmarked);
    });
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <button
      className={`${isBookmarked ? "bg-red-500" : "bg-blue-500"} hover:${
        isBookmarked ? "bg-red-600" : "bg-blue-600"
      } text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center`}
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" />
      {isBookmarked ? "Remove Bookmark" : "Bookmark Property"}
    </button>
  );
};

export default BookmarkButton;
