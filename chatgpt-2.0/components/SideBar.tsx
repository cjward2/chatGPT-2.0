"use client";
import { useSession } from "next-auth/react";
import NewChat from "./NewChat";
import { signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import Link from "next/link";

const SideBar = () => {
  const { data: session } = useSession();

  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div>
          <NewChat />
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>

          <div className="flex flex-col space-y-2 my-2">
            {loading && (
              <div className="animate-pulse text-center text-white">
                <p>Loading Chats...</p>
              </div>
            )}

            {chats?.docs.map((chat) => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        <div className="text-white mb-2 flex flex-wrap gap-2 justify-center">
          <span className="hover:opacity-50 cursor-pointer">
            <Link href="/">Home</Link>
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hover:opacity-50 cursor-pointer">
            <Link href="/settings">Settings</Link>
          </span>
          <span className="hidden sm:inline">|</span>
          <span
            onClick={() => signOut()}
            className="hover:opacity-50 cursor-pointer"
          >
            Sign out
          </span>
        </div>
      )}
    </div>
  );
};

export default SideBar;
