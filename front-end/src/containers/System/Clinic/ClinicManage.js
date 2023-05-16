import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './ClinicManage.scss'
import { CommonUtils } from '../../../utils'
import { LANGUAGES } from '../../../utils'
import {
  handleCreateClinic,
  handleDeleteClinic,
  handleGetAllClinic,
  handleUpdateClinic,
} from '../../../services/clinicService'
import { toast } from 'react-toastify'
import Select from 'react-select'

// import markdownit
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import { handleGetAllCode } from '../../../services/userService'
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

class ClinicManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clinicId: '',
      clinicName: '',
      clinicAddress: '',
      clinicCity: '',
      clinicContentHTML: '',
      clinicContentMarkdown: '',

      clinicLogoImage: '',
      clinicLogoPreviewImg: '',
      clinicImage: '',
      clinicPreviewImg: '',

      cityArr: [],

      allClinic: [],
      builtAllclinicArr: [],
      selectedClinic: {},

      inputValidation: [],

      isUpdateClinic: false,
    }
  }

  async componentDidMount() {
    //#region  Get All City data
    let response = await handleGetAllCode('CITY')
    if (response && response.errCode === 0) {
      let cityArr = response.type

      // remove statewise city out of the array
      let filteredCityArr = cityArr.filter((city) => city.keyMap !== 'CT0')

      this.setState({
        cityArr: filteredCityArr,
      })
    }
    //#endregion
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.allClinic !== this.state.allClinic) {
      let clinicData = this.state.allClinic
      let builtClinicData = []
      clinicData.map((clinic, index) => {
        let object = {}
        object.label = clinic.name
        object.value = clinic.id
        builtClinicData.push(object)
        return clinicData
      })

      this.setState({
        builtAllclinicArr: builtClinicData,
      })
    }
  }

  handleOnchangeImage = async (event) => {
    let file = event.target.files[0]
    let fileType = file.type.slice(0, 5)
    if (file && fileType === 'image') {
      let base64 = await CommonUtils.getBase64(file)
      let objectUrl = URL.createObjectURL(file)

      this.setState({
        clinicImage: base64,
        clinicPreviewImg: objectUrl,
      })
    }
  }

  handleOnchangeImageLogo = async (event) => {
    let file = event.target.files[0]
    let fileType = file.type.slice(0, 5)
    if (file && fileType === 'image') {
      let base64 = await CommonUtils.getBase64(file)
      let objectUrl = URL.createObjectURL(file)

      this.setState({
        clinicLogoImage: base64,
        clinicLogoPreviewImg: objectUrl,
      })
    }
  }

  handleClinicEditorChange = ({ html, text }) => {
    let copiedState = { ...this.state }
    copiedState.clinicContentHTML = html
    copiedState.clinicContentMarkdown = text
    copiedState.inputValidation.descriptionMarkdown = true

    this.setState(copiedState)
  }

  handleRadioChange = async (status) => {
    if (status === 'update') {
      let responseClinic = await handleGetAllClinic()
      if (responseClinic && responseClinic.errCode === 0) {
        // build array data for React Select
        let clinicData = responseClinic.data
        let builtClinicData = []
        clinicData.map((clinic, index) => {
          let object = {}
          object.label = clinic.name
          object.value = clinic.id
          builtClinicData.push(object)
          return clinicData
        })

        this.setState({
          allClinic: clinicData,
          builtAllclinicArr: builtClinicData,
          isUpdateClinic: true,
        })
      }
    } else {
      // reset input
      this.setState({
        clinicName: '',
        clinicAddress: '',
        clinicCity: '',
        clinicContentHTML: '',
        clinicContentMarkdown: '',

        clinicLogoImage: '',
        clinicLogoPreviewImg: '',
        clinicImage: '',
        clinicPreviewImg: '',

        inputValidation: [],

        isUpdateClinic: false,
      })
    }
  }

  handleSelectclinic = (selectedClinic) => {
    let allClinic = this.state.allClinic

    console.log(allClinic)

    // compare selectedClinic with array of all Clinic
    let selectedClinicData = allClinic.find(
      (clinic) => clinic.id === selectedClinic.value
    )

    console.log(selectedClinicData)

    let previewImg
    if (selectedClinicData && selectedClinicData.image) {
      previewImg = CommonUtils.convertBufferToBase64(selectedClinicData.image)
    }

    let previewLogoImg
    if (selectedClinicData && selectedClinicData.logo) {
      previewLogoImg = CommonUtils.convertBufferToBase64(
        selectedClinicData.logo
      )
    }

    this.setState({
      clinicId: selectedClinicData.id,
      clinicName: selectedClinicData.name,
      clinicAddress: selectedClinicData.address,
      clinicCity: selectedClinicData.city,
      clinicContentMarkdown: selectedClinicData.descriptionMarkdown,
      clinicContentHTML: selectedClinicData.descriptionHTML,
      clinicImage: previewImg,
      clinicPreviewImg: previewImg,

      clinicLogoImage: previewLogoImg,
      clinicLogoPreviewImg: previewLogoImg,

      selectedClinic: selectedClinic,
    })
  }

  handleCreateClinicManage = async () => {
    if (window.confirm('Are you sure to create this clinic information ?')) {
      let input = {
        name: this.state.clinicName,
        address: this.state.clinicAddress,
        city: this.state.clinicCity,
        descriptionHTML: this.state.clinicContentHTML,
        descriptionMarkdown: this.state.clinicContentMarkdown,
        image: this.state.clinicImage,
        logo: this.state.clinicLogoImage,
      }

      let isValidInput = CommonUtils.checkValidateInput(input)
      this.setState({
        inputValidation: isValidInput[0],
      })

      if (isValidInput[1] === true) {
        let response = await handleCreateClinic(input)
        if (response && response.errCode === 0) {
          toast.success('Create Clinic Successfully!')

          // reset input
          this.setState({
            clinicName: '',
            clinicAddress: '',
            clinicCity: '',
            clinicContentHTML: '',
            clinicContentMarkdown: '',

            clinicLogoImage: '',
            clinicLogoPreviewImg: '',
            clinicImage: '',
            clinicPreviewImg: '',

            inputValidation: [],
          })
        }
      }
    }
  }

  handleUpdateClinicManage = async () => {
    if (window.confirm('Are you sure to update this clinic information ?')) {
      let input = {
        id: this.state.clinicId,
        name: this.state.clinicName,
        address: this.state.clinicAddress,
        city: this.state.clinicCity,
        descriptionHTML: this.state.clinicContentHTML,
        descriptionMarkdown: this.state.clinicContentMarkdown,
        image: this.state.clinicImage,
        logo: this.state.clinicLogoImage,
      }

      let isValidInput = CommonUtils.checkValidateInput(input)
      this.setState({
        inputValidation: isValidInput[0],
      })

      // call API
      let response = await handleUpdateClinic(input)
      if (response && response.errCode === 0) {
        toast.success('Updated Clinic successfully!')

        // reset input
        this.setState({
          clinicName: '',
          clinicAddress: '',
          clinicCity: '',
          clinicContentHTML: '',
          clinicContentMarkdown: '',

          clinicLogoImage: '',
          clinicLogoPreviewImg: '',
          clinicImage: '',
          clinicPreviewImg: '',

          allClinic: [],
          builtAllclinicArr: [],
          selectedClinic: {},
        })

        // refresh clinic array
        let responseClinic = await handleGetAllClinic()
        if (responseClinic && responseClinic.errCode === 0) {
          this.setState({
            allClinic: responseClinic.data,
          })
        }
      }
    }
  }

  handleDeleteSpecialistManage = async () => {
    let clinicId = this.state.clinicId

    if (window.confirm('Are you sure to delete this clinic?')) {
      let response = await handleDeleteClinic(clinicId)
      if (response && response.errCode === 0) {
        toast.error('Deleted Clinic Succesfully!')

        // reset input
        this.setState({
          clinicName: '',
          clinicAddress: '',
          clinicCity: '',
          clinicContentHTML: '',
          clinicContentMarkdown: '',
          clinicImage: '',
          clinicPreviewImg: '',

          allClinic: [],
          builtAllclinicArr: [],
          selectedClinic: {},
        })

        // refresh clinic array
        let responseClinic = await handleGetAllClinic()
        if (responseClinic && responseClinic.errCode === 0) {
          this.setState({
            allClinic: responseClinic.data,
          })
        }
      }
    }
  }

  render() {
    let cityArr = this.state.cityArr
    let inputValidation = this.state.inputValidation
    let language = this.props.language
    let isUpdateClinic = this.state.isUpdateClinic
    return (
      <>
        <div className="clinic-manage-container wrapper">
          <div className="clinic-manage title">
            <FormattedMessage id="manage-clinic.tittle" />
          </div>
          <div className="select-create-update">
            <div>
              <input
                type="radio"
                name="clinic"
                id="clinic-create-new"
                value="create"
                defaultChecked
                onClick={() => this.handleRadioChange('create')}
              />
              <label htmlFor="clinic-create-new">
                <FormattedMessage id="manage-clinic.create-new" />
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="clinic"
                id="clinic-update"
                value="update"
                onClick={() => this.handleRadioChange('update')}
              />
              <label htmlFor="clinic-update">
                <FormattedMessage id="manage-clinic.update" />{' '}
              </label>
            </div>
          </div>
          {isUpdateClinic && (
            <Select
              value={this.state.selectedClinic}
              options={this.state.builtAllclinicArr}
              onChange={(event) => this.handleSelectclinic(event)}
            />
          )}

          <div className="clinic-manage-content">
            <div className="clinic-content-left form-group">
              <label className="content-label">
                <FormattedMessage id="manage-clinic.clinic-name" />
              </label>
              <input
                type="text"
                className={
                  inputValidation.name === false
                    ? 'form-control invalid'
                    : 'form-control'
                }
                name="clinicName"
                value={this.state.clinicName}
                onChange={(event) =>
                  this.setState({
                    inputValidation: {
                      ...this.state.inputValidation,
                      name: true,
                    },
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </div>
            <div className="clinic-content-right form-group">
              <div className="img-background">
                <label className="content-label">
                  <FormattedMessage id="manage-clinic.clinic-background" />
                </label>
                <div className="clinic-image">
                  <input
                    type="file"
                    id="image-upload"
                    hidden
                    onChange={(event) => {
                      this.handleOnchangeImage(event)
                    }}
                  />
                  <label htmlFor="image-upload" className="image-upload">
                    <i className="fas fa-upload img-upload"></i>
                    <FormattedMessage id="manage-clinic.clinic-upload" />
                  </label>
                  {this.state.clinicPreviewImg && (
                    <div className="image-clinic">
                      <img
                        alt=""
                        src={
                          this.state.clinicPreviewImg
                            ? this.state.clinicPreviewImg
                            : ''
                        }
                      ></img>
                    </div>
                  )}
                </div>
              </div>

              <div className="img-logo">
                <label className="content-label">
                  <FormattedMessage id="manage-clinic.clinic-logo" />
                </label>
                <div className="clinic-image">
                  <input
                    type="file"
                    id="image-upload-logo"
                    hidden
                    onChange={(event) => {
                      this.handleOnchangeImageLogo(event)
                    }}
                  />
                  <label htmlFor="image-upload-logo" className="image-upload">
                    <i className="fas fa-upload img-upload"></i>
                    <FormattedMessage id="manage-clinic.clinic-upload" />
                  </label>
                  {this.state.clinicLogoPreviewImg && (
                    <div className="image-clinic">
                      <img
                        alt=""
                        src={
                          this.state.clinicLogoPreviewImg
                            ? this.state.clinicLogoPreviewImg
                            : ''
                        }
                      ></img>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="clinic-address-city">
            <div className="address">
              <label className="content-label">
                <FormattedMessage id="manage-clinic.clinic-address" />
              </label>
              <input
                type="text"
                className={
                  inputValidation.address === false
                    ? 'form-control invalid'
                    : 'form-control'
                }
                value={this.state.clinicAddress}
                onChange={(event) => {
                  this.setState({
                    inputValidation: {
                      ...this.state.inputValidation,
                      address: true,
                    },
                    clinicAddress: event.target.value,
                  })
                }}
              />
            </div>

            <div className="city">
              <label className="content-label">
                <FormattedMessage id="manage-clinic.clinic-city" />
              </label>
              <select
                className={
                  inputValidation.city === false
                    ? 'form-control invalid'
                    : 'form-control'
                }
                value={this.state.clinicCity}
                onChange={(event) => {
                  this.setState({
                    clinicCity: event.target.value,
                    inputValidation: {
                      ...this.state.inputValidation,
                      city: true,
                    },
                  })
                }}
              >
                {this.state.clinicCity === '' && (
                  <option value="">---Select a city---</option>
                )}
                {cityArr &&
                  cityArr.length > 0 &&
                  cityArr.map((city, index) => {
                    return (
                      <option value={city.keyMap} key={index}>
                        {LANGUAGES.EN === language
                          ? city.valueEN
                          : LANGUAGES.VI
                          ? city.valueVI
                          : city.valueES}
                      </option>
                    )
                  })}
              </select>
            </div>
          </div>

          <div
            className={
              inputValidation.descriptionMarkdown === false
                ? 'clinic-manage-editor invalid'
                : 'clinic-manage-editor'
            }
          >
            <MdEditor
              style={{ height: '500px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleClinicEditorChange}
              value={this.state.clinicContentMarkdown}
              required
            />
          </div>
          <div className="create-save-delete-btn">
            {isUpdateClinic === true ? (
              <>
                <button
                  className="clinic-manage-save"
                  onClick={() => this.handleUpdateClinicManage()}
                >
                  <FormattedMessage id="manage-clinic.clinic-update" />
                </button>
                <button
                  className="clinic-manage-save delete"
                  onClick={() => this.handleDeleteSpecialistManage()}
                >
                  <FormattedMessage id="manage-clinic.clinic-delete" />
                </button>
              </>
            ) : (
              <button
                className="clinic-manage-save"
                onClick={() => this.handleCreateClinicManage()}
              >
                <FormattedMessage id="manage-clinic.clinic-create" />
              </button>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage)
