function HabitList({ habits, onToggle, onDelete, onReset }) {
  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <li className={`habit-item ${habit.done ? "done" : ""}`}>
          <span 
            className="habit-name" 
            onClick={() => onToggle(habit.id)}
          >
            {habit.name} 🔥 {habit.streak}
          </span>

          <div className="actions">
            <button onClick={() => onReset(habit.id)}>🔄</button>
            <button onClick={() => onDelete(habit.id)}>❌</button>
          </div>
        </li>

      ))}
    </ul>
  );
}

export default HabitList;

