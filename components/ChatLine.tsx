import React from "react";
import clsx from "clsx";
const Chat = ({ who, message }) => {
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

{
  /* <div
          className={clsx(
            " rounded-lg p-4 mb-4",
            who == "bot" ? "bg-white" : "bg-indigo-100"
          )}
        >
          <div
            className={clsx(who == "bot" ? "text-gray-700" : "text-indigo-700")}
          >
            <p className="leading-5	"> {formattedMessage}</p>
          </div>
        </div> */
}
