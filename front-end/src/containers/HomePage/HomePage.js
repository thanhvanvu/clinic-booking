import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeaderHomePage from './HeaderHomePage'
import Specialist from './Section/Specialist'
import MedicalFacility from './Section/MedicalFacility'
import './HomePage.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import OutstandingDoctor from './Section/OutstandingDoctor'
import HandBook from './Section/HandBook'
import About from './Section/About'
import HomeFooter from './HomeFooter'

class HomePage extends Component {
  state = {
    scrollPos: 0,
  }
  handleScroll = () => {
    this.setState({ scrollPos: window.pageYOffset })
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate() {
    window.scrollTo(0, this.state.scrollPos)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    this.setState({ scrollPos: window.pageYOffset })
  }
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    }

    console.log(this.state.scrollPos)
    return (
      <div>
        <HeaderHomePage isShowBanner={true} />
        <Specialist settings={settings} />
        <MedicalFacility settings={settings} />
        <OutstandingDoctor settings={settings} />
        <HandBook settings={settings} />
        <About />
        <HomeFooter />
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
