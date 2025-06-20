import { useEffect, useState } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";

const query = gql`
  query GetTodosWithUser {
    getToDo {
      title
      completed
      user {
        name
      }
    }
  }
`;

function App() {
 
  const { loading, data } = useQuery(query);

  if (loading) return <h1>Loading..</h1>;
 
  return (
    
    <div>
      {data?.getToDo?.map((todo, idx) => (
        <div key={idx}>
          <p><strong>Title:</strong> {todo.title}</p>
          <p><strong>Completed:</strong> {todo.completed ? "Yes" : "No"}</p>
          <p><strong>User:</strong> {todo.user.name}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
