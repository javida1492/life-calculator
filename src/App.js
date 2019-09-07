import React, { Component } from "react";
import Table from "./components/Table";
import TableCustom from "./components/TableCustom";
import Image from "react-image-resizer";

import logo from "./image1.png";

class App extends Component {
  render() {
    return (
      <div className="Logo">
        <Image
          height={120}
          width={750}
          src={logo}
          alt={"logo"}
          style={{ left: "550px", align: "center" }}
        />
        <h1 id="title" align="center" style={{ margin: "0 0 2rem 0", fontWeight: "500" }}>
          Ideal Life Calculator
        </h1>
        <TableCustom />
      </div>
    );
  }
}

export default App;
