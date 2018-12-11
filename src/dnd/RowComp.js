import React, { Component, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

/**
 * 자기 영역에 맞게 들어온 Array인지 판별이 중요함.
 */
class RowComp extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.rows !== this.props.rows) {
      return true;
    }
    return false;
  }

  render() {
    const { target, rows } = this.props;

    const datas = rows[`${target}`];
    const keys = Object.keys(rows);

    return (
      <Fragment>
        {Array.isArray(datas) ? (
          datas.map((item, idx) => {
            const Dynamic = item;
            return (
              <AppBar
                position="static"
                color="default"
                style={{ marginTop: "20px" }}
                key={idx}
              >
                <Toolbar>
                  <Typography variant="h6" color="inherit">
                    <Dynamic />
                  </Typography>
                </Toolbar>
              </AppBar>
            );
          })
        ) : (
          <AppBar
            position="static"
            color="default"
            style={{ marginTop: "20px" }}
          >
            <Toolbar>
              <Typography variant="h6" color="inherit">
                {this.props.children}
              </Typography>
            </Toolbar>
          </AppBar>
        )}
      </Fragment>
    );
  }
}

export default RowComp;
