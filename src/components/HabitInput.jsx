function HabitInput({ input, setInput, onAdd }) {
  return (
    <div className="add-habit">
      <input
        type="text"
        placeholder="Add a habit..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={onAdd}>Add</button>
    </div>
  );
}

export default HabitInput;
