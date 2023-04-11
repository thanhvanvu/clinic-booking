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

const handleGetClinicById = async (clinicId) => {
  try {
    let clinic = await db.Clinic.findOne({
      where: {
        id: clinicId,
      },
      raw: true,
    })

    if (clinic) {
      return {
        errCode: 0,
        status: 'Success',
        message: 'OK!',
        data: clinic,
      }
    } else {
      return {
        errCode: 0,
        status: 'Success',
        message: 'OK!',
        data: [],
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const handleGetDoctorByClinicId = async (clinicId) => {
  try {
    let doctors = await db.DoctorInfo.findAll({
      where: {
        clinicId: clinicId,
      },
      nest: true,
      raw: true,
      attributes: ['doctorId'],
      include: [
        {
          model: db.Clinic,
          as: 'clinicData',

          include: [
            {
              model: db.Allcode,
              as: 'cityData',
            },
          ],
        },
      ],
    })

    return {
      errCode: 0,
      status: 'Success',
      message: 'OK!',
      data: doctors,
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
      logo: clinicData.logo,
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
        logo: clinicData.logo,
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
  handleGetDoctorByClinicId,
  handleGetClinicById,
}
