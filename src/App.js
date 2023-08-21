import './App.css';
import React, { useState, useEffect, useRef } from 'react';

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

function App() {
  const [count, setCount] = useState(0);
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

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Counter App</h1>
      <p>You've clicked {count} times.</p>
      <ul>
        {items.map((item) => (
          <ListItem
            key={item.id}
            value={item.value}
            increment={incrementCount}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
