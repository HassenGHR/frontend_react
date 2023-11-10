import React from 'react';
import styles from './Message.module.css';

function Message({ variant, children }) {
  return (
    <div className={`${styles.alert} ${styles[variant]}`}>
      {children}
    </div>
  );
}

export default Message;
