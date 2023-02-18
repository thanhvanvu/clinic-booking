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
}

export default CommonUtils
