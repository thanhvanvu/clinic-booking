import React, { Component } from 'react'
import { connect } from 'react-redux'
import PulseLoader from 'react-spinners/PulseLoader'
import './ListSpinner.scss'

class ListSpinner extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <div className="list-spinner">
        <PulseLoader color="#549DE5" size={15} height={20} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ListSpinner)
