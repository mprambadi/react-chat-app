import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./client";
import Message from "./pages/message";
import Welcome from "./pages/welcome";
import { useLocalStorage } from "react-use";

function App() {
  const [user, setValue] = useLocalStorage("user", "");

  return (
    <ApolloProvider client={client}>
      <div className="container">
        {!!user.length ? (
          <Message user={user} />
        ) : (
          <Welcome setValue={setValue} />
        )}
      </div>
    </ApolloProvider>
  );
}

export default App;
