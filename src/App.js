import React, { Component } from "react";
import Table from "./components/Table";
import Image from "react-image-resizer";

import logo from "./image1.png";

class App extends Component {
  render() {
    return (
      <div className="page">
        <Image
          height={120}
          width={750}
          src={logo}
          alt={"logo"}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
        <h1
          id="title"
          align="center"
          style={{
            margin: "0 0 2rem 0",
            fontWeight: "500",
            fontSize: "50px",
            borderTop: "1px solid black"
          }}
        >
          Ideal Life Calculator
        </h1>
        <div className="table">
          <Table />
        </div>
      </div>
    );
  }
}

export default App;
