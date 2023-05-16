import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import './ClinicListView.scss'
import { connect } from 'react-redux'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import FooterHomePage from '../../HomePage/FooterHomePage'
import { CommonUtils } from '../../../utils'
import { handleGetAllClinic } from '../../../services/clinicService'
import PageSpinner from '../../../components/PageSpinner'
class ClinicListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clinicArrSortedByAlphabet: [],
      isLoading: false,
    }
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    })
    // call API to get all clinic information and sort clinic alphabetically
    let response = await handleGetAllClinic()
    if (response && response.errCode === 0) {
      let clinicArr = response.data

      //convert image buffer to base64
      clinicArr.map((clinic, index) => {
        clinic.logo = CommonUtils.convertBufferToBase64(clinic.logo)
        return clinic
      })

      let clinicArrSortedByAlphabet = []

      // structure of the array will be like this
      // let clinicArrSortedByAlphabet = [
      //   {
      //     letter: 'h',
      //     clinicData: [
      //       {
      //         name: 'HCA Houston Healthcare',
      //       },
      //       {
      //         name: 'Harris Heatlth System',
      //       },
      //     ],
      //   },
      //   {
      //     letter: 'u',
      //     clinicData: [
      //       {
      //         name: 'UTMB Health League City Campus Hospital & Clinics',
      //       },
      //     ],
      //   },
      // ]

      // loop through all clinic data in database
      clinicArr.map((clinic, index) => {
        let objectLetter = {}

        // get the first letter of the clinic name to sort the array
        let firstLetter = clinic.name.charAt(0).toLowerCase()

        // check if clinicArrSortedByAlphabet has an object that has letter: firstLetter ?
        let isLetterExist = clinicArrSortedByAlphabet.some(
          (obj) => obj.letter === firstLetter
        )

        if (isLetterExist) {
          // push the clinic into clinicData
          // need to find that object which has letter: firstLetter
          let existLetter = clinicArrSortedByAlphabet.find(
            (obj) => (obj.letter = firstLetter)
          )

          // push that clinic data into array clinicData
          existLetter.clinicData.push(clinic)
        } else {
          //create a new object that has letter: firstLetter
          objectLetter.letter = firstLetter

          // push the clinic data into array clinicData
          objectLetter.clinicData = [clinic]

          // push this new object into clinicArrSortedByAlphabet
          clinicArrSortedByAlphabet.push(objectLetter)
        }

        return clinicArrSortedByAlphabet
      })

      // sort clinicArrSortedByAlphabet alphabetically
      clinicArrSortedByAlphabet.sort((a, b) => {
        let letter1 = a.letter
        let letter2 = b.letter
        return letter1 < letter2 ? -1 : letter1 > letter2 ? 1 : 0
      })

      this.setState({
        clinicArrSortedByAlphabet: clinicArrSortedByAlphabet,
        isLoading: false,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleViewClinicDetail = (clinicId) => {
    this.props.history.push(`/detail-clinic/${clinicId}`)
  }

  render() {
    let clinicArrSortedByAlphabet = this.state.clinicArrSortedByAlphabet
    let isLoading = this.state.isLoading
    return (
      <div className="clinic-list-view">
        <HeaderHomePage />
        {isLoading && <PageSpinner />}
        <div className="container-list-view-clinic wrapper">
          <div className="clinic-title">
            <FormattedMessage id="homepage.clinic.clinic-list-view-title" />
          </div>

          {clinicArrSortedByAlphabet &&
            clinicArrSortedByAlphabet.length > 0 &&
            clinicArrSortedByAlphabet.map((alphabet, index) => {
              let clinicArr = []
              if (alphabet && alphabet.clinicData) {
                clinicArr = alphabet.clinicData
              }
              return (
                <div className="clinic-detail-wrapper" key={index}>
                  <div className="alphabet">
                    <div className="alphabet-wrapper">{alphabet.letter}</div>
                  </div>

                  <div className="clinic-list-content">
                    {clinicArr &&
                      clinicArr.length > 0 &&
                      clinicArr.map((clinic, index) => {
                        return (
                          <div
                            className="clinic-detail"
                            key={index}
                            onClick={() =>
                              this.handleViewClinicDetail(clinic.id)
                            }
                          >
                            <img src={clinic.logo} alt="" />
                            <div className="clinic-name">{clinic.name}</div>
                          </div>
                        )
                      })}
                  </div>
                </div>
              )
            })}
        </div>
        <FooterHomePage />
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicListView)
