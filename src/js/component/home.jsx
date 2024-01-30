import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    createUser()
    takeList()

  }, [])

  useEffect(() => {

    sendList()

  }, [todos])

  const createUser = async () => {

    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Emax', {

        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const transform = await response.json()
      console.log(transform.msg)

      return transform
    }

    catch (e) {

    }

  }

  const takeList = async () => {

    try {

      const previewResponse = await fetch(
        'https://playground.4geeks.com/apis/fake/todos/user/Emax'
      )

      if (!previewResponse.ok) {
        throw Error(previewResponse.statusText);
      }

      const transform = await previewResponse.json()
      setTodos(transform)

    }

    catch (e) {

      console.log("error", e)
    }

  }

  const sendList = async () => {

    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/Emax', {

        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        }

      })

      if (!response.ok) {
        throw Error(response.statusText);
      }

      const transform = await response.json()
      console.log(transform.msg)

      return transform
    }

    catch (e) {

    }

  }

  const pressEnter = async (e) => {
    try {
      if (e.key === "Enter" && inputValue !== "") {

        let obj = {
          label: inputValue,
          done: false
        }

        setTodos([...todos, obj]);
        setInputValue("");

        const final = await sendList()
        console.log("informacion enviada", final)

      }
    }
    catch (e) {
      console.log("Hubo un error", e)
    }

  }

  return (

    <div className="Container">

      <h1 className="title">Todos</h1>

      <ul className="list-group list-group-flush">

        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={(e) => pressEnter(e)}
          placeholder="What do you need to do?" />

        {todos.map((item, index) => (

          <li className="list-group-item li-c" key={index}>

            {item.label}

            <button onClick={() => {
              const updatedTodos = todos.filter(
                (_, currentIndex) => index != currentIndex
              );

              setTodos(updatedTodos);

            }}>  <i
              className="fa-solid fa-trash-can"
            ></i></button>

          </li>
        ))}

      </ul>

      <div className="items">{todos.length} items left</div>

    </div>
  );
};

export default Home;