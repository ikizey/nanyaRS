import { Component } from "react";
import styles from "./Loading.module.css";

class Loading extends Component {
  render() {
    return (
      <div className={styles.loading}>
        <p>Loading...</p>
      </div>
    );
  }
}

export default Loading;
