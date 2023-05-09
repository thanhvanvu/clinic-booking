import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderHomePage from './HeaderHomePage'
import Specialist from './Section/Specialist'
import MedicalFacility from './Section/MedicalFacility'
import './HomePage.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import OutstandingDoctor from './Section/OutstandingDoctor'
import About from './Section/About'
import FooterHomePage from './FooterHomePage'

class HomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      slidesToShow: 4,
    }
  }

  componentDidMount() {
    // Add event listener to check screen size on window resize
    window.addEventListener('resize', this.handleWindowSizeChange)
    // Call the handler function once initially to set initial slide count
    // this.handleWindowSizeChange()

    this.handleWindowSizeChange()
  }

  handleWindowSizeChange = () => {
    const screenWidth = window.innerWidth

    if (screenWidth >= 1200) {
      this.setState({ slidesToShow: 4 })
    } else if (992 <= screenWidth && screenWidth <= 1199) {
      this.setState({ slidesToShow: 4 })
    } else if (768 <= screenWidth && screenWidth <= 991) {
      this.setState({ slidesToShow: 3 })
    } else if (576 <= screenWidth && screenWidth <= 767) {
      this.setState({ slidesToShow: 2 })
    } else {
      this.setState({ slidesToShow: 2 })
    }
  }

  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: this.state.slidesToShow,
      slidesToScroll: 2,
    }

    return (
      <div>
        <HeaderHomePage isShowBanner={true} />
        <Specialist settings={settings} />
        <MedicalFacility settings={settings} />
        <OutstandingDoctor settings={settings} />
        <About />
        <FooterHomePage />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
