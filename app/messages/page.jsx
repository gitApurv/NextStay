import MessageCard from "@/components/MessageCard";
import connectDB from "@/config/db";
import Message from "@/models/Message";
import "@/models/Property";
import convertToSerializableObject from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";

const MessagesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  const { userId } = sessionUser;

  const seenMessages = await Message.find({ recipient: userId, seen: true })
    .sort({
      createdAt: -1,
    })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();
  const unseenMessages = await Message.find({ recipient: userId, seen: false })
    .sort({
      createdAt: -1,
    })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...unseenMessages, ...seenMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(message.sender);
    message.property = convertToSerializableObject(message.property);
    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>No Messages</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
