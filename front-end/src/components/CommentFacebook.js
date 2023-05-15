import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { LANGUAGES } from '../utils'
require('dotenv').config()

class CommentFacebook extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.initFacebookSDK()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.initFacebookSDK()
    }
  }

  // source: https://www.devils-heaven.com/facebook-javascript-sdk-login/
  initFacebookSDK = () => {
    let { language } = this.props
    let locale
    if (language === LANGUAGES.EN) {
      locale = 'en_US'
    } else if (language === LANGUAGES.VI) {
      locale = 'vi_VN'
    } else {
      locale = 'es_ES'
    }

    // Clear the Facebook SDK
    window.FB = null
    const facebookSDK = document.getElementById('facebook-jssdk')
    if (facebookSDK) {
      facebookSDK.remove()
    }

    // Load the Facebook SDK asynchronously
    const script = document.createElement('script')
    script.id = 'facebook-jssdk'
    script.src = `//connect.facebook.net/${locale}/sdk.js`
    document.head.appendChild(script)
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v16.0',
      })
    }
  }

  render() {
    let { pageHref, commentFacebookWidth } = this.props
    console.log(commentFacebookWidth)
    return (
      <>
        <div
          class="fb-comments"
          data-href={pageHref}
          data-width={commentFacebookWidth}
          data-numposts="5"
        ></div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentFacebook)
