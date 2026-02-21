import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Helpers to manage auth token (useful for attaching JWTs)
export function setAuthToken(token) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`
}

export function clearAuthToken() {
  delete api.defaults.headers.common.Authorization
}

function buildError(err) {
  // Normalize axios errors and preserve useful metadata
  if (axios.isAxiosError(err)) {
    const status = err.response?.status
    const data = err.response?.data
    const message =
      data?.message || data?.error || err.message || 'Request failed'
    const error = new Error(message)
    error.status = status
    error.data = data
    return error
  }

  return new Error(err?.message || String(err))
}

/**
 * POST /auth/login
 * Returns response data on success, throws Error on failure
 */
export async function login(email, password) {
  try {
    const res = await api.post('/auth/login', { email, password })
    return res.data
  } catch (err) {
    throw buildError(err)
  }
}

/**
 * POST /auth/register
 * `data` should be an object containing registration fields (e.g. email, password, name)
 */
export async function register(data) {
  try {
    const res = await api.post('/auth/register', data)
    return res.data
  } catch (err) {
    throw buildError(err)
  }
}

/**
 * POST /auth/forgot-password
 * Sends a password reset email to `email`.
 */
export async function forgotPassword(email) {
  const res = await api.post('/auth/forgot-password', { email })
  return res.data

}

/**
 * POST /auth/reset-password
 * `token` typically comes from the reset link; `password` is the new password.
 */
export async function resetPassword(token, password) {
  try {
    const res = await api.post('/auth/reset-password', { token, password })
    return res.data
  } catch (err) {
    throw buildError(err)
  }
}

// Default export with all functions for convenient imports
export default {
  login,
  register,
  forgotPassword,
  resetPassword,
  setAuthToken,
  clearAuthToken,
}
