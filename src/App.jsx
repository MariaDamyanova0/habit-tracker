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
  const [category, setCategory] = useState("Morning");


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
        category: category, 
        streak: 0,
        lastCompleted: null
      }

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

  const presets = {
    morning: ["Drink water", "Stretch", "Breathe 5 min", "Gratitude"],
    midday: ["Walk 5 min", "Posture reset", "Eye rest"],
    evening: ["Journal", "No phone 30 min", "Stretch"]
  };

  function addPreset(type) {
    const newHabits = presets[type].map(name => ({
      id: Date.now() + Math.random(),
      name,
      done: false,
      streak: 0,
      category:
        type === "morning" ? "Morning" :
        type === "midday" ? "Midday" :
        "Evening"
    }));

  setHabits(prev => [...prev, ...newHabits]);
  }

  return (
    <div className="app">
      <div className="left">
        <h1>Evia Flow - Daily Flow</h1>

        <div className="add-habit">
          {/* ONE ROW: input + select + add */}
          <div className="add-row">
            <input
              type="text"
              placeholder="Add a ritual (meditate, stretch, hydrate...)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Morning">🌅 Morning</option>
              <option value="Midday">🌤 Midday</option>
              <option value="Evening">🌙 Evening</option>
            </select>

            <button onClick={addHabit}>Add</button>
          </div>

          {/* SECOND ROW: presets under the input row */}
          <div className="presets">
            <button onClick={() => addPreset("morning")}>🌅 Morning Reset</button>
            <button onClick={() => addPreset("midday")}>🌤 Midday Reset</button>
            <button onClick={() => addPreset("evening")}>🌙 Evening Grounding</button>
          </div>
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
