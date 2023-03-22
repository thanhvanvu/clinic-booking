import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import './SpecialistManage.scss'
import { connect } from 'react-redux'
import { CommonUtils } from '../../../utils'
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
      specialistTitle: '',
      specialistContentHTML: '',
      specialistContentMarkdown: '',
      specialistImage: '',
      specialistPreviewImg: '',
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleSpecialistEditorChange = ({ html, text }) => {
    let copiedState = { ...this.state }
    copiedState.specialistContentHTML = html
    copiedState.specialistContentMarkdown = text

    this.setState(copiedState)
  }

  handleOnchangeImage = async (event) => {
    console.log(event)
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

  handleSpecialistManage = () => {
    console.log('avasd')
  }

  render() {
    console.log(this.state)
    return (
      <>
        <div className="specialist-manage-container wrapper">
          <div className="specialist-manage title">Tạo chuyên khoa</div>
          <div className="specialist-manage-content">
            <div className="specialist-content-left form-group">
              <label className="content-label">Tên chuyên khoa</label>
              <input
                type="text"
                className="form-control"
                name="specialistTitle"
                value={this.state.specialistTitle}
                onChange={(event) =>
                  this.setState({
                    [event.target.name]: event.target.value,
                  })
                }
              />
            </div>
            <div className="specialist-content-right form-group">
              <label className="content-label">Ảnh chuyên khoa</label>
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
                  <i class="fas fa-upload img-upload"></i>Tải ảnh
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
                      onClick={() => this.openPreviewImg()}
                    ></img>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="specialist-manage-editor">
            <MdEditor
              style={{ height: '500px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleSpecialistEditorChange}
              value={this.state.specialistContent}
              required
            />
          </div>

          <button
            className="specialist-manage-save"
            onClick={() => this.handleSpecialistManage()}
          >
            Tao chuyen khoa
          </button>
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
