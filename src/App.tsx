import { useEffect, useState } from "react";

import type { Schema } from "../amplify/data/resource"; //Original: also imported '{data, type: Schema}'.
import { generateClient } from "aws-amplify/data";


const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Journal"]["type"]>>([]);

  useEffect(() => {
    client.models.Journal.observeQuery().subscribe({
    // client.models.Journal.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]), //when did it renamed to 'items'?
    });
  }, []);

  function createJournal() {
    client.models.Journal.create({ description: window.prompt("Description") });
  }

  async function updateJournal(id: string, fieldToUpdate: string) {
    const todo = {
      id: id,
      [fieldToUpdate]: window.prompt("Edit field"),
    };

    //   async function updateJournal(id: string ) {
    // const todo = {
    //   id: id,
    //   description: window.prompt("Edit field"),
    // };

    client.models.Journal.update(todo);
  }

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createJournal}>+ new</button>
      <ul>
        {todos.map((anywhat) => (
          <>
            <li
              key={anywhat.id}
              onClick={() => updateJournal(anywhat.id, "description")}
            >
              {anywhat.description}
              {anywhat.account}
              {anywhat.amount}
              {anywhat.sign}
            </li>
          </>
        ))}
      </ul>
      <table>
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
          {todos.map((anywhat, rowIndex) => (
            <tr key={anywhat.id}>
              <td
                key={`cell-${rowIndex}-date`}
                onClick={() => updateJournal(anywhat.id, "anywhat.sign")}
              >
                {anywhat.date}
              </td>
              <td>{anywhat.journalNumber}</td>
              <td> {anywhat.account}</td>
              <td>{anywhat.description}</td>
              <td> {anywhat.amount}</td>
              <td> {anywhat.sign}</td>
            </tr>
          ))}
        </tbody>
     </table>
    </main>
  );
}

export default App;
