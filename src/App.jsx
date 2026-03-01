import { useState, useEffect } from "react";
import "./App.css";
import HabitList from "./components/HabitList";

function App() {
  // Load habits from localStorage
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [category, setCategory] = useState("Morning");

  const [mood, setMood] = useState(() => {
    return localStorage.getItem("mood") || "";
  });

  const [reflection, setReflection] = useState(() => {
    const saved = localStorage.getItem("reflection");
    return saved
      ? JSON.parse(saved)
      : {
          aligned: "",
          drained: "",
          intention: "",
        };
  });

  // Save habits to localStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);
  
  useEffect(() => {
    localStorage.setItem("mood", mood);
  }, [mood]);

  useEffect(() => {
    localStorage.setItem("reflection", JSON.stringify(reflection));
  }, [reflection]);

  // Daily reset logic
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

  // Add habit
  const addHabit = () => {
    if (!input.trim()) return;

    setHabits([
      ...habits,
      {
        id: Date.now(),
        name: input,
        category,
        done: false,
        streak: 0,
        lastDone: null,
      },
    ]);

    setInput("");
  };

  // Toggle habit
  const toggleHabit = (id) => {
    const today = new Date().toDateString();
    
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              done: habit.lastDone === today ? false : true,
              streak:
                habit.lastDone === today
                  ? habit.streak
                  : habit.streak + 1,
              lastDone:
                habit.lastDone === today ? habit.lastDone : today,
            }
          : habit
      )
    );
  };

  // Delete habit
  const deleteHabit = (id) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  // Reset streak
  const resetStreak = (id) => {
    setHabits(
      habits.map((h) =>
        h.id === id
          ? { ...h, streak: 0, done: false }
          : h
      )
    );
  };
  
  const addPreset = (type) => {
  const presetHabits = {
    morning: ["Hydrate", "Gratitude", "Stretch"],
    midday: ["Walk", "Read 10 pages"],
    evening: ["Reflect", "Meditate"],
  };

  const selected = presetHabits[type];

  const newHabits = selected.map((name) => ({
    id: Date.now() + Math.random(),
    name,
    category:
      type === "morning"
        ? "Morning"
        : type === "midday"
        ? "Midday"
        : "Evening",
    done: false,
    streak: 0,
    lastDone: null,
  }));

  setHabits((prev) => [...prev, ...newHabits]);
};
  // -------- STATS LOGIC (CORRECT PLACE) --------
  const totalHabits = habits.length;
  const completedHabits = habits.filter((h) => h.done).length;

  const completionRate =
    totalHabits === 0
      ? 0
      : Math.round((completedHabits / totalHabits) * 100);

  // -------- RENDER --------
  return (
    <div className="app">
      <div className="left">
        <h1>Evia Flow - Daily Flow</h1>

        <div className="add-habit">
          <input
            type="text"
            placeholder="Add a ritual (meditate, stretch, hydrate...)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Morning">🌅 Morning</option>
            <option value="Midday">🌤 Midday</option>
            <option value="Evening">🌙 Evening</option>
          </select>

          <button onClick={addHabit}>Add</button>
        </div>
        
        <div className="presets">
          <button onClick={() => addPreset("morning")}>
            🌅 Morning Reset
          </button>

          <button onClick={() => addPreset("midday")}>
            🌤 Midday Reset
          </button>

          <button onClick={() => addPreset("evening")}>
            🌙 Evening Grounding
          </button>
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
          <p><strong>{completionRate}% Complete Today</strong></p>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>

          <p>Total habits: {totalHabits}</p>
          <p>Completed: {completedHabits}</p>
          <p>
            Best streak:{" "}
            {habits.length
              ? Math.max(...habits.map((h) => h.streak))
              : 0}
          </p>
        </div>

        <div className="energy-panel">

          <h3>Daily Energy</h3>

          <div className="mood-selector">
            <button onClick={() => setMood("🔥")} className={mood === "🔥" ? "active" : ""}>🔥</button>
            <button onClick={() => setMood("😊")} className={mood === "😊" ? "active" : ""}>😊</button>
            <button onClick={() => setMood("😌")} className={mood === "😌" ? "active" : ""}>😌</button>
            <button onClick={() => setMood("😴")} className={mood === "😴" ? "active" : ""}>😴</button>
          </div>

          <div className="reflection-questions">

            <label>✨ What felt aligned today?</label>
            <textarea
              value={reflection.aligned}
              onChange={(e) =>
                setReflection({ ...reflection, aligned: e.target.value })
              }
            />

            <label>🌊 What drained my energy?</label>
            <textarea
              value={reflection.drained}
              onChange={(e) =>
                setReflection({ ...reflection, drained: e.target.value })
              }
            />

            <label>🌙 One intention for tomorrow</label>
            <textarea
              value={reflection.intention}
              onChange={(e) =>
                setReflection({ ...reflection, intention: e.target.value })
              }
            />

          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
