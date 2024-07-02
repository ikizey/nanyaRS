import { Component } from "react";
import styles from "./TestErrorButton.module.css";

class TestErrorButton extends Component {
  state = { hasError: false };

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error("This is a test error.");
    }

    return (
      <button className={styles.errorButton} onClick={this.handleClick}>
        Throw Test Error
      </button>
    );
  }
}

export default TestErrorButton;
