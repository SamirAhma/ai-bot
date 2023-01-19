import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
const COOKIE_NAME = "helloworldrandom";
import ChatLine from "./ChatLine";
import Loading from "./Loading";
import Form from "./Form";
// import { animateScroll as scroll } from "react-scroll";

import * as Scroll from "react-scroll";
const Chat = ({ data }: any) => {
  var scroller = Scroll.animateScroll;

  const scroll = () => {
    scroller.scrollToBottom({
      duration: 1000,
      delay: 100,
      smooth: true,
      containerId: "containerId",
      offset: 200,
    });
  };
  const [messages, setMessages] =
    useState<{ message: string; who: string; time: string }[]>(data);

  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  const sendMessage = async (message: string) => {
    if (!message) {
      return null;
    }

    setInput("");
    setLoading(true);

    const newMessages = [
      ...messages,
      { message: message, who: "user", time: new Date().toISOString() },
    ];

    setMessages(newMessages);

    let last10messages = newMessages.slice(-10);

    const postChat = async () => {
      try {
        const response = await axios.post("/api/chat", {
          messages: last10messages,
          user: cookie[COOKIE_NAME],
        });
        return response.data;
      } catch (err) {
        console.error(err);
      }
    };

    const data = await postChat();

    //delete shite space
    const botNewMessage = data.text;
    setMessages([
      ...newMessages,
      { message: botNewMessage, who: "bot", time: new Date().toISOString() },
    ]);
    setTimeout(() => {
      scroll();
    }, 1);
    setLoading(false);
  };

  console.log(messages);
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg p-6">
        <Form
          sendMessage={sendMessage}
          loading={loading}
          input={input}
          setInput={setInput}
        />
        <div className="my-4">
          {messages.map(({ message, who }, index) => (
            <ChatLine key={index} who={who} message={message} />
          ))}
          {loading && <Loading />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
