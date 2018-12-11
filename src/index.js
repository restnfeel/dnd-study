import React, { Component, Fragment } from "react";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import Toolbar from "@material-ui/core/Toolbar";
import GridListTile from "@material-ui/core/GridListTile";

import DndTab from "./dnd/DndTab";
import RowComp from "./dnd/RowComp";

import * as components from "./components";

/**
 * @author restnfeel@gmail.com
 **/
class Index extends Component {
  state = {
    value: 0,
    compKeys: [],
    rows: {}
  };

  componentDidMount() {
    this.loadComponents();
  }

  loadComponents = () => {
    const compKeys = Object.keys(components);
    //console.log("compKeys", compKeys);
    this.setState({ compKeys });
  };

  handleChange = value => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  removeTab = (idx, targetIdx) => {
    let arr = Object.assign([], this.state.compKeys);

    const Dynamic = components[arr[idx]];
    const Original = components[arr[targetIdx]];
    const targetKey = arr[targetIdx];
    let rowsArr = Object.assign([], this.state.rows[targetKey]);
    if (rowsArr.indexOf(Original) === -1) {
      rowsArr.push(Original);
    }

    if (arr[idx] in this.state.rows) {
      const destArr = this.state.rows[arr[idx]];
      destArr.map(Dyn => {
        rowsArr.push(Dyn);
      });
    } else {
      rowsArr.push(Dynamic);
    }

    arr.splice(idx, 1);

    this.setState({
      compKeys: arr,
      rows: { ...this.state.rows, [targetKey]: rowsArr }
    });
    console.log("[check state] ", targetIdx, this.state);
  };

  render() {
    const { compKeys, rows } = this.state;

    return (
      <Fragment>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            {compKeys.map((item, idx) => {
              return (
                <DndTab
                  key={item}
                  index={idx}
                  label={item}
                  onClick={() => this.handleChange(idx)}
                  handleDrop={this.removeTab}
                />
              );
            })}
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={"x-reverse"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          {compKeys.map((item, idx) => {
            const Dynamic = components[`${item}`];
            const targetKey = item;
            return (
              <RowComp key={item} target={targetKey} rows={rows}>
                <Dynamic />
              </RowComp>
            );
          })}
        </SwipeableViews>
      </Fragment>
    );
  }
}

export default Index;
