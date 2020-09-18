import React from "react";
import { useDebounce } from "react-use";

const Welcome = ({ setValue, user }) => {
  const [text, setText] = React.useState("");

  const [, cancel] = useDebounce(
    () => {
      setValue(text);
    },
    2000,
    [text]
  );

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="border p-5 bg-secondary">
        <h1 className="text-center text-white">Chat App</h1>
        <input
          type="text"
          className="form-control"
          placeholder="Input your name"
          onChange={({ currentTarget }) => {
            setText(currentTarget.value);
          }}
        />
      </div>
    </div>
  );
};

export default Welcome;
