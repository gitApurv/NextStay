"use client";
import { useState } from "react";
import markMessageAsSeen from "@/app/actions/markMessageAsSeen";
import deleteMessage from "@/app/actions/deleteMessage";
import { toast } from "react-toastify";
import { useGlobalContext } from "@/context/globalContext";

const MessageCard = ({ message }) => {
  const [isSeen, setIsSeen] = useState(message.seen);
  const { setUnseenCount } = useGlobalContext();

  const handleMarkAsSeen = async () => {
    const seen = await markMessageAsSeen(message._id);
    setIsSeen(seen);
    setUnseenCount((prev) => (seen ? prev - 1 : prev + 1));
    toast.success(`Marked as ${seen ? "Seen" : "Unseen"}`);
  };

  const handleDelete = async () => {
    await deleteMessage(message._id);
    setUnseenCount((prev) => prev - 1);
    toast.success("Message Deleted");
  };

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isSeen && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry: </span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(message.createdAt).toISOString()}
        </li>
      </ul>
      <button
        className={`mt-4 mr-3 ${
          isSeen ? "bg-red-500" : "bg-blue-500"
        } text-white py-1 px-3 rounded-md`}
        onClick={handleMarkAsSeen}
      >
        {isSeen ? "Mark As Unseen" : "Mark As Seen"}
      </button>
      <button
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
export default MessageCard;
