import React, { Component } from "react";
import Tab from "@material-ui/core/Tab";
import { findDOMNode } from "react-dom";
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor
} from "react-dnd";
import ItemTypes from "./ItemTypes";

const boxSource = {
  beginDrag(props) {
    return {
      label: props.label,
      index: props.index,
      handleDrop: props.handleDrop
    };
  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    if (dropResult && item.index !== dropResult.index) {
      item.handleDrop(item.index, dropResult.index);
    }
  }
};

const boxTarget = {
  drop(props) {
    // console.log(">> ", props);
    return { name: `${props.label} Tab`, index: props.index };
  }
};

const style = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  height: "3rem",
  cursor: "move",
  float: "left"
};

class DndTab extends Component {
  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
      onClick,
      index
    } = this.props;
    const opacity = isDragging ? 0 : 1;

    return connectDragSource(
      connectDropTarget(
        <div style={{ ...style, opacity }}>
          <Tab label={this.props.label} onClick={onClick} />
        </div>
      )
    );
  }
}

export default DropTarget(ItemTypes.DNDTAB, boxTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(
  DragSource(ItemTypes.DNDTAB, boxSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(DndTab)
);
