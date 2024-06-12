import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Journal"]["type"]>>([]);

  useEffect(() => {
    client.models.Journal.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Journal.create({ description: window.prompt("Todo content") });
  }

  async function updateTodo(id: string) {
    const todo = {
      id: id,
      description: window.prompt("Change content"),
    };

    client.models.Journal.update(todo);
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((anywhat) => (
          <>
            <li key={anywhat.id} onClick={() => updateTodo(anywhat.id)}>
              {anywhat.description}
              {anywhat.account}
              {anywhat.amount}
              {anywhat.sign}
            </li>

            <tbody>
              <thead>
                <tr>
                  <th>number</th>
                  <th>date</th>
                  <th>account</th>
                  <th>description</th>
                  <th>amount</th>
                  <th>sign</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </tbody>
          </>
        ))}
      </ul>
    </main>
  );
}

export default App;
