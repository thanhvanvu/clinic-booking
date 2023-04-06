import { raw } from 'body-parser'
import e from 'express'
import db from '../models/index'

const handleGetAllClinic = async () => {
  try {
    let clinics = await db.Clinic.findAll({
      raw: true,
    })

    return {
      errCode: 0,
      status: 'Success',
      message: 'OK!',
      data: clinics,
    }
  } catch (error) {
    console.log(error)
  }
}

const handleCreateClinic = async (clinicData) => {
  try {
    await db.Clinic.create({
      name: clinicData.name,
      address: clinicData.address,
      city: clinicData.city,
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

const handleUpdateClinic = async (clinicData) => {
  try {
    let clinic = await db.Clinic.findOne({
      where: {
        id: clinicData.id,
      },
    })

    if (clinic) {
      clinic.set({
        name: clinicData.name,
        address: clinicData.address,
        city: clinicData.city,
        descriptionHTML: clinicData.descriptionHTML,
        descriptionMarkdown: clinicData.descriptionMarkdown,
        image: clinicData.image,
      })

      await clinic.save()

      return {
        errCode: 0,
        status: 'Success',
        message: 'Updated Clinic successfully!',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const handleDeleteClinic = async (clinicId) => {
  try {
    let clinic = await db.Clinic.findOne({
      where: {
        id: clinicId,
      },
    })

    if (clinic) {
      await clinic.destroy()

      return {
        errCode: 0,
        status: 'Success',
        message: 'Deleted Clinic successfully!',
      }
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  handleCreateClinic,
  handleGetAllClinic,
  handleUpdateClinic,
  handleDeleteClinic,
}
