import { raw } from 'body-parser'
import e from 'express'
import db from '../models/index'

const handleCreateClinic = async (clinicData) => {
  try {
    await db.Clinic.create({
      name: clinicData.name,
      address: clinicData.address,
      descriptionHTML: clinicData.descriptionHTML,
      descriptionMarkdown: clinicData.descriptionMarkdown,
      image: clinicData.image,
    })

    return {
      errCode: 0,
      status: 'Success',
      message: 'Created Clinic successfully!',
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  handleCreateClinic,
}
