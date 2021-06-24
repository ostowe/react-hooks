// useState: greeting extra credit
// http://localhost:3000/isolated/exercise/01.extra-1.js

import * as React from 'react'

function Greeting(props) {
  const { initialName } = props;
  const [name, setName] = React.useState(initialName);

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Bob Johnson" />
}

export default App
