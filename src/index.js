import React, { Component, Fragment } from "react";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

import DndTab from "./dnd/DndTab";

import * as components from "./components";

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

/**
 * @author restnfeel@gmail.com
 **/
class Index extends Component {
  state = {
    value: 0,
    compKeys: []
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

  removeTab = idx => {
    let arr = this.state.compKeys;
    arr.splice(idx, 1);
    this.setState({ compKeys: arr });
  };

  render() {
    const { compKeys } = this.state;

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
                  handleDrop={() => this.removeTab(idx)}
                />
              );
            })}
          </Tabs>
        </AppBar>
        <GridList>
          <SwipeableViews
            axis={"x-reverse"}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            {compKeys.map((item, idx) => {
              const Dynamic = components[`${item}`];
              return (
                <TabContainer key={item}>
                  <GridListTile>
                    <Dynamic />
                  </GridListTile>
                </TabContainer>
              );
            })}
          </SwipeableViews>
        </GridList>
      </Fragment>
    );
  }
}

export default Index;
