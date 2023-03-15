import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

class DefaultClass extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return <div>Default class</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass)
