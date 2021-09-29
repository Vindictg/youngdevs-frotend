import React, { useContext, useEffect } from 'react';

import ConsoleContext from '../../../context/ConsoleContext';
import keyUtil from '../../../utils/keyUtil';

function Console() {
  let consoleEnd = null;

  const { consoleState } = useContext(ConsoleContext);

  const { messages: consoleMessages } = consoleState;

  const scrollToBottom = () => {
    consoleEnd.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [consoleState]);

  return (
    <div className="Console-container">
      {consoleMessages.map((message) => (
        <span key={`${keyUtil.getKeyList()}`} className={`Console-message--${message.type}`}>{message.text}</span>
      ))}
      <span
        className="Console-end"
        ref={(consoleEndRef) => { consoleEnd = consoleEndRef; }}
      />
    </div>
  );
}

export default Console;
