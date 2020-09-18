import React from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_TODO = gql`
  mutation AddTodo($title: String!, $user: String!) {
    insert_messages(objects: { title: $title, user: $user }) {
      returning {
        id
        title
      }
    }
  }
`;

const Add = ({ user }) => {
  let input;
  const [addTodo, { data }] = useMutation(ADD_TODO);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.value.trim().length) {
            addTodo({ variables: { title: input.value, user } });
            input.value = "";
          }
        }}
      >
        <div className="d-flex mb-2">
          <textarea
            className="form-control"
            ref={(node) => {
              input = node;
            }}
          />
          <button type="submit" className="btn btn-primary px-5">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
