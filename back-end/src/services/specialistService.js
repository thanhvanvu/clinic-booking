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
      attributes: ['id', 'tittle', 'image'],
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
  try {
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
  } catch (error) {
    console.log(error)
  }
}

const handleDeleteSpecialistById = async (specialistId) => {
  try {
    let specialist = await db.Specialist.findOne({
      where: {
        id: specialistId,
      },
    })

    if (specialist) {
      await specialist.destroy()

      return {
        errCode: 0,
        status: 'Success',
        message: 'Deleted Specialist Successfully!',
      }
    } else {
      return {
        errCode: 2,
        status: 'Fail',
        message: 'Specialist not found!',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const handleGetDoctorInSpecialist = async (specialistId) => {
  try {
    let doctors = await db.DoctorInfo.findAll({
      where: {
        specialistId: specialistId,
      },
      raw: true,
      attributes: ['doctorId'],

      include: [
        {
          model: db.Allcode,
          as: 'cityData',
        },
      ],

      nest: true,
    })

    if (doctors) {
      return {
        errCode: 0,
        status: 'Success',
        message: 'Ok!',
        data: doctors,
      }
    } else {
      return {
        errCode: 2,
        status: 'Success',
        message: 'Doctors not found!',
      }
    }
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  handleCreateSpecialist,
  handleGetAllSpecialist,
  handleGetSpecialistById,
  handleUpdateSpecialistById,
  handleDeleteSpecialistById,
  handleGetDoctorInSpecialist,
}
