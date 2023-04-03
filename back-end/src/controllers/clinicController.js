import { json } from 'body-parser'
import express from 'express'
import db from '../models/index'
import clinicService from '../services/clinicService'

const createClinic = async (req, res) => {
  try {
    let clinicData = req.body
    if (
      !clinicData.name ||
      !clinicData.address ||
      !clinicData.descriptionHTML ||
      !clinicData.descriptionMarkdown
    ) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }

    let response = await clinicService.handleCreateClinic(clinicData)
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
  createClinic,
}
