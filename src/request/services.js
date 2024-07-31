import request from './index'

export async function login(body) {
  return await request.post('/user/login', body)
}