import React from "react";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

interface ChatRowProps {
  id: string;
}

const ChatRow = ({ id }: ChatRowProps) => {
  const [active, setActive] = React.useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [messages] = useCollection(
    query(
      collection(db, "users", session?.user?.email!, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  React.useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(id));
  }, [pathname]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));

    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${id}`}
      className={`chatRow justify-between sm:justify-center ${
        active && "bg-gray-700/50"
      }`}
    >
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden sm:inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text ?? "New Chat"}
      </p>
      <TrashIcon
        className="h-5 w-5 text-white-700 hover:text-red-700"
        onClick={removeChat}
      />
    </Link>
  );
};

export default ChatRow;
