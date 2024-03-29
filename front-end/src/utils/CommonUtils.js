class CommonUtils {
  static isNumber1(number) {
    if (number === 1) return true
    return false
  }
  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  static convertBufferToBase64(imageData) {
    let imageBuffer = Buffer.from(imageData, 'base64').toString()
    return imageBuffer
  }

  static getCurrentTime() {
    const date = new Date()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const currentTime = `${hours}:${minutes}`
    return currentTime
  }

  static capitalizerFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  static checkValidateInput(inputData) {
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
}

export default CommonUtils
