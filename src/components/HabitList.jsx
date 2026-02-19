function HabitList({ habits, onToggle, onDelete, onReset }) {
  const today = new Date().toDateString();

  return (
    <ul className="habit-list">
      {habits.map((habit) => {
        const isDoneToday = habit.lastCompleted === today;

        return (
          <li
            key={habit.id}
            className={isDoneToday ? "done" : ""}
          >
            <span>
              {habit.name} 🔥 {habit.streak}
            </span>

            <div className="actions">
              <button onClick={() => onToggle(habit.id)}>✔</button>
              <button onClick={() => onReset(habit.id)}>🔄</button>
              <button onClick={() => onDelete(habit.id)}>❌</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default HabitList;


