import React from "react";
import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

interface ChatPageProps {
  params: {
    id: string;
  };
}

const ChatPage = ({ params: { id } }: ChatPageProps) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Chat chatId={id} />

      <ChatInput chatId={id} />
    </div>
  );
};

export default ChatPage;
