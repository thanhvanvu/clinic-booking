import { json } from 'body-parser'
import express from 'express'
import db from '../models/index'
import clinicService from '../services/clinicService'

const getAllClinic = async (req, res) => {
  try {
    let response = await clinicService.handleGetAllClinic()
    return res.status(200).json({
      errCode: response.errCode,
      status: response.status,
      message: response.message,
      data: response.data,
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

const getClinicById = async (req, res) => {
  try {
    let clinicId = req.query.id
    if (!clinicId) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }

    let response = await clinicService.handleGetClinicById(clinicId)

    return res.status(200).json({
      errCode: response.errCode,
      status: response.status,
      message: response.message,
      data: response.data,
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

const getDoctorByClinicId = async (req, res) => {
  try {
    let clinicId = req.query.id

    if (!clinicId) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }

    let response = await clinicService.handleGetDoctorByClinicId(clinicId)

    return res.status(200).json({
      errCode: response.errCode,
      status: response.status,
      message: response.message,
      data: response.data,
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

const createClinic = async (req, res) => {
  try {
    let clinicData = req.body

    if (
      !clinicData.name ||
      !clinicData.address ||
      !clinicData.city ||
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

const updateClinic = async (req, res) => {
  try {
    let clinicData = req.body
    if (
      !clinicData.id ||
      !clinicData.name ||
      !clinicData.address ||
      !clinicData.city ||
      !clinicData.descriptionMarkdown
    ) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }

    let response = await clinicService.handleUpdateClinic(clinicData)
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

const deleteClinic = async (req, res) => {
  try {
    let clinicId = req.query.id
    if (!clinicId) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }

    let response = await clinicService.handleDeleteClinic(clinicId)
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
  getAllClinic,
  updateClinic,
  deleteClinic,
  getDoctorByClinicId,
  getClinicById,
}
