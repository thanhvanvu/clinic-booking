import React, { Component } from 'react'
import { connect } from 'react-redux'
import FadeLoader from 'react-spinners/FadeLoader'
import './PageSpinner.scss'
class PageSpinner extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <div className="spinner">
        <FadeLoader color="#549DE5" size={150} margin={25} height={15} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSpinner)
