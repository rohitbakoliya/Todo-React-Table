import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ReactTable from './components/ReactTable'
import Styles from './components/Styles'
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  const offset = 10,
    mxPages = 200;

  const randomPage = () => {
    return Math.floor(Math.random() * (mxPages - offset));
  };
  //to fecthing todos from jsonplaceholder
  const fetchTodos = async () => {
    let page = randomPage();
    axios
      .get(
        `https://jsonplaceholder.typicode.com/todos?_start=${page}&_end=${page+offset}`
      )
      .then((res) => {
        console.log(res.data)
        setTodos(res.data);
      })
      .catch((err) => alert(err.toString()));
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const columns = useMemo(()=>[
    {
      Header: 'Todos',
      accessor: 'title',
    },
    {
      Header: 'Status',
      accessor: 'completed',
      Cell: ({value})=> value === true ? "Done" : value === false ?  "Remaining" : "Active",
    }
  ], []);

  //handle clicks on todos and changes the states accordingly.
  const handleClick = (e)=>{
    if(hoveredRow!==null){
      const newTodos = [...todos]
      newTodos[hoveredRow].completed = newTodos[hoveredRow].completed === 'Active' ? true : 'Active'
      setTodos(newTodos)
      if(newTodos[hoveredRow].completed === true)
        setHoveredRow(null)
    }
  }

  const data = useMemo(()=>todos, [todos]);

  return (
    <Styles>
      <h1 className="heading">
        Todo's Table
      </h1>
      <ReactTable
        columns = {columns}
        data = {data}
        getHeaderProps = {()=>({
          style: {
            backgroundColor : '#074874',
            color : 'white',
            fontSize: '20px'
          },
        })}
        getRowProps = {(row) => ({
          onMouseEnter: (e) => {
            if(!row.values.completed || row.values.completed === 'Active'){
              setHoveredRow(row.index)
            }else{
              setHoveredRow(null)
            }
          },
          onMouseLeave: (e) => {
            setHoveredRow(null)
          },
          style: {
            backgroundColor : row.values.completed === false ? '#F3D9D9' : row.values.completed === true ? '#C4F7DF' :'#CED8F9' ,
            textDecoration : !row.values.completed && hoveredRow === row.index ? 'line-through' : 'none',
            cursor : (!row.values.completed || row.values.completed === 'Active') && hoveredRow === row.index ? 'pointer':'default'
          },
          onClick: handleClick
        })}
        getCellProps={({value}) => ({
            style: {
              color : value === false ? '#C62828' : value === true ? '#0BB060' : value === 'Active'? 'blue' : 'black',
            },
        })}
      />
    </Styles>
  );
}

export default App;