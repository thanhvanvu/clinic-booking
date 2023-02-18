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

module.exports = {
  handleGetTopDoctor: handleGetTopDoctor,
}
