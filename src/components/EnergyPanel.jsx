function EnergyPanel({ mood, setMood, reflection, setReflection }) {
  return (
    <div className="energy-panel">
      <h3>Daily Energy</h3>

      <div className="mood-options">
        {["🔥", "😊", "😌", "🥱"].map((m) => (
          <button
            key={m}
            className={mood === m ? "active" : ""}
            onClick={() => setMood(m)}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="reflection-questions">
        <label>What felt aligned today?</label>
        <textarea
          value={reflection.aligned}
          onChange={(e) =>
            setReflection({ ...reflection, aligned: e.target.value })
          }
        />

        <label>What drained my energy?</label>
        <textarea
          value={reflection.drained}
          onChange={(e) =>
            setReflection({ ...reflection, drained: e.target.value })
          }
        />

        <label>One intention for tomorrow</label>
        <textarea
          value={reflection.intention}
          onChange={(e) =>
            setReflection({ ...reflection, intention: e.target.value })
          }
        />
      </div>
    </div>
  );
}

export default EnergyPanel;