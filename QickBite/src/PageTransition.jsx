import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './tras.css'; 

const PageTransition = ({ children, location }) => {
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        <div className="page-transition">
          {children}
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransition;