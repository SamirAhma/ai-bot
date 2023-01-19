import React from "react";

import Chat from "../components/Chat";
const test2 = ({ data }: any) => {
  return (
    <>
      <Chat data={data} />
    </>
  );
};

export default test2;

export async function getServerSideProps() {
  const fs = require("fs");
  // Create a function to read the data from the data.json file
  function readDataJson() {
    // Read and return the data from the data.json file
    return JSON.parse(fs.readFileSync("data/messages.json", "utf-8"));
  }

  // Read the data from the data.json file
  let data = readDataJson();

  // Log the data to the console

  return {
    props: { data }, // will be passed to the page component as props
  };
}
