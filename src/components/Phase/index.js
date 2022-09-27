import Task from '../Task';
import './style.css';

function Phase ({ title, phaseIndex, tasks, allCompleted, onTaskUpdate, isUnlocked }) {

  const handleChange = (checked, subTaskIndex) => {
    onTaskUpdate(checked, phaseIndex, subTaskIndex);
  }

  return (
    <div className={`step ${!isUnlocked ? 'locked' : ''}`}>
      {/*--- Task title ---*/}
      <div className='stepTitle'>
        <span className='stepCount'>{phaseIndex + 1}</span>
        <h2>{title}</h2>
        {!isUnlocked && <img style={{ marginLeft: '15px' }} src='/images/lock.svg' />}

        <span className='stepCheck'>
          {
            allCompleted && (
              <img src='/images/check.svg' alt='' />
            )
          }
        </span>
      </div>

      {/*--- Tasks ---*/}
      <div className='tasks'>
        {tasks.map((task, index) =>
          <Task task={task} key={index} index={index} disabled={!isUnlocked} handleChange={handleChange} />
        )}
      </div>

    </div>
  );
}

export default Phase;
