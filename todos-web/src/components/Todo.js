import { useState } from 'react';

export function Todo({ contract, id, task, done }) {
  const [checked, setChecked] = useState(done);

  const complete = ({ target }) => {
    setChecked(target.checked);
    contract.update({ id, updates: { task, done: target.checked } });
  };

  return (
    <>
      <p>
        <input type="checkbox" checked={checked} onChange={complete} />
        {task}
      </p>
    </>
  );
}
