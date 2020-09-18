import React, { useEffect, useRef } from "react";
import { gql, useSubscription } from "@apollo/client";

const GET_MESSAGES_SUBSCRIPTION = gql`
  subscription MySubscription {
    messages {
      id
      title
      user
    }
  }
`;

const List = ({ user }) => {
  const { data, loading, error } = useSubscription(GET_MESSAGES_SUBSCRIPTION);

  const divRref = useRef(null);

  const scrollToBottom = () => {
    divRref.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [data]);

  const ListItem = () => {
    if (data.messages.length) {
      return data.messages.map((item) => (
        <div
          className={`alert ${
            user === item.user
              ? "alert-secondary text-left"
              : "alert-primary text-right"
          }`}
        >
          <div>{item.user} </div>
          <h3 className="text-black" style={{ wordWrap: "break-word" }}>
            {item.title}
          </h3>
        </div>
      ));
    }

    return <h1 className="text-center">Add A Mesage</h1>;
  };

  const Spinner = () => {
    return (
      <div
        className="d-flex align-items-center justify-content-center flex-column"
        style={{ height: "100vh" }}
      >
        Loading Message .....
        <div
          class="spinner-border text-primary text-center"
          role="status"
          style={{ width: "6rem", height: "6rem" }}
        >
          <span class="sr-only h1">Loading...</span>
        </div>
      </div>
    );
  };
  return (
    <div className="overflow-auto">
      {loading ? <Spinner /> : <ListItem />}

      <div ref={divRref} />
    </div>
  );
};

export default List;
