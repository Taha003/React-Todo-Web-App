import React, { useState, useEffect } from 'react'
import '../App.css'
import todoImage from '../Assets/todoImage.jpg'
//getting todo items from local storage and saving them as an array so I can pass them on map method
const getData = () => {
  let todoList = localStorage.getItem("mytodo");
  if (todoList) {
    return JSON.parse(todoList)
  }
  else {
    return [];
  }
}
const backgroundImage= {
  width: '100vw',
  height: '100vh',
  backgroundImage: `url(https://media.istockphoto.com/id/1293850746/photo/to-do-list.jpg?b=1&s=170667a&w=0&k=20&c=TnvCl7dU0GaKiMoK6ma9fZV_eBsxNBRmc51r-dBDsRY=)`,
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}

const Todo = () => {

  //created Input field:
  const [inp, setInp] = useState("")
  //push input text in this array:where get Data is getting array from local storage using JSON.parse
  const [todo, setTodo] = useState(getData());
  //using when editing my text my matching the id:
  const [editId, seteditId] = useState("");
  //sending input data object in seTodo where new Date creates unique object so I can edit and delete my data easily
  const inpData = {
    id: new Date().getTime().toString(),
    txt: inp,
  }
  //addig input value in todo array where ...todo saves the previous values as well input Data passes an array of object
  const addTodo = () => {
    if (inp.length > 0) {
      setTodo([...todo, inpData])
    }
    setInp("")
  }


  //deleting the note where index is that id on which user clicks if the id is equal to filtered todo id then we will remove it and
  //render all other todos
  const delNote = (index) => {
    console.log(index)
    let updatedList = todo.filter((elem) => {
      return index !== elem.id
    })
    setTodo(updatedList)
  }
  //edit todo find the todo that I want to edit and showing the text of that todo in my input box and then removing that todo
  const editTodo = (index) => {
    let editedList = todo.find((elem) => {
      return elem.id === index
    })

    setInp(editedList.txt);
    let editedList1 = todo.filter((e) => {
      return e.id !== index
    })
    setTodo(editedList1)
  }
  //setting up todo items in the form of string in local storage
  useEffect(() => {
    localStorage.setItem('mytodo', JSON.stringify(todo))
  }, [])





  return (
    <div style={{backgroundImage}}>
        <h1 style={{fontFamily:'monospace',color:'blue'}}>My Todo</h1>
      <div className="input-group mx-auto inpBox">

        <input type="text" className="form-control inp" placeholder="Add Todo" aria-label="Username" aria-describedby="basic-addon1" style={{ border: '1px solid black' }} value={inp} onChange={(e) => { setInp(e.target.value) }} />
       
      </div>
      <button className='btn btn-primary my-2 mx-5' style={{ border: '1px solid black' }} onClick={addTodo}>ADD TODO</button>
      <div className='container'>
        {todo.map((e) => {
          return <li key={e.id}>{e.txt} <button className='btn btn-danger my-2' onClick={() => delNote(e.id)}>delete</button> <button type="" className='btn btn-warning' onClick={() => editTodo(e.id)}>edit</button></li>
        })}
      </div>

    </div>
  )
}
export default Todo