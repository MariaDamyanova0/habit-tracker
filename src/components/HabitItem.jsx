export default function HabitItem({ habit, onToggle }) {
  return (
    <li
      className={habit.done ? "done" : ""}
      onClick={() => onToggle(habit.id)}
      style={{ cursor: "pointer" }}
    >
      {habit.name} 🔥 {habit.streak}
    </li>
  );
}

