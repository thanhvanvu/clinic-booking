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

const handleGetAllSpecialist = async () => {
  try {
    let allSpecialist = await db.Specialist.findAll({
      raw: false,
      attributes: ['id', 'tittle'],
    })

    return {
      errCode: 0,
      status: 'Success',
      message: 'OK!',
      data: allSpecialist,
    }
  } catch (error) {
    console.log(error)
  }
}

const handleGetSpecialistById = async (specialistId) => {
  try {
    let specialistData = await db.Specialist.findOne({
      where: {
        id: specialistId,
      },
    })
    return {
      errCode: 0,
      status: 'Success',
      message: 'OK!',
      data: specialistData,
    }
  } catch (error) {
    console.log(error)
  }
}

const handleUpdateSpecialistById = async (specialistData) => {
  let specialist = await db.Specialist.findOne({
    where: {
      id: specialistData.id,
    },
  })

  if (specialist) {
    specialist.set({
      tittle: specialistData.tittle,
      descriptionHTML: specialistData.descriptionHTML,
      descriptionMarkdown: specialistData.descriptionMarkdown,
      image: specialistData.image,
    })

    await specialist.save()

    return {
      errCode: 0,
      status: 'Success',
      message: 'Updated Specialist Successfully!',
      data: specialistData,
    }
  } else {
    return {
      errCode: 2,
      status: 'Fail',
      message: 'Specialist not found!',
      data: specialistData,
    }
  }
  try {
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  handleCreateSpecialist,
  handleGetAllSpecialist,
  handleGetSpecialistById,
  handleUpdateSpecialistById,
}
