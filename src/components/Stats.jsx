function Stats({ habits }) {
  const totalHabits = habits.length;
  const completedHabits = habits.filter((h) => h.done).length;

  const completionRate =
    totalHabits === 0
      ? 0
      : Math.round((completedHabits / totalHabits) * 100);

  return (
    <div>
      <h2>Stats</h2>

      <div className="stats-card">
        <h1 className="completion">{completionRate}%</h1>
        <p className="subtitle">Completed Today</p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>

        <p>Total habits: {totalHabits}</p>
        <p>Completed: {completedHabits}</p>
      </div>
    </div>
  );
}

export default Stats;