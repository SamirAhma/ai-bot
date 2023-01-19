import React from "react";
import clsx from "clsx";
const Chat = ({ who, message }: any) => {
  const convertNewLines = (text: string) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        <br />
      </span>
    ));
  const formattedMessage = convertNewLines(message);
  if (!message) {
    return null;
  }
  return (
    <>
      <div
        className={clsx(
          " rounded-lg p-4 my-1",
          who == "bot" ? "bg-gray-200" : "bg-gray-400"
        )}
      >
        <p className="text-gray-700">{formattedMessage}</p>
      </div>
    </>
  );
};

export default Chat;
