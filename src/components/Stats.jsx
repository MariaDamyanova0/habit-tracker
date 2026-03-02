function Stats({ habits }) {
  const totalHabits = habits.length;
  const completedHabits = habits.filter((h) => h.done).length;

  // -------- WEEKLY LOGIC --------

const today = new Date();
const weekAgo = new Date();
weekAgo.setDate(today.getDate() - 7);

const weeklyCompleted = habits.filter(habit => {
  if (!habit.lastDone) return false;
  const doneDate = new Date(habit.lastDone);
  return doneDate >= weekAgo;
}).length;

const weeklyRate =
  totalHabits === 0
    ? 0
    : Math.round((weeklyCompleted / totalHabits) * 100);

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
        
        <div className="weekly-card">
          <h3>This Week</h3>
          <p>Completed habits: {weeklyCompleted}</p>
          <p>Weekly consistency: {weeklyRate}%</p>
        </div> 
        
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