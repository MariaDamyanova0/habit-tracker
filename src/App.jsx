import { useState, useEffect } from "react";
import "./App.css";
import HabitInput from "./components/HabitInput";
import HabitList from "./components/HabitList";

function App() {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    const today = new Date().toDateString();

    setHabits((prev) =>
      prev.map((habit) =>
        habit.lastDone !== today
          ? { ...habit, done: false }
          : habit
      )
    );
  }, []);


  const addHabit = () => {
    if (!input.trim()) return;

    setHabits([
      ...habits,
      {
        id: Date.now(),
        name: input,
        streak: 0,
        lastCompleted: null,
      },
    ]);

    setInput("");
  };


  const toggleHabit = (id) => {
    const today = new Date().toDateString();

    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;

        if (habit.lastCompleted === today) {
          return habit; // already completed today
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const wasYesterday = habit.lastCompleted === yesterday.toDateString();

        return {
          ...habit,
          streak: wasYesterday ? habit.streak + 1 : 1,
          lastCompleted: today,
        };
      })
    );
  };




  const deleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  const resetStreak = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              streak: 0,
              lastCompleted: null,   
            }
          : habit
      )
    );
  };


  return (
    <div className="app">
      <div className="left">
        <h1>Habit Tracker</h1>

        <div className="add-habit">
          <input
            type="text"
            placeholder="Add a habit..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addHabit}>Add</button>
        </div>

        <HabitList
          habits={habits}
          onToggle={toggleHabit}
          onDelete={deleteHabit}
          onReset={resetStreak}
        />
      </div>

      <div className="right">
        <h2>Stats</h2>

        <div className="stats-card">
          <p>Total habits: {habits.length}</p>
          <p>Completed: {habits.filter((h) => h.done).length}</p>
          <p>
            Best streak:{" "}
            {habits.length
              ? Math.max(...habits.map((h) => h.streak))
              : 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
