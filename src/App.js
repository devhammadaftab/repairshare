import './App.css';
import Phase from "./components/Phase";
import { useCallback, useEffect, useMemo, useState } from "react";
import { INIT_STARTUP } from "./INIT_DATA";
import RandomQuote from "./components/RandomQuote";

function App () {
  const [startup, setStartup] = useState(INIT_STARTUP);

  useEffect(() => {
    const storedData = localStorage.getItem("startup");
    if (storedData) {
      setStartup(JSON.parse(storedData))
    }
  }, []);

  const onTaskUpdate = useCallback((isChecked, phaseIndex, taskIndex) => {
    const phases = [...startup.phases];

    //Get Phase to be updated
    let phaseToUpdate = { ...phases[phaseIndex] };
    phaseToUpdate.tasks[taskIndex].isChecked = isChecked;
    phaseToUpdate.isCompleted = phaseToUpdate.tasks.every(task => task.isChecked);

    //Set updated phase into the list
    phases[phaseIndex] = phaseToUpdate;

    const updatedStartup = {
      ...startup,
      phases: phases
    }
    setStartup(updatedStartup);

    //  Set updated values in localstorage
    localStorage.setItem("startup", JSON.stringify(updatedStartup));
  }, [startup, startup]);

  const startupCompleted = useMemo(() => {
    return !startup.phases.find(phase => !phase.isCompleted);
  }, [startup]);

  const isPhaseUnlocked = (phaseIndex) => {
    if (phaseIndex <= 0) {
      return true;
    }
    return startup.phases[phaseIndex - 1].isCompleted;
  }

  return (
    <div className="App">
      <div className="tasksWrap">
        <h3>{startup.title}</h3>
        <div className="stepWrap">
          {/*--- Steps ---*/}
          {
            startup.phases.map((phase, index) => {
              const isUnlocked = isPhaseUnlocked(index);
              return <Phase
                key={index}
                title={phase.title}
                phaseIndex={index}
                tasks={phase.tasks}
                allCompleted={phase.isCompleted}
                onTaskUpdate={onTaskUpdate}
                isUnlocked={isUnlocked}
              />
            })
          }
          {/*--- Random Quote ---*/}
          {
            startupCompleted && <RandomQuote />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
