import React, { Component } from 'react'
// import styles from './styles.module.css'

export class Pulter extends Component {
  constructor(props) {
    super(props)
    this.holder = React.createRef()
    this.iframe = React.createRef()
    this.isModalShown = false
    this.uuid = this.generateUuid()

    this.state = {
      disabled: true,
      display: 'block'
    }
  }

  componentDidMount() {
    let {
      isOpen,
      onClose,
      onSubmit,
      customTheme,
      user,
      fields,
      autoMapHeaders,
      allowInvalidSubmit,
      translations,
      uploadStepHook,
      selectHeaderStepHook,
      matchColumnsStepHook,
      rowHook,
      tableHook,
      initialStepState,
      dateFormat,
      maxRecords,
      maxFileSize,
      autoMapDistance,
      dataSync
    } = this.props

    window.addEventListener(
      'message',
      (event) => {
        if (event.data === 'mainModalHidden') {
          if (this.holder && this.holder.current) {
            this.holder.current.style.display = 'none'
          }
          this.isModalShown = false
          onClose()
        }
        if (event.data === 'uploadSuccessful') {
          onSubmit(true)
          this.setState({ display: 'none' })
          isOpen = true
        }
        if (event.data.type === 'upload-failed') {
          onClose()
          onSubmit(false)
          this.setState({ display: 'none' })
          isOpen = true
        }
        if (typeof event.data === 'object') {
          if (event.data.type && event.data.type === 'submitData') {
            onSubmit(true, event.data.data)
            this.setState({ display: 'none' })
            isOpen = true
          }
        }
      },
      false
    )

    const userObj = {
      id: this.generateUuid()
    }

    const iframe = this.iframe.current

    iframe.onload = function () {
      iframe.contentWindow.postMessage(
        {
          type: 'userConfig',
          user: user || userObj,
          dataSync: dataSync || true,
          data: {
            fields: fields || null,
            autoMapHeaders: autoMapHeaders || true,
            allowInvalidSubmit: allowInvalidSubmit || false,
            translations: translations || null,
            isOpen: isOpen || null,
            customTheme: customTheme || null,
            initialStepState: initialStepState || null,
            dateFormat: dateFormat || null,
            maxRecords: maxRecords || null,
            maxFileSize: maxFileSize || null,
            autoMapDistance: autoMapDistance || null
          }
        },
        '*'
      )
      if (uploadStepHook) {
        const strHook = uploadStepHook.toString()
        iframe.contentWindow.postMessage(
          {
            type: 'uploadStepHook',
            data: {
              uploadStepHook: strHook
            }
          },
          '*'
        )
      }
      if (selectHeaderStepHook) {
        const strHook = selectHeaderStepHook.toString()
        iframe.contentWindow.postMessage(
          {
            type: 'selectHeaderStepHook',
            data: {
              selectHeaderStepHook: strHook
            }
          },
          '*'
        )
      }
      if (matchColumnsStepHook) {
        const strHook = matchColumnsStepHook.toString()
        iframe.contentWindow.postMessage(
          {
            type: 'matchColumnsStepHook',
            data: {
              matchColumnsStepHook: strHook
            }
          },
          '*'
        )
      }
      if (rowHook) {
        const strRowHook = rowHook.toString()
        iframe.contentWindow.postMessage(
          {
            type: 'rowHook',
            data: {
              rowHook: strRowHook
            }
          },
          '*'
        )
      }
      if (tableHook) {
        const strHook = tableHook.toString()
        iframe.contentWindow.postMessage(
          {
            type: 'tableHook',
            data: {
              tableHook: strHook
            }
          },
          '*'
        )
      }
    }
  }

  generateUuid() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    )
  }

  render() {
    const { templateId } = this.props

    const iframeSrc = `https://portal.pulter.co/?templateId=${templateId}`

    const holderStyle = {
      display: this.state.display,
      zIndex: 2147483647,
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }

    const iframeStyle = {
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: '0px',
      left: '0px'
    }

    return (
      <div style={holderStyle}>
        <iframe
          ref={this.iframe}
          style={iframeStyle}
          data-pulter-token={this.generateUuid()}
          src={iframeSrc}
          frameBorder='0'
        />
      </div>
    )
  }
}

export default Pulter
