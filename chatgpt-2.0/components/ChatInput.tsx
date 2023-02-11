"use client";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

interface ChatInputProps {
  chatId: string;
}

const ChatInput = ({ chatId }: ChatInputProps) => {
  const [prompt, setPrompt] = React.useState("");

  const { data: session } = useSession();

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image ||
          `https://ui-avatars.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    //toast notification to say loading
    const notifcation = toast.loading("ChatGPT is thinking...");

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // Toast notifccation to say succesful
      toast.success("ChatGPT has responded!", {
        id: notifcation,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form className="p-5 space-x-5 flex" onSubmit={sendMessage}>
        <input
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Type your message here"
          className="focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
        />
        <button
          type="submit"
          disabled={!prompt.trim() || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
        </button>
      </form>

      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
};

export default ChatInput;
