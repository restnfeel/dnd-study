import React, { Component, Fragment } from "react";
import Index from "./index";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContextProvider } from "react-dnd";

class Root extends Component {
  state = {};

  render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Index />
      </DragDropContextProvider>
    );
  }
}

export default Root;
