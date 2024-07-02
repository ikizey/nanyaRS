import { Component } from "react";
import styles from "./ErrorFallback.module.css";

interface ErrorFallbackProps {
  onReset: () => void;
}

class ErrorFallback extends Component<ErrorFallbackProps> {
  handleClose = () => {
    this.props.onReset();
  };

  render() {
    return (
      <div className={styles.errorFallback}>
        <p className={styles.errorMessage}>Something went wrong!</p>
        <p className={styles.errorMessage}>We're working on fixing it.</p>
        <button className={styles.resetButton} onClick={this.handleClose}>
          Try Again
        </button>
      </div>
    );
  }
}

export default ErrorFallback;
