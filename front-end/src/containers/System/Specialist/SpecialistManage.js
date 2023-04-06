import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import './SpecialistManage.scss'
import { connect } from 'react-redux'
import { CommonUtils } from '../../../utils'
import {
  handleCreateSpecialist,
  handleGetAllSpecialist,
  handleGetSpecialistById,
  handleUpdateSpecialistById,
  handleDeleteSpecialistById,
} from '../../../services/specialistService'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { isEmpty } from 'lodash'
// import markdownit
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

class SpecialistManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specialistTittle: '',
      specialistContentHTML: '',
      specialistContentMarkdown: '',
      specialistImage: '',
      specialistPreviewImg: '',

      allSpecialistArr: [],
      isUpdateSpecialist: false,

      selectedSpecialist: '',
      currentSpecialist: {},
      currentSpecialistId: '',

      inputValidation: [],
    }
  }

  async componentDidMount() {
    // when component mounts, call API to get all specialist
    let response = await handleGetAllSpecialist()
    if (response && response.errCode === 0) {
      let specialistData = response.data
      let specialistSelectData = this.buildSpecialistDataSelect(specialistData)
      this.setState({
        allSpecialistArr: specialistSelectData,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.currentSpecialist !== this.state.currentSpecialist) {
      let currentSpecialist = this.state.currentSpecialist

      if (isEmpty(currentSpecialist) === false) {
        let specialistPreviewImg = CommonUtils.convertBufferToBase64(
          currentSpecialist.image
        )
        this.setState({
          currentSpecialistId: currentSpecialist.id,
          specialistTittle: currentSpecialist.tittle,
          specialistContentHTML: currentSpecialist.descriptionHTML,
          specialistContentMarkdown: currentSpecialist.descriptionMarkdown,
          specialistImage: specialistPreviewImg,
          specialistPreviewImg: specialistPreviewImg,
        })
      }
    }
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

  handleSpecialistEditorChange = ({ html, text }) => {
    let copiedState = { ...this.state }
    copiedState.specialistContentHTML = html
    copiedState.specialistContentMarkdown = text
    copiedState.inputValidation.descriptionMarkdown = true

    this.setState(copiedState)
  }

  handleOnchangeImage = async (event) => {
    let file = event.target.files[0]
    let fileType = file.type.slice(0, 5)
    if (file && fileType === 'image') {
      let base64 = await CommonUtils.getBase64(file)
      let objectUrl = URL.createObjectURL(file)

      this.setState({
        specialistImage: base64,
        specialistPreviewImg: objectUrl,
      })
    }
  }

  handleRadioChange = async (value) => {
    if (value === 'create') {
      this.setState({
        specialistTittle: '',
        specialistContentHTML: '',
        specialistContentMarkdown: '',
        specialistImage: '',
        specialistPreviewImg: '',
        isUpdateSpecialist: false,
        currentSpecialist: {},
      })
    } else if (value === 'update') {
      // call API to get all specialist
      let response = await handleGetAllSpecialist()
      if (response && response.errCode === 0) {
        let specialistData = response.data
        let specialistSelectData =
          this.buildSpecialistDataSelect(specialistData)
        this.setState({
          allSpecialistArr: specialistSelectData,
          isUpdateSpecialist: true,
        })
      }
    }
  }

  handleSelectSpecialist = async (specialist) => {
    if (specialist) {
      let specialistId = specialist.value

      // call API
      let response = await handleGetSpecialistById(specialistId)
      if (response && response.errCode === 0) {
        this.setState({
          selectedSpecialist: specialist,
          currentSpecialist: response.data,
        })
      }
    }
  }

  handleCreateSpecialistManage = async () => {
    if (window.confirm('Are you sure to create this specialist ?')) {
      let input = {
        tittle: this.state.specialistTittle,
        descriptionHTML: this.state.specialistContentHTML,
        descriptionMarkdown: this.state.specialistContentMarkdown,
      }
      let isValidInput = CommonUtils.checkValidateInput(input)
      this.setState({
        inputValidation: isValidInput[0],
      })

      if (isValidInput[1] === true) {
        let response = await handleCreateSpecialist({
          tittle: this.state.specialistTittle,
          descriptionHTML: this.state.specialistContentHTML,
          descriptionMarkdown: this.state.specialistContentMarkdown,
          image: this.state.specialistImage,
        })

        if (response && response.errCode === 0) {
          toast.success('Created specialist successfully!')

          // reset input
          this.setState({
            specialistTittle: '',
            specialistContentHTML: '',
            specialistContentMarkdown: '',
            specialistImage: '',
            specialistPreviewImg: '',
          })
        }
      }
    }
  }

  handleUpdateSpecialistManage = async () => {
    if (window.confirm('Are you sure to update this specialist ?')) {
      let input = {
        tittle: this.state.specialistTittle,
        descriptionHTML: this.state.specialistContentHTML,
        descriptionMarkdown: this.state.specialistContentMarkdown,
      }

      let isValidInput = CommonUtils.checkValidateInput(input)

      this.setState({
        inputValidation: isValidInput[0],
      })

      if (isValidInput[1] === true) {
        let response = await handleUpdateSpecialistById({
          id: this.state.currentSpecialistId,
          tittle: this.state.specialistTittle,
          descriptionHTML: this.state.specialistContentHTML,
          descriptionMarkdown: this.state.specialistContentMarkdown,
          image: this.state.specialistImage,
        })

        if (response && response.errCode === 0) {
          toast.success('Updated specialist successfully!')

          // reset input
          this.setState({
            selectedSpecialist: '',
            specialistTittle: '',
            specialistContentHTML: '',
            specialistContentMarkdown: '',
            specialistImage: '',
            specialistPreviewImg: '',
          })

          // after update, refresh the specialist array
          let response = await handleGetAllSpecialist()
          if (response && response.errCode === 0) {
            let specialistData = response.data
            let specialistSelectData =
              this.buildSpecialistDataSelect(specialistData)
            this.setState({
              allSpecialistArr: specialistSelectData,
            })
          }
        }
      }
    }
  }

  handleDeleteSpecialistManage = async () => {
    if (window.confirm('Are you sure to delete this specialist ?')) {
      let response = await handleDeleteSpecialistById(
        this.state.currentSpecialistId
      )

      if (response && response.errCode === 0) {
        toast.warn('Deleted specialist successfully!')

        // reset input
        this.setState({
          selectedSpecialist: '',
          specialistTittle: '',
          specialistContentHTML: '',
          specialistContentMarkdown: '',
          specialistImage: '',
          specialistPreviewImg: '',
        })

        // after update, refresh the specialist array
        let response = await handleGetAllSpecialist()
        if (response && response.errCode === 0) {
          let specialistData = response.data
          let specialistSelectData =
            this.buildSpecialistDataSelect(specialistData)
          this.setState({
            allSpecialistArr: specialistSelectData,
          })
        }
      }
    }
  }

  render() {
    let isUpdateSpecialist = this.state.isUpdateSpecialist
    let inputValidation = this.state.inputValidation

    return (
      <>
        <div className="specialist-manage-container wrapper">
          <div className="specialist-manage title">
            <FormattedMessage id="manage-specialist.tittle" />
          </div>
          <div className="select-create-update">
            <div>
              <input
                type="radio"
                name="specialist"
                id="specialist-create-new"
                value="create"
                defaultChecked
                onClick={() => this.handleRadioChange('create')}
              />
              <label htmlFor="specialist-create-new">
                <FormattedMessage id="manage-specialist.create-new" />
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="specialist"
                id="specialist-update"
                value="update"
                onClick={() => this.handleRadioChange('update')}
              />
              <label htmlFor="specialist-update">
                <FormattedMessage id="manage-specialist.update" />{' '}
              </label>
            </div>
          </div>
          {isUpdateSpecialist && (
            <Select
              value={this.state.selectedSpecialist}
              options={this.state.allSpecialistArr}
              onChange={(event) => this.handleSelectSpecialist(event)}
            />
          )}

          <div className="specialist-manage-content">
            <div className="specialist-content-left form-group">
              <label className="content-label">
                <FormattedMessage id="manage-specialist.specialist-title" />
              </label>
              <input
                type="text"
                className={
                  inputValidation.tittle === false
                    ? 'form-control invalid'
                    : 'form-control'
                }
                name="specialistTittle"
                value={this.state.specialistTittle}
                onChange={(event) =>
                  this.setState({
                    inputValidation: {
                      ...this.state.inputValidation,
                      tittle: true,
                    },
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </div>
            <div className="specialist-content-right form-group">
              <label className="content-label">
                <FormattedMessage id="manage-specialist.specialist-background" />
              </label>
              <div className="specialist-image">
                <input
                  type="file"
                  id="image-upload"
                  hidden
                  onChange={(event) => {
                    this.handleOnchangeImage(event)
                  }}
                />
                <label htmlFor="image-upload" className="image-upload">
                  <i class="fas fa-upload img-upload"></i>
                  <FormattedMessage id="manage-specialist.specialist-upload" />
                </label>
                {this.state.specialistPreviewImg && (
                  <div className="image-specialist">
                    <img
                      alt=""
                      src={
                        this.state.specialistPreviewImg
                          ? this.state.specialistPreviewImg
                          : ''
                      }
                    ></img>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={
              inputValidation.descriptionMarkdown === false
                ? 'specialist-manage-editor invalid'
                : 'specialist-manage-editor'
            }
          >
            <MdEditor
              style={{ height: '500px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleSpecialistEditorChange}
              value={this.state.specialistContentMarkdown}
              required
            />
          </div>
          <div className="create-save-delete-btn">
            {this.state.isUpdateSpecialist === true ? (
              <>
                <button
                  className="specialist-manage-save"
                  onClick={() => this.handleUpdateSpecialistManage()}
                >
                  <FormattedMessage id="manage-specialist.specialist-update" />
                </button>
                <button
                  className="specialist-manage-save delete"
                  onClick={() => this.handleDeleteSpecialistManage()}
                >
                  <FormattedMessage id="manage-specialist.specialist-delete" />
                </button>
              </>
            ) : (
              <button
                className="specialist-manage-save"
                onClick={() => this.handleCreateSpecialistManage()}
              >
                <FormattedMessage id="manage-specialist.specialist-create" />
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialistManage)
