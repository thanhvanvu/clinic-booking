import { json } from 'body-parser'
import express from 'express'
import db from '../models/index'
import specialistService from '../services/specialistService'

const createSpecialist = async (req, res) => {
  try {
    let specialistData = req.body

    if (
      !specialistData.tittle ||
      !specialistData.image ||
      !specialistData.descriptionHTML ||
      !specialistData.descriptionMarkdown
    ) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }

    let response = await specialistService.handleCreateSpecialist(
      specialistData
    )
    return res.status(200).json({
      errCode: response.errCode,
      status: response.status,
      message: response.message,
    })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      errCode: -1,
      status: 'Fail',
      message: 'Error from server',
    })
  }
}
module.exports = {
  createSpecialist,
}
