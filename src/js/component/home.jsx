import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
      console.log("error", e)
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
      console.log("error", e)
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

  const confirmDelete = (index) => {
    Swal.fire({
      title: "¿You have completed this task?",
      showDenyButton: true,
      confirmButtonText: `Yes, completed`,
      denyButtonText: `No, not yet`,
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedTodos = todos.filter((_, currentIndex) => index !== currentIndex);
        setTodos(updatedTodos);
      }
    });
  };

  return (

    <div className="cont">

      <h1 className="title">Todos</h1>

      <div className="bac-list">

        <ul className="list-group list-group-flush">

          <input className="custom-input"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => pressEnter(e)}
            placeholder="New task +" />

          {todos.map((item, index) => (

            <div className="li-cont">

              <li className="list-group-item li-c" key={index}>

                {item.label}

                <button className="confirm-bu" onClick={() => confirmDelete(index)}>
                  <i class="fa-solid fa-xmark fa-beat fa-xl" style={{ Color: "#ff0000" }}></i>
                </button>

              </li>

            </div>
          ))}

        </ul>

      </div>

      <p className="items">Do you have {todos.length} pending tasks</p>

    </div>
  );
};

export default Home;