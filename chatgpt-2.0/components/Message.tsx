import { DocumentData } from "firebase/firestore";
import React from "react";

interface MessageProps {
  message: DocumentData;
}

const Message = ({ message }: MessageProps) => {
  return <div>Message</div>;
};

export default Message;
