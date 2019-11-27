import React, { Component } from "react";
import "./App.css";
import Tables from "./components/Table/Tables";
import Image from "react-image-resizer";
import logo from "./assets/images/image1.png";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Image
          height={120}
          width={750}
          src={logo}
          alt={"logo"}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <h1 className="title">Ideal Life Calculator</h1>
        <Tables/>
      </div>
    );
  }
}

export default App;
