
export * from './auth'
export * from './tasks'
export * from './task'

export const responseFailure = (type, message = 'Что-то пошло не так :(') => ({
  type, error: message
})
