import React from "react";

const Textarea = ({ sendMessage, loading, input, setInput, scroll }: any) => {
  // { sendMessage, loading, input, setInput, scroll }: any
  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        className="w-full p-2 rounded-lg"
        placeholder="Type your message here..."
        id="message"
        readOnly={loading}
        value={input}
        onKeyDown={(e) => {
          setTimeout(() => {
            scroll;
          }, 1);
          if (e.key === "Enter") {
            e.preventDefault();
            sendMessage(input);
          }
        }}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setInput("");
          sendMessage(input);
        }}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg"
      >
        Send
      </button>
    </form>
  );
};

export default Textarea;
