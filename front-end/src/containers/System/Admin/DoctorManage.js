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
} from '../../../services/userService'
import { toast } from 'react-toastify'
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

class DoctorManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewImg: '',
      contentMarkdown: '',
      contentHTML: '',
      description: '',
      selectedDoctor: '',
      doctorArray: [],
      hasOldDataMarkdow: false,
    }
  }

  async componentDidMount() {
    this.props.getAllDoctors()
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
      })
    }
    return result
  }

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    })
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
        contentMarkdown: markdown.contentMarkdown,
        contentHTML: markdown.contentHTML,
        description: markdown.description,
        hasOldDataMarkdow: true,
      })
    } else {
      this.setState({
        contentMarkdown: '',
        contentHTML: '',
        description: '',
        hasOldDataMarkdow: false,
      })
    }
    this.setState({
      previewImg: selectedDoctor.image,
      selectedDoctor: selectedDoctor,
    })
  }

  handleMarkdown = async () => {
    if (this.state.hasOldDataMarkdow === false) {
      // create information
      this.props.createDoctorInfo({
        contentMarkdown: this.state.contentMarkdown,
        contentHTML: this.state.contentHTML,
        description: this.state.description,
        doctorId: this.state.selectedDoctor.value,
      })

      // reset state
      if (this.props.isSuccess === true) {
        this.setState({
          previewImg: '',
          contentMarkdown: '',
          contentHTML: '',
          description: '',
          selectedDoctor: '',
          hasOldDataMarkdow: false,
        })
      }
    } else {
      // update information
      let response = await handleUpdateInfoDoctorById({
        contentMarkdown: this.state.contentMarkdown,
        contentHTML: this.state.contentHTML,
        description: this.state.description,
        doctorId: this.state.selectedDoctor.value,
      })

      if (response && response.errCode === 0) {
        toast.success('Update a doctor information successfully!')
        this.setState({
          previewImg: '',
          contentMarkdown: '',
          contentHTML: '',
          description: '',
          selectedDoctor: '',
          hasOldDataMarkdow: false,
        })
      }
    }
  }

  handleOnchangeDescription = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    return (
      <div className="doctor-manage-container">
        <div className="doctor-manage title">
          <FormattedMessage id="manage-user-redux.doctor-manage.title" />
        </div>
        <div className="more-information">
          <div className="content-left form-group">
            <label className="content-label">
              <FormattedMessage id="manage-user-redux.doctor-manage.info" />
            </label>
            <textarea
              className="form-control"
              cols="20"
              rows="8"
              name="description"
              value={this.state.description}
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
        <div className="doctor-manage-editor">
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
            required
          />
        </div>
        <button
          className="doctor-manage-save"
          onClick={() => this.handleMarkdown()}
        >
          <FormattedMessage
            id={
              this.state.hasOldDataMarkdow === false
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
