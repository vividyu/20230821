import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const countRef = useRef(count); // using useRef to track the latest value of count

  useEffect(() => {
    countRef.current = count;  // Update the ref with the latest value
  }, [count]);

  const [items, setItems] = useState([{ id: 1, value: "Item 1" }]);

  useEffect(() => {
    const newItems = items.map((item) => {
      if (item.id === 1) {
        return { ...item, value: `Item 1 (clicked ${count} times)` };
      }
      return item;
    });
    setItems(newItems);
  }, [count]);

  const incrementRef = useRef(null);
  if (!incrementRef.current) {
    incrementRef.current = () => {
      setCount(countRef.current + 1); // Using the ref's value for the increment
    };
  }

  return (
    <div>
      <h1>Counter App</h1>
      <p>You've clicked {count} times.</p>
      <ul>
        {items.map((item) => (
          <ListItem
            key={item.id}
            value={item.value}
            increment={incrementRef.current}
          />
        ))}
      </ul>
    </div>
  );
}

const ListItem = React.memo(({ value, increment }) => {
  const renders = useRef(0);
  renders.current++;

  return (
    <li>
      {value} - Rendered {renders.current} times
      <button onClick={increment}>Increment</button>
    </li>
  );
});

export default App;
