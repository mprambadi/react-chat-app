import React from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";
import Add from "./Add";
import List from "./List";
import "./message.css";

const Message = ({ user }) => {
  return (
    <div className="FullHeight flex d-flex flex-column justify-content-between">
      <List user={user}/>
      <Add user={user} />
    </div>
  );
};

export default Message;
