import React from 'react';
import logo from './logo.svg';
import './TodoApp.css';

const TodoForm = ({addTodo}) =>{
  //input tracker
  let input;

  return(
    <div>
      <input ref={node =>{
        input = node;
      }} placeholder="What should I do?"/>
      <button onClick={() => {
        addTodo(input.value);
        input.value = '';
      }}>
        +
      </button>
    </div>
  )
}

const Todo = ({todo, remove}) => {
  // Each Todo
  return (<li onClick={()=>{remove(todo.id)}}>{todo.text}</li>);
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  });
  return(<ul>{todoNode}</ul>);
}

const Title = () => {
  return (
    <div>
      <div>
        <h1> MY TO-DO LIST - made by React <img src={logo} className="App-logo" alt="logo" /></h1>
      </div>
    </div>
  )
}

// Container Component
// Todo ID
window.id = 0 ;
class TodoApp extends React.Component {
  constructor(props) {
    // pass props to parent class
    super(props);
    // Set initial state
    this.state = {
      data: []
    }
  }
  addTodo(val){
    // Assemble data
    const todo = {text: val, id: window.id++}
    // Update data
    this.state.data.push(todo);
    // Update state
    this.setState({data: this.state.data});
  }
  // Handle remove
  handleRemove(id){
    // Handle all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
        if (todo.id !== id) {
          return todo;
        }
    });
    this.setState({data: remainder});
  }

  render(){
    // render JSX
    return(
      <div>
        <Title/>
        <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
        />
      </div>
    );
  }
}

export default TodoApp;
