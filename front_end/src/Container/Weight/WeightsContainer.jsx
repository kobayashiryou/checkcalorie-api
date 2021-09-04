import React from "react"
import ViewWeight from "./ViewWeight"

class WeightsContainer extends React.Component {
  render() {
    return(
      <div className="weightList">
        {this.props.weightData.map((data) => {
          return(
            <ViewWeight data={ data } key={ data.id } />
          )
        })}
      </div>
    )
  }
}

export default WeightsContainer