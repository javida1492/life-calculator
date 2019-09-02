import React, { Component } from "react";
import Expenses from "./components/Expenses";
import Image from "react-image-resizer";

import logo from "./image1.png";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Image
          height={120}
          width={720}
          src={logo}
          alt={"logo"}
          style={{ position: "center" }}
        />
        <h1>Life Calculator</h1>
        <div
          style={{ height: "100px", width: "500px", display: "inline-block" }}
        >
          <Expenses />
        </div>
        <div
          style={{ height: "100px", width: "400px", display: "inline-block" }}
        >
          <Expenses />
        </div>
      </div>
    );
  }
}

export default App;
