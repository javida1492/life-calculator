import React, { Component } from "react";
import Expenses from "./components/Expenses";
import Table from "./components/Table";
import Image from "react-image-resizer";

import logo from "./image1.png";
/*
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
        <h1 style={{textAlign: "center"}}>Life Calculator</h1>
        <div
          style={{ height: "100px", width: "400px", display: "inline-grid", padding: "30px"}}
        >
          <Expenses />
        </div>
        <div
          style={{ height: "100px", width: "400px", display: "inline-grid", padding: "30px" }}
        >
          <Expenses />
        </div>
      </div>
    );
  }
}
*/

class App extends Component {
  render() {
    return (
      <div className="Logo">
        <Image
          height={120}
          width={750}
          src={logo}
          alt={"logo"}
          style={{ left: "550px" }}
        />
        <h1 align="center" style={{ margin: "0 0 2rem 0", fontWeight: "500" }}>
          Ideal Life Calculator
        </h1>
        <Table/>
      </div>
    );
  }
}

export default App;
