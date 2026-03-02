function HabitList({ habits, onToggle, onDelete, onReset }) {
  if (habits.length === 0) {
    return (
      <div className="empty-state">
        <h3>✨ Start Your Flow</h3>
        <p>Add your first ritual to begin your day.</p>
      </div>
    );
  }

  const today = new Date().toDateString();

  const groups = {
    Morning: habits.filter((h) => h.category === "Morning"),
    Midday: habits.filter((h) => h.category === "Midday"),
    Evening: habits.filter((h) => h.category === "Evening"),
  };

  const renderGroup = (title, items) => (
    <div className="group">
      <h3>{title}</h3>
      <ul className="habit-list">
        {items.map((habit) => {
          const isDoneToday = habit.lastCompleted === today;

          return (
            <li key={habit.id} className={isDoneToday ? "done" : ""}>
              <span className="habit-name" onClick={() => onToggle(habit.id)}>
                {habit.name} 🔥 {habit.streak}
              </span>

              <div className="actions">
                <button onClick={() => onReset(habit.id)}>🔄</button>
                <button onClick={() => onDelete(habit.id)}>❌</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <>
      {renderGroup("🌅 Morning Flow", groups.Morning)}
      {renderGroup("🌤 Midday Reset", groups.Midday)}
      {renderGroup("🌙 Evening Grounding", groups.Evening)}
    </>
  );
}

export default HabitList;


