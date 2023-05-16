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
import isEmpty from 'lodash/isEmpty'

import {
  handleGetAllCode,
  handleGetDoctorClinicInfo,
  handleCreateDoctorClinicInfo,
  handleUpdateDoctorClinicInfo,
} from '../../../services/userService'

import { handleGetAllSpecialist } from '../../../services/specialistService'
import { toast } from 'react-toastify'

import { LANGUAGES } from '../../../utils/constant'
import { handleGetAllClinic } from '../../../services/clinicService'
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

class DoctorManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDoctor: '',
      doctorArray: [],
      doctorId: '',
      previewImg: '',

      contentMarkdown: '',
      contentHTML: '',
      description: '',

      priceArr: [],
      selectedPrice: '',

      paymentArr: [],
      selectedPayment: '',

      note: '',

      allClinicArr: [],
      allClinicOption: [],
      selectedClinic: {},
      clinic: {},
      clinicId: '',

      allSpecialistArr: [],
      specialist: {},
      specialistId: '',

      inputValidDoctorInfo: '',
      hasOldData: false,
    }
  }

  // handleDoctorManage = async () => {
  //   this.handleCreateUpdateMarkdown()
  //   this.handleCreateUpdateClinic()
  // }

  // handleCreateUpdateMarkdown = async () => {
  //   if (this.state.hasOldDataMarkdow === false) {
  //     // check validate
  //     let markdownIsvalid = this.checkValidateInput(this.state.markdown)
  //     if (markdownIsvalid[1] === true && this.state.selectedDoctor.value) {
  //       // create information
  //       this.props.createDoctorInfo({
  //         contentMarkdown: this.state.markdown.contentMarkdown,
  //         contentHTML: this.state.markdown.contentHTML,
  //         description: this.state.markdown.description,
  //         doctorId: this.state.selectedDoctor.value,
  //       })
  //     } else {
  //       this.setState({
  //         inputValidMarkdown: markdownIsvalid[0],
  //       })
  //     }
  //     // reset state
  //     if (this.props.isSuccess === true) {
  //       this.setState({
  //         previewImg: '',
  //         selectedDoctor: '',
  //         hasOldDataMarkdow: false,
  //         markdown: {
  //           contentMarkdown: '',
  //           contentHTML: '',
  //           description: '',
  //         },
  //       })
  //     }
  //   } else {
  //     // update information
  //     let response = await handleUpdateInfoDoctorById({
  //       contentMarkdown: this.state.markdown.contentMarkdown,
  //       contentHTML: this.state.markdown.contentHTML,
  //       description: this.state.markdown.description,
  //       doctorId: this.state.selectedDoctor.value,
  //     })
  //     if (response && response.errCode === 0) {
  //       toast.success('Update a doctor information successfully!')
  //       // reset input
  //       this.setState({
  //         markdown: {
  //           contentMarkdown: '',
  //           contentHTML: '',
  //           description: '',
  //         },
  //         previewImg: '',
  //         selectedDoctor: '',
  //         hasOldDataMarkdow: false,
  //       })
  //     }
  //   }
  // }

  // handleCreateUpdateClinic = async () => {
  //   // handle create/update doctorInfo table
  //   if (this.state.hasOldClinicInfo === false) {
  //     // check validate
  //     let isValid = this.checkValidateInput(this.state.doctorClinicInfo)

  //     // create clinic info
  //     if (isValid[1] === true && this.state.selectedDoctor.value) {
  //       let doctorClinicInfo = this.state.doctorClinicInfo
  //       let response = await handleCreateDoctorClinicInfo({
  //         doctorId: this.state.selectedDoctor.value,
  //         specialistId: doctorClinicInfo.specialistId,
  //         clinicId: doctorClinicInfo.clinicId,
  //         priceId: doctorClinicInfo.selectedPrice,
  //         paymentId: doctorClinicInfo.selectedPayment,
  //         note: doctorClinicInfo.note,
  //       })

  //       if (response && response.errCode === 0) {
  //         toast.success('Create a doctor information successfully!')
  //         // reset input
  //         this.setState({
  //           markdown: {
  //             contentMarkdown: '',
  //             contentHTML: '',
  //             description: '',
  //           },
  //           doctorClinicInfo: {
  //             selectedPrice: '',
  //             note: '',
  //             selectedPayment: '',
  //             specialist: {},
  //             specialistId: '',
  //             clinic: {},
  //             clinicId: '',
  //           },
  //           previewImg: '',
  //           selectedDoctor: '',
  //           hasOldDataMarkdow: false,
  //           hasOldClinicInfo: false,
  //         })
  //       }
  //     } else {
  //       this.setState({
  //         inputValidDoctorInfo: isValid[0],
  //       })
  //     }
  //   } else if (this.state.hasOldClinicInfo === true) {
  //     // check validate
  //     let isValid = this.checkValidateInput(this.state.doctorClinicInfo)

  //     // UPDATE clinic info
  //     if (isValid[1] === true && this.state.selectedDoctor.value) {
  //       let doctorClinicInfo = this.state.doctorClinicInfo
  //       let response = await handleUpdateDoctorClinicInfo({
  //         doctorId: this.state.selectedDoctor.value,
  //         specialistId: doctorClinicInfo.specialistId,
  //         priceId: doctorClinicInfo.selectedPrice,
  //         cityId: doctorClinicInfo.selectedCity,
  //         paymentId: doctorClinicInfo.selectedPayment,
  //         addressClinic: doctorClinicInfo.clinicAddress,
  //         nameClinic: doctorClinicInfo.clinicName,
  //       })

  //       if (response && response.errCode === 0) {
  //         toast.success('Update a doctor information successfully!')

  //         // reset input
  //         this.setState({
  //           markdown: {
  //             contentMarkdown: '',
  //             contentHTML: '',
  //             description: '',
  //           },
  //           doctorClinicInfo: {
  //             selectedCity: '',
  //             selectedPrice: '',
  //             clinicName: '',
  //             clinicAddress: '',
  //             note: '',
  //             selectedPayment: '',
  //             specialist: {},
  //             specialistId: '',
  //           },
  //           previewImg: '',
  //           selectedDoctor: '',
  //           hasOldDataMarkdow: false,
  //           hasOldClinicInfo: false,
  //         })
  //       }
  //     } else {
  //       this.setState({
  //         inputValidDoctorInfo: isValid[0],
  //       })
  //     }
  //   }
  // }

  async componentDidMount() {
    this.props.getAllDoctors()

    //#region  get city code
    let codeArr = ['PAYMENT', 'PRICE']
    codeArr.forEach(async (code) => {
      let response = await handleGetAllCode(code)
      if (response && response.errCode === 0) {
        if (code === 'PAYMENT') {
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
    //#endregion

    // get all specialist
    let response = await handleGetAllSpecialist()
    if (response && response.errCode === 0) {
      let specialistData = response.data
      let specialistSelectData = this.buildSpecialistDataSelect(specialistData)
      this.setState({
        allSpecialistArr: specialistSelectData,
      })
    }

    // get all clinic information
    let responseClinic = await handleGetAllClinic()
    if (responseClinic && responseClinic.errCode === 0) {
      let clinicData = responseClinic.data
      let clinicSelectData = this.buildClinicDataSelect(clinicData)
      this.setState({
        allClinicArr: clinicData,
        allClinicOption: clinicSelectData,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // everytime the prop update, do something
    if (prevProps.doctors !== this.props.doctors) {
      let builtData = this.buildDataInputSelect(this.props.doctors)
      this.setState({
        doctorArray: builtData,
      })
    }
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

  buildSpecialistDataSelect = (specialistData) => {
    let result = []
    if (specialistData && specialistData.length > 0) {
      specialistData.map((specialist, index) => {
        let object = {}
        object.label = specialist.tittle
        object.value = specialist.id
        result.push(object)
        return result
      })
    }
    return result
  }

  buildClinicDataSelect = (clinicData) => {
    let result = []
    if (clinicData && clinicData.length > 0) {
      clinicData.map((clinic, index) => {
        let object = {}
        object.label = clinic.name
        object.value = clinic.id
        result.push(object)
        return result
      })
    }
    return result
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      // inputValidMarkdown: {
      //   ...this.state.inputValidMarkdown,
      //   contentHTML: true,
      //   contentMarkdown: true,
      // },
      contentMarkdown: text,
      contentHTML: html,
    })
  }

  handleOnchangeDescription = (event) => {
    this.setState({
      // inputValidMarkdown: {
      //   ...this.state.inputValidMarkdown,
      //   [event.target.name]: true,
      // },
      [event.target.name]: event.target.value,
    })
  }

  handleOnchangeDoctorInfo = (event) => {
    this.setState({
      // inputValidDoctorInfo: {
      //   ...this.state.inputValidDoctorInfo,
      //   [event.target.name]: true,
      // },
      [event.target.name]: event.target.value,
    })
  }

  handleSelectClinic = (clinicInfo) => {
    let allClinic = this.state.allClinicArr
    let selectedClinic = allClinic.find(
      (clinic) => clinic.id === clinicInfo.value
    )
    if (clinicInfo) {
      this.setState({
        // inputValidDoctorInfo: {
        //   ...this.state.inputValidDoctorInfo,
        //   specialistId: true,
        // },
        clinicId: clinicInfo.value,
        clinic: clinicInfo,
        selectedClinic: selectedClinic,
      })
    }
  }

  handleSelectSpecialist = (specialist) => {
    if (specialist) {
      this.setState({
        // inputValidDoctorInfo: {
        //   ...this.state.inputValidDoctorInfo,
        //   specialistId: true,
        // },
        specialistId: specialist.value,
        specialist: specialist,
      })
    }
  }

  handleSelectedDoctor = async (selectedDoctor) => {
    let doctorId = selectedDoctor.value

    this.setState({
      previewImg: selectedDoctor.image,
      selectedDoctor: selectedDoctor,
      doctorId: doctorId,
    })

    let response = await handleGetDoctorClinicInfo(doctorId)
    if (response && response.errCode === 0) {
      let doctorClinicInfo = response.data

      if (isEmpty(doctorClinicInfo)) {
        // reset input
        this.setState({
          contentMarkdown: '',
          contentHTML: '',
          description: '',

          selectedPrice: '',

          selectedPayment: '',

          note: '',

          selectedClinic: '',
          clinic: '',
          clinicId: '',

          specialist: '',
          specialistId: '',

          hasOldData: false,
        })
      } else {
        this.setState({
          doctorId: doctorClinicInfo.doctorId,
          contentHTML: doctorClinicInfo.contentHTML,
          contentMarkdown: doctorClinicInfo.contentMarkdown,
          description: doctorClinicInfo.description,
          clinicId: doctorClinicInfo.clinicId,
          clinic: doctorClinicInfo.clinicData
            ? { label: doctorClinicInfo.clinicData.name }
            : null,
          selectedClinic: doctorClinicInfo.clinicData,
          specialistId: doctorClinicInfo.specialistId,
          specialist: doctorClinicInfo.specialistData
            ? { label: doctorClinicInfo.specialistData.tittle }
            : null,
          selectedPayment: doctorClinicInfo.paymentId,
          selectedPrice: doctorClinicInfo.priceId,
          note: doctorClinicInfo.note,
          hasOldData: true,
        })
      }
    }
  }

  createDoctorInfo = async () => {
    let input = {
      doctorId: this.state.doctorId,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      specialistId: this.state.specialistId,
      clinicId: this.state.clinicId,
      priceId: this.state.selectedPrice,
      paymentId: this.state.selectedPayment,
      note: this.state.note,
    }

    let isValid = this.checkValidateInput(input)

    this.setState({
      inputValidDoctorInfo: isValid[0],
    })

    if (isValid[1] === true) {
      let response = await handleCreateDoctorClinicInfo(input)
      if (response && response.errCode === 0) {
        toast.success('Created doctor clinic information successfully!')

        // reset input
        this.setState({
          selectedDoctor: '',

          doctorId: '',
          previewImg: '',

          contentMarkdown: '',
          contentHTML: '',
          description: '',

          selectedPrice: '',

          selectedPayment: '',

          note: '',

          selectedClinic: '',
          clinic: '',
          clinicId: '',

          specialist: {},
          specialistId: '',
        })
      }
    }
  }

  updateDoctorInfo = async () => {
    let input = {
      doctorId: this.state.doctorId,
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      specialistId: this.state.specialistId,
      clinicId: this.state.clinicId,
      priceId: this.state.selectedPrice,
      paymentId: this.state.selectedPayment,
      note: this.state.note,
    }

    let isValid = this.checkValidateInput(input)

    this.setState({
      inputValidDoctorInfo: isValid[0],
    })

    if (isValid[1] === true) {
      let response = await handleUpdateDoctorClinicInfo(input)
      if (response && response.errCode === 0) {
        toast.success('Updated Doctor successfully!')

        // reset input
        this.setState({
          selectedDoctor: '',
          previewImg: '',
          contentMarkdown: '',
          contentHTML: '',
          description: '',

          selectedPrice: '',

          selectedPayment: '',

          note: '',

          selectedClinic: '',
          clinic: '',
          clinicId: '',

          specialist: '',
          specialistId: '',

          hasOldData: false,
        })
      }
    }
  }

  render() {
    //
    let paymentArr = this.state.paymentArr
    let priceArr = this.state.priceArr
    let currentLanguage = this.props.language
    let selectedClinic = this.state.selectedClinic

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
                this.state.inputValidDoctorInfo.description === false
                  ? 'form-control invalid'
                  : 'form-control'
              }
              cols="20"
              rows="8"
              name="description"
              value={this.state.description}
              onChange={(event) => this.handleOnchangeDoctorInfo(event)}
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
          <div className="col-6 form-group">
            <label className="content-label">Clinic</label>
            <div
              className={
                this.state.inputValidDoctorInfo.clinicId === false
                  ? 'invalid'
                  : ''
              }
            >
              <Select
                value={this.state.clinic}
                options={this.state.allClinicOption}
                onChange={(event) => this.handleSelectClinic(event)}
              />
            </div>
          </div>
          <div className="col-6 form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.specialist" />
            </label>
            <div
              className={
                this.state.inputValidDoctorInfo.specialistId === false
                  ? 'invalid'
                  : ''
              }
            >
              <Select
                value={this.state.specialist}
                options={this.state.allSpecialistArr}
                onChange={(event) => this.handleSelectSpecialist(event)}
              />
            </div>
          </div>
          <div className="col-3 form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.clinic-name" />
            </label>
            <input
              className="form-control"
              name="clinicName"
              disabled
              value={selectedClinic ? selectedClinic.name : ''}
            />
          </div>
          <div className="col-3 form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.clinic-address" />
            </label>
            <input
              className="form-control"
              name="clinicAddress"
              disabled
              value={selectedClinic ? selectedClinic.address : ''}
            />
          </div>

          <div className="col-3 form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.price" />
            </label>
            <select
              className={
                this.state.inputValidDoctorInfo.priceId === false
                  ? 'form-control invalid'
                  : 'form-control'
              }
              name="selectedPrice"
              value={this.state.selectedPrice}
              onChange={(event) => this.handleOnchangeDoctorInfo(event)}
            >
              {this.state.selectedPrice === '' && (
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
          <div className="col-3 form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.referral-payment" />
            </label>
            <select
              className={
                this.state.inputValidDoctorInfo.paymentId === false
                  ? 'form-control invalid'
                  : 'form-control'
              }
              name="selectedPayment"
              value={this.state.selectedPayment}
              onChange={(event) => this.handleOnchangeDoctorInfo(event)}
            >
              {this.state.selectedPayment === '' && (
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
              value={this.state.note}
              onChange={(event) => this.handleOnchangeDoctorInfo(event)}
            />
          </div>
        </div>
        <div
          className={
            this.state.inputValidDoctorInfo.contentMarkdown === false
              ? 'doctor-manage-editor invalid'
              : 'doctor-manage-editor'
          }
        >
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
            required
          />
        </div>

        {this.state.hasOldData === false ? (
          <button
            className="doctor-manage-save"
            onClick={() => this.createDoctorInfo()}
          >
            <FormattedMessage id="manage-user-redux.doctor-manage.create" />
          </button>
        ) : (
          <button
            className="doctor-manage-save"
            onClick={() => this.updateDoctorInfo()}
          >
            <FormattedMessage id="manage-user-redux.doctor-manage.update" />
          </button>
        )}
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
