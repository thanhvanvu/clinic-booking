import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './ClinicManage.scss'
import { CommonUtils } from '../../../utils'
// import markdownit
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css'
// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

class ClinicManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clinicName: '',
      clinicAddress: '',
      clinicContentHTML: '',
      clinicContentMarkdown: '',
      clinicImage: '',
      clinicPreviewImg: '',

      inputValidation: [],
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

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

  handleSpecialistEditorChange = ({ html, text }) => {
    let copiedState = { ...this.state }
    copiedState.clinicContentHTML = html
    copiedState.clinicContentMarkdown = text
    copiedState.inputValidation.descriptionMarkdown = true

    this.setState(copiedState)
  }

  handleCreateClinicManage = () => {
    console.log('abc')
    if (window.confirm('Are you sure to create this clinic information ?')) {
      let input = {
        name: this.state.clinicName,
        address: this.state.clinicAddress,
        descriptionHTML: this.state.clinicContentHTML,
        descriptionMarkdown: this.state.clinicContentMarkdown,
      }

      let isValidInput = CommonUtils.checkValidateInput(input)
      this.setState({
        inputValidation: isValidInput[0],
      })
    }
  }

  render() {
    console.log(this.state)
    let inputValidation = this.state.inputValidation
    return (
      <>
        <div className="clinic-manage-container wrapper">
          <div className="clinic-manage title">Tạo Clinic</div>
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
              <label htmlFor="clinic-create-new">Create new</label>
            </div>
            {/* <div>
              <input
                type="radio"
                name="clinic"
                id="clinic-update"
                value="update"
                onClick={() => this.handleRadioChange('update')}
              />
              <label htmlFor="clinic-update">Update </label>
            </div> */}
          </div>
          {/* {isUpdateclinic && (
        <Select
          value={this.state.selectedclinic}
          options={this.state.allclinicArr}
          onChange={(event) => this.handleSelectclinic(event)}
        />
      )} */}

          <div className="clinic-manage-content">
            <div className="clinic-content-left form-group">
              <label className="content-label">Tên Clinic</label>
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
              <label className="content-label">Ảnh bìa phòng khám</label>
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
                  <i class="fas fa-upload img-upload"></i>Tải ảnh
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
          </div>

          <div className="clinic-address">
            <label className="content-label">Clinic Address</label>
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
              onChange={this.handleSpecialistEditorChange}
              value={this.state.clinicContentMarkdown}
              required
            />
          </div>
          <div className="create-save-delete-btn">
            {this.state.isUpdateSpecialist === true ? (
              <>
                <button
                  className="clinic-manage-save"
                  onClick={() => this.handleUpdateSpecialistManage()}
                >
                  Update Phòng khám
                </button>
                <button
                  className="clinic-manage-save delete"
                  onClick={() => this.handleDeleteSpecialistManage()}
                >
                  Delete Chuyen khoa
                </button>
              </>
            ) : (
              <button
                className="clinic-manage-save"
                onClick={() => this.handleCreateClinicManage()}
              >
                Tao chuyen khoa
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
