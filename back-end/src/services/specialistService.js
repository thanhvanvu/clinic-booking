import { raw } from 'body-parser'
import e from 'express'
import db from '../models/index'

const handleCreateSpecialist = async (specialistData) => {
  try {
    await db.Specialist.create({
      tittle: specialistData.tittle,
      descriptionHTML: specialistData.descriptionHTML,
      descriptionMarkdown: specialistData.descriptionMarkdown,
      image: specialistData.image,
    })

    return {
      errCode: 0,
      status: 'Success',
      message: 'Created specialist successfully!',
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  handleCreateSpecialist,
}
