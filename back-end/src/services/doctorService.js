import db from '../models/index'
import { raw } from 'body-parser'
import e from 'express'
import _ from 'lodash'
// config dotenv
require('dotenv').config()

const handleGetTopDoctor = async (limitRecord) => {
  try {
    const doctors = await db.User.findAll({
      limit: limitRecord,
      // order: [['createdAt', 'DESC']],
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
      doctorInfo.contentMarkDown === '' ||
      doctorInfo.description === ''
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

          {
            model: db.DoctorInfo,
            include: [
              {
                model: db.Allcode,
                as: 'paymentData',
                attributes: ['valueEN', 'valueES', 'valueVI'],
              },
              {
                model: db.Allcode,
                as: 'cityData',
                attributes: ['valueEN', 'valueES', 'valueVI'],
              },
              {
                model: db.Allcode,
                as: 'priceData',
                attributes: ['valueEN', 'valueES', 'valueVI'],
              },
            ],
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

const updateInfoDoctorById = async (doctorInfo) => {
  try {
    const markdownInfo = await db.Markdown.findOne({
      where: { doctorId: doctorInfo.doctorId },
    })

    // 4. update user
    if (markdownInfo) {
      await markdownInfo.set({
        contentHTML: doctorInfo.contentHTML,
        contentMarkdown: doctorInfo.contentMarkdown,
        description: doctorInfo.description,
      })

      await markdownInfo.save()

      return {
        status: 'Success',
        errCode: 0,
        message: 'Markdown Updated Successfully!',
      }
    } else {
      return {
        status: 'Fail',
        errCode: 1,
        message: 'Markdown not found!',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const handleBulkCreateSchedule = async (scheduleInfo) => {
  try {
    if (!scheduleInfo) {
      return {
        status: 'Fail',
        errCode: 1,
        message: 'Missing Parameter!',
      }
    } else {
      //#region  Get date, doctorId
      let date = ''
      let doctorId = ''
      if (scheduleInfo && scheduleInfo.length > 0) {
        scheduleInfo.map((item, index) => {
          date = new Date(item.date)
          doctorId = item.doctorId
          return
        })
      }
      //#endregion

      // convert string to number
      if (scheduleInfo && scheduleInfo.length > 0) {
        scheduleInfo.map((item, index) => {
          item.maxNumber = process.env.MAXIMUM_SCHEDULE
          return item
        })
      }

      //find all existing schedule in database
      let scheduleExist = await db.Schedule.findAll({
        where: { doctorId: doctorId, date: date },
        // raw: true,
      })

      // Delete all old record in database
      if (scheduleExist && scheduleExist.length > 0) {
        scheduleExist.forEach((schedule) => {
          schedule.destroy()
        })
      }

      if (scheduleInfo && scheduleInfo.length > 0) {
        await db.Schedule.bulkCreate(scheduleInfo)
      }

      // compare existing schedule with schedule from client
      // const differentSchedules = _.differenceWith(
      //   scheduleInfo,
      //   scheduleExist,
      //   (a, b) => {
      //     return a.timeType === b.timeType && a.date === b.date
      //   }
      // )

      // if existing has more schedule than schedule from client => delete different
      // if (scheduleInfo && scheduleInfo.length > 0) {
      //   if (scheduleExist && scheduleExist.length > 0) {
      //     if (scheduleExist.length > scheduleInfo.length) {
      //       // compare existing schedule with schedule from client
      //       const differentSchedules = _.differenceWith(
      //         scheduleExist,
      //         scheduleInfo,
      //         (a, b) => {
      //           return a.timeType === b.timeType && a.date === b.date
      //         }
      //       )

      //       // delete the diffrent schedule
      //       differentSchedules.forEach(async (schedule) => {
      //         await schedule.destroy()
      //       })
      //     }
      //   }
      // }

      // console.log('from client', scheduleInfo)
      // console.log('exist', scheduleExist)
      // console.log('different', differentSchedules)

      // if existing schedule = [], different schedule = schedule from client
      // if (differentSchedules && differentSchedules.length > 0) {
      //   await db.Schedule.bulkCreate(differentSchedules)
      // }

      return {
        status: 'Success',
        errCode: 0,
        message: 'Schedule Created Successfully!',
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const handleGetScheduleByDoctorId = async (doctorId, date) => {
  try {
    if (!doctorId && !date) {
      return {
        status: 'Fail',
        errCode: 1,
        message: 'Missing parameter!',
      }
    } else {
      let existingSchedules = await db.Schedule.findAll({
        where: {
          doctorId: doctorId,
          date: new Date(date),
        },
        raw: true,
        include: [
          {
            model: db.Allcode,
            as: 'timeTypeData',
            attributes: ['valueEN', 'valueES', 'valueVI'],
          },
        ],
        nest: true, // make a nest object with db Allcode
      })

      return {
        status: 'Success',
        errCode: 0,
        message: 'OK!',
        data: existingSchedules,
      }
    }
  } catch (error) {
    console.log(error)
  }
}

const handleGetDoctorClinicInfoById = async (doctorId) => {
  try {
    let doctor_clinic_info = await db.DoctorInfo.findOne({
      where: {
        doctorId: doctorId,
      },
      raw: false,
    })

    return {
      status: 'Success',
      errCode: 0,
      message: 'OK',
      data: doctor_clinic_info,
    }
  } catch (error) {
    console.log(error)
  }
}

const handleCreateDoctorClinicInfo = async (doctor_clinic_info) => {
  try {
    await db.DoctorInfo.create(doctor_clinic_info)
    return {
      status: 'Success',
      errCode: 0,
      message: 'OK',
    }
  } catch (error) {
    console.log(error)
  }
}

const handleUpdateDoctorClinicInfo = async (doctorClinicInfo) => {
  try {
    const clinicInfo = await db.DoctorInfo.findOne({
      where: { doctorId: doctorClinicInfo.doctorId },
    })

    console.log('service', clinicInfo)

    if (clinicInfo) {
      await clinicInfo.set({
        doctorId: doctorClinicInfo.doctorId,
        priceId: doctorClinicInfo.priceId,
        cityId: doctorClinicInfo.cityId,
        paymentId: doctorClinicInfo.paymentId,
        addressClinic: doctorClinicInfo.addressClinic,
        nameClinic: doctorClinicInfo.nameClinic,
      })

      await clinicInfo.save()

      return {
        status: 'Success',
        errCode: 0,
        message: 'Clinic Information Updated Successfully!',
      }
    } else {
      return {
        status: 'Fail',
        errCode: 1,
        message: 'Clinic Information not found!',
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
  updateInfoDoctorById: updateInfoDoctorById,
  handleBulkCreateSchedule: handleBulkCreateSchedule,
  handleGetScheduleByDoctorId: handleGetScheduleByDoctorId,
  handleGetDoctorClinicInfoById: handleGetDoctorClinicInfoById,
  handleCreateDoctorClinicInfo: handleCreateDoctorClinicInfo,
  handleUpdateDoctorClinicInfo: handleUpdateDoctorClinicInfo,
}
