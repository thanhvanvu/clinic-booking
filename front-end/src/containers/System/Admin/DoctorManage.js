import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import CommonUtils from '../../../utils/CommonUtils'
import { connect } from 'react-redux'
import './DoctorManage.scss'
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
import Select from 'react-select'

import {
  getDetailDoctorById,
  handleUpdateInfoDoctorById,
  handleGetAllCode,
  handleGetDoctorClinicInfo,
  handleCreateDoctorClinicInfo,
  handleUpdateDoctorClinicInfo,
} from '../../../services/userService'
import { toast } from 'react-toastify'

import { LANGUAGES } from '../../../utils/constant'
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

class DoctorManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // save to markdowns table
      previewImg: '',
      markdown: {
        contentMarkdown: '',
        contentHTML: '',
        description: '',
      },
      selectedDoctor: '',
      doctorArray: [],
      inputValidMarkdown: '',
      hasOldDataMarkdow: false,

      // save to doctor_info table
      cityArr: [],
      paymentArr: [],
      priceArr: [],
      inputValidDoctorInfo: '',
      hasOldClinicInfo: false,
      doctorClinicInfo: {
        selectedCity: '',
        selectedPrice: '',
        clinicName: '',
        clinicAddress: '',
        note: '',
        selectedPayment: '',
      },
    }
  }

  async componentDidMount() {
    this.props.getAllDoctors()

    // get city code
    let codeArr = ['CITY', 'PAYMENT', 'PRICE']
    codeArr.forEach(async (code) => {
      let response = await handleGetAllCode(code)
      if (response && response.errCode === 0) {
        if (code === 'CITY') {
          this.setState({
            cityArr: response.type,
          })
        } else if (code === 'PAYMENT') {
          this.setState({
            paymentArr: response.type,
          })
        } else {
          this.setState({
            priceArr: response.type,
          })
        }
      }
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // everytime the prop update, do something
    if (prevProps.doctors !== this.props.doctors) {
      let builtData = this.buildDataInputSelect(this.props.doctors)
      this.setState({
        doctorArray: builtData,
      })
    }

    if (prevState.selectedDoctor !== this.state.selectedDoctor) {
      // reset valid input
      this.setState({
        inputValidMarkdown: '',
        inputValidDoctorInfo: '',
      })
    }
  }

  buildDataInputSelect = (doctorsData) => {
    let result = []
    if (doctorsData && doctorsData.length > 0) {
      doctorsData.map((doctor, index) => {
        let imageBase64 = CommonUtils.convertBufferToBase64(doctor.image)
        let object = {}
        let label = `${doctor.firstName} ${doctor.lastName}`
        object.label = label
        object.value = doctor.id
        object.image = imageBase64
        result.push(object)
        return result
      })
    }
    return result
  }

  checkValidateInput = (inputData) => {
    let returnObj = {}
    let isValid = true
    Object.entries(inputData).forEach(([key, value]) => {
      if (key === 'note') {
        returnObj[key] = true
      } else if (value === '') {
        isValid = false
        returnObj[key] = false
      } else {
        returnObj[key] = true
      }
    })

    if (isValid === true) {
      return [returnObj, true]
    } else {
      return [returnObj, false]
    }
  }

  handleSelectedDoctor = async (selectedDoctor) => {
    let doctorId = selectedDoctor.value
    let response = await getDetailDoctorById(doctorId)
    if (
      response &&
      response.errCode === 0 &&
      response.data &&
      response.data.Markdown
    ) {
      let markdown = response.data.Markdown
      this.setState({
        hasOldDataMarkdow: true,
        markdown: {
          contentMarkdown: markdown.contentMarkdown,
          contentHTML: markdown.contentHTML,
          description: markdown.description,
        },
      })
    } else {
      this.setState({
        hasOldDataMarkdow: false,
        markdown: {
          contentMarkdown: '',
          contentHTML: '',
          description: '',
        },
      })
    }

    this.setState({
      previewImg: selectedDoctor.image,
      selectedDoctor: selectedDoctor,
    })

    // call API to get information in doctorInfo table
    let resDoctorInfo = await handleGetDoctorClinicInfo(doctorId)
    let data = resDoctorInfo.data
    if (resDoctorInfo && resDoctorInfo.errCode === 0 && resDoctorInfo.data) {
      this.setState({
        ...this.state,
        hasOldClinicInfo: true,
        doctorClinicInfo: {
          selectedCity: data.cityId,
          selectedPrice: data.priceId,
          clinicName: data.nameClinic,
          clinicAddress: data.addressClinic,
          note: data.note,
          selectedPayment: data.paymentId,
        },
      })
    } else {
      this.setState({
        ...this.state,
        hasOldClinicInfo: false,
        doctorClinicInfo: {
          selectedCity: '',
          selectedPrice: '',
          clinicName: '',
          clinicAddress: '',
          note: '',
          selectedPayment: '',
        },
      })
    }
  }

  handleDoctorManage = async () => {
    this.handleCreateUpdateMarkdown()
    this.handleCreateUpdateClinic()
  }

  handleCreateUpdateMarkdown = async () => {
    if (this.state.hasOldDataMarkdow === false) {
      // check validate
      let markdownIsvalid = this.checkValidateInput(this.state.markdown)
      if (markdownIsvalid[1] === true && this.state.selectedDoctor.value) {
        // create information
        this.props.createDoctorInfo({
          contentMarkdown: this.state.markdown.contentMarkdown,
          contentHTML: this.state.markdown.contentHTML,
          description: this.state.markdown.description,
          doctorId: this.state.selectedDoctor.value,
        })
      } else {
        this.setState({
          inputValidMarkdown: markdownIsvalid[0],
        })
      }
      // reset state
      if (this.props.isSuccess === true) {
        this.setState({
          previewImg: '',
          selectedDoctor: '',
          hasOldDataMarkdow: false,
          markdown: {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
          },
        })
      }
    } else {
      // update information
      let response = await handleUpdateInfoDoctorById({
        contentMarkdown: this.state.markdown.contentMarkdown,
        contentHTML: this.state.markdown.contentHTML,
        description: this.state.markdown.description,
        doctorId: this.state.selectedDoctor.value,
      })
      if (response && response.errCode === 0) {
        toast.success('Update a doctor information successfully!')
        // reset input
        this.setState({
          markdown: {
            contentMarkdown: '',
            contentHTML: '',
            description: '',
          },
          previewImg: '',
          selectedDoctor: '',
          hasOldDataMarkdow: false,
        })
      }
    }
  }

  handleCreateUpdateClinic = async () => {
    // handle create/update doctorInfo table
    if (this.state.hasOldClinicInfo === false) {
      // check validate
      let isValid = this.checkValidateInput(this.state.doctorClinicInfo)

      // create clinic info
      if (isValid[1] === true && this.state.selectedDoctor.value) {
        let doctorClinicInfo = this.state.doctorClinicInfo
        let response = await handleCreateDoctorClinicInfo({
          doctorId: this.state.selectedDoctor.value,
          priceId: doctorClinicInfo.selectedPrice,
          cityId: doctorClinicInfo.selectedCity,
          paymentId: doctorClinicInfo.selectedPayment,
          addressClinic: doctorClinicInfo.clinicAddress,
          nameClinic: doctorClinicInfo.clinicName,
        })

        if (response && response.errCode === 0) {
          toast.success('Create a doctor information successfully!')
          // reset input
          this.setState({
            markdown: {
              contentMarkdown: '',
              contentHTML: '',
              description: '',
            },
            doctorClinicInfo: {
              selectedCity: '',
              selectedPrice: '',
              clinicName: '',
              clinicAddress: '',
              note: '',
              selectedPayment: '',
            },
            previewImg: '',
            selectedDoctor: '',
            hasOldDataMarkdow: false,
            hasOldClinicInfo: false,
          })
        }
      } else {
        this.setState({
          inputValidDoctorInfo: isValid[0],
        })
      }
    } else if (this.state.hasOldClinicInfo === true) {
      // check validate
      let isValid = this.checkValidateInput(this.state.doctorClinicInfo)

      // UPDATE clinic info
      if (isValid[1] === true && this.state.selectedDoctor.value) {
        let doctorClinicInfo = this.state.doctorClinicInfo
        let response = await handleUpdateDoctorClinicInfo({
          doctorId: this.state.selectedDoctor.value,
          priceId: doctorClinicInfo.selectedPrice,
          cityId: doctorClinicInfo.selectedCity,
          paymentId: doctorClinicInfo.selectedPayment,
          addressClinic: doctorClinicInfo.clinicAddress,
          nameClinic: doctorClinicInfo.clinicName,
        })

        console.log(response)
        if (response && response.errCode === 0) {
          toast.success('Update a doctor information successfully!')

          // reset input
          this.setState({
            markdown: {
              contentMarkdown: '',
              contentHTML: '',
              description: '',
            },
            doctorClinicInfo: {
              selectedCity: '',
              selectedPrice: '',
              clinicName: '',
              clinicAddress: '',
              note: '',
              selectedPayment: '',
            },
            previewImg: '',
            selectedDoctor: '',
            hasOldDataMarkdow: false,
            hasOldClinicInfo: false,
          })
        }
      } else {
        this.setState({
          inputValidDoctorInfo: isValid[0],
        })
      }
    }
  }

  handleOnchangeDescription = (event) => {
    this.setState({
      ...this.state,
      inputValidMarkdown: {
        ...this.state.inputValidMarkdown,
        [event.target.name]: true,
      },
      markdown: {
        ...this.state.markdown,
        [event.target.name]: event.target.value,
      },
    })
  }

  handleOnchangeDoctorInfo = (event) => {
    this.setState({
      ...this.state,
      inputValidDoctorInfo: {
        ...this.state.inputValidDoctorInfo,
        [event.target.name]: true,
      },
      doctorClinicInfo: {
        ...this.state.doctorClinicInfo,
        [event.target.name]: event.target.value,
      },
    })
  }

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      inputValidMarkdown: {
        ...this.state.inputValidMarkdown,
        contentHTML: true,
        contentMarkdown: true,
      },
      markdown: {
        ...this.state.markdown,
        contentMarkdown: text,
        contentHTML: html,
      },
    })
  }

  render() {
    let cityArr = this.state.cityArr
    let paymentArr = this.state.paymentArr
    let priceArr = this.state.priceArr
    let currentLanguage = this.props.language
    return (
      <div className="doctor-manage-container wrapper">
        <div className="doctor-manage title">
          <FormattedMessage id="manage-user-redux.doctor-manage.title" />
        </div>
        <div className="more-information">
          <div className="content-left form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.info" />
            </label>
            <textarea
              className={
                this.state.inputValidMarkdown.description === false
                  ? 'form-control invalid'
                  : 'form-control'
              }
              cols="20"
              rows="8"
              name="description"
              value={this.state.markdown.description}
              onChange={(event) => this.handleOnchangeDescription(event)}
            ></textarea>
          </div>
          <div className="content-right">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.select-doctor" />
            </label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleSelectedDoctor}
              options={this.state.doctorArray}
            />
            <div className="doctor-img">
              <img
                hidden={this.state.previewImg === ''}
                src={this.state.previewImg}
                alt=""
                width="120px"
                height="120px"
              />
            </div>
          </div>
        </div>

        <div className="clinic-info row wrapper">
          <div className="col-4 form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.clinic-name" />
            </label>
            <input
              className={
                this.state.inputValidDoctorInfo.clinicName === false
                  ? 'form-control invalid'
                  : 'form-control'
              }
              name="clinicName"
              value={this.state.doctorClinicInfo.clinicName}
              onChange={(event) => this.handleOnchangeDoctorInfo(event)}
            />
          </div>
          <div className="col-8 form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.clinic-address" />
            </label>
            <input
              className={
                this.state.inputValidDoctorInfo.clinicAddress === false
                  ? 'form-control invalid'
                  : 'form-control'
              }
              name="clinicAddress"
              value={this.state.doctorClinicInfo.clinicAddress}
              onChange={(event) => this.handleOnchangeDoctorInfo(event)}
            />
          </div>
          <div className="col-4 form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.city" />
            </label>
            <select
              className={
                this.state.inputValidDoctorInfo.selectedCity === false
                  ? 'form-control invalid'
                  : 'form-control'
              }
              name="selectedCity"
              value={this.state.doctorClinicInfo.selectedCity}
              onChange={(event) => this.handleOnchangeDoctorInfo(event)}
            >
              {this.state.doctorClinicInfo.selectedCity === '' && (
                <option value="">---Select a city---</option>
              )}
              {cityArr &&
                cityArr.length > 0 &&
                cityArr.map((city, index) => {
                  return (
                    <option key={index} value={city.keyMap}>
                      {currentLanguage === LANGUAGES.VI
                        ? city.valueVI
                        : currentLanguage === LANGUAGES.EN
                        ? city.valueEN
                        : city.valueES}
                    </option>
                  )
                })}
            </select>
          </div>
          <div className="col-4 form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.price" />
            </label>
            <select
              className={
                this.state.inputValidDoctorInfo.selectedPrice === false
                  ? 'form-control invalid'
                  : 'form-control'
              }
              name="selectedPrice"
              value={this.state.doctorClinicInfo.selectedPrice}
              onChange={(event) => this.handleOnchangeDoctorInfo(event)}
            >
              {this.state.doctorClinicInfo.selectedPrice === '' && (
                <option value="">---Select a price---</option>
              )}
              {priceArr &&
                priceArr.length > 0 &&
                priceArr.map((price, index) => {
                  return (
                    <option key={index} value={price.keyMap}>
                      {currentLanguage === LANGUAGES.VI
                        ? price.valueVI
                        : currentLanguage === LANGUAGES.EN
                        ? price.valueEN
                        : price.valueES}
                    </option>
                  )
                })}
            </select>
          </div>
          <div className="col-4 form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.referral-payment" />
            </label>
            <select
              className={
                this.state.inputValidDoctorInfo.selectedPayment === false
                  ? 'form-control invalid'
                  : 'form-control'
              }
              name="selectedPayment"
              value={this.state.doctorClinicInfo.selectedPayment}
              onChange={(event) => this.handleOnchangeDoctorInfo(event)}
            >
              {this.state.doctorClinicInfo.selectedPayment === '' && (
                <option value="">---Select a payment---</option>
              )}
              {paymentArr &&
                paymentArr.length > 0 &&
                paymentArr.map((payment, index) => {
                  return (
                    <option key={index} value={payment.keyMap}>
                      {currentLanguage === LANGUAGES.VI
                        ? payment.valueVI
                        : currentLanguage === LANGUAGES.EN
                        ? payment.valueEN
                        : payment.valueES}
                    </option>
                  )
                })}
            </select>
          </div>
          <div className="col-12 form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.note" />
            </label>
            <input
              className="form-control"
              name="note"
              value={this.state.doctorClinicInfo.note}
              onChange={(event) => this.handleOnchangeDoctorInfo(event)}
            />
          </div>
        </div>
        <div
          className={
            this.state.inputValidMarkdown.contentMarkdown === false
              ? 'doctor-manage-editor invalid'
              : 'doctor-manage-editor'
          }
        >
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.markdown.contentMarkdown}
            required
          />
        </div>
        <button
          className="doctor-manage-save"
          onClick={() => this.handleDoctorManage()}
        >
          <FormattedMessage
            id={
              this.state.hasOldDataMarkdow === false ||
              this.state.hasOldClinicInfo === false
                ? 'manage-user-redux.doctor-manage.create'
                : 'manage-user-redux.doctor-manage.update'
            }
          />
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    doctors: state.admin.doctors,
    isSuccess: state.admin.isSuccess,
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.getAllDoctorsStart()),
    createDoctorInfo: (doctorInfo) =>
      dispatch(actions.createDoctorInfoStart(doctorInfo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage)
