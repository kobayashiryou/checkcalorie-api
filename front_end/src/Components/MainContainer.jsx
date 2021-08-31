import axios from "axios"
import React from "react"

class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      weights: []
    }
  }

  componentDidMount() {
    axios.get("http://localhost:3001/api/v1/weights")
    .then((results) => {
      console.log(results)
      this.setState({ weights: results.data})
    })
    .catch((data) => {
      console.log(data)
    })
  }



  render() {
    return (
      <div className="app-main">

      </div>
    );
  }
}

export default MainContainer