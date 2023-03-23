import { json } from 'body-parser'
import express from 'express'
import db from '../models/index'
import specialistService from '../services/specialistService'

const createSpecialist = async (req, res) => {
  try {
    let specialistData = req.body
    if (
      !specialistData.tittle ||
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

const getAllSpecialist = async (req, res) => {
  try {
    let response = await specialistService.handleGetAllSpecialist()
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

const getSpecialistById = async (req, res) => {
  try {
    let specialistId = req.query.id
    if (!specialistId) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }
    let response = await specialistService.handleGetSpecialistById(specialistId)
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

const updateSpecialistById = async (req, res) => {
  try {
    let specialistData = req.body
    if (
      !specialistData.id ||
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

    let response = await specialistService.handleUpdateSpecialistById(
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

const deleteSpecialistById = async (req, res) => {
  try {
    let specialistId = req.query.id
    if (!specialistId) {
      return res.status(200).json({
        errCode: 1,
        status: 'Fail',
        message: 'Missing parameter',
      })
    }

    let response = await specialistService.handleDeleteSpecialistById(
      specialistId
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
  getAllSpecialist,
  getSpecialistById,
  updateSpecialistById,
  deleteSpecialistById,
}
