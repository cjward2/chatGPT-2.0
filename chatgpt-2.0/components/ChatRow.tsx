import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

interface ChatRowProps {
  id: string;
}

const ChatRow = ({ id }: ChatRowProps) => {
  return (
    <Link href={`/chat/${id}`} className={`chatRow justify-center`}>
      <ChatBubbleLeftIcon className="h-5 w-5" />
      <p className="flex-1 hidden md:inline-flex truncate">New chat</p>
      <TrashIcon className="h-5 w-5 text-gray-700 hover:text-red-700" />
    </Link>
  );
};

export default ChatRow;