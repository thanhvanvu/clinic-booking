import db from '../models/index'
import { raw } from 'body-parser'
import e from 'express'

const handleGetTopDoctor = async (limitRecord) => {
  try {
    const doctors = await db.User.findAll({
      limit: limitRecord,
      order: [['createdAt', 'DESC']],
      attributes: {
        exclude: ['password'],
      },
      raw: false,
      where: { roleId: 'R2' },
      include: [
        {
          model: db.Allcode,
          as: 'positionData',
          attributes: ['valueEN', 'valueES', 'valueVI'],
        },
        {
          model: db.Allcode,
          as: 'genderData',
          attributes: ['valueEN', 'valueES', 'valueVI'],
        },
      ],
    })

    return {
      status: 'Success',
      errCode: 0,
      message: 'OK',
      data: doctors,
    }
  } catch (error) {
    console.log(error)
  }
}

const handleGetAllDoctors = async () => {
  try {
    const doctors = await db.User.findAll({
      where: { roleId: 'R2' },
      raw: false,
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: db.Allcode,
          as: 'positionData',
          attributes: ['valueEN', 'valueES', 'valueVI'],
        },
        {
          model: db.Allcode,
          as: 'genderData',
          attributes: ['valueEN', 'valueES', 'valueVI'],
        },
      ],
    })

    return {
      status: 'Success',
      errCode: 0,
      message: 'OK',
      data: doctors,
    }
  } catch (error) {
    console.log(error)
  }
}

const handleCreateInfoDoctor = async (doctorInfo) => {
  try {
    if (
      doctorInfo.doctorId === '' ||
      doctorInfo.contentHTML === '' ||
      doctorInfo.contentMarkDown === ''
    ) {
      return {
        status: 'Fail',
        errCode: 1,
        message: 'Missing Parameter!',
      }
    } else {
      const doctorMarkdownData = await db.Markdown.create({
        contentHTML: doctorInfo.contentHTML,
        contentMarkdown: doctorInfo.contentMarkdown,
        description: doctorInfo.description,
        doctorId: doctorInfo.doctorId,
      })

      return {
        status: 'Success',
        errCode: 0,
        message: 'OK',
        data: doctorMarkdownData,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const handleGetDetailDoctorById = async (doctorId) => {
  try {
    if (!doctorId) {
      return {
        status: 'Fail',
        errCode: 1,
        message: 'Missing Parameter!',
      }
    } else {
      let doctor = await db.User.findOne({
        where: { id: doctorId },
        raw: false,
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: db.Allcode,
            as: 'positionData',
            attributes: ['valueEN', 'valueES', 'valueVI'],
          },

          {
            model: db.Allcode,
            as: 'genderData',
            attributes: ['valueEN', 'valueES', 'valueVI'],
          },

          {
            model: db.Markdown,
          },
        ],
        nest: true,
      })

      return {
        status: 'Success',
        errCode: 0,
        message: 'OK',
        data: doctor,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  handleGetTopDoctor: handleGetTopDoctor,
  handleGetAllDoctors: handleGetAllDoctors,
  handleCreateInfoDoctor: handleCreateInfoDoctor,
  handleGetDetailDoctorById: handleGetDetailDoctorById,
}
