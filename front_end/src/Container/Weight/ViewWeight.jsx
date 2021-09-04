import React from "react";

class ViewWeight extends React.Component {
  render() {
    return(
      <div>
        <span>{this.props.data.kg}</span>
      </div>
    )
  }
}

export default ViewWeight