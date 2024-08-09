import request from './index'

export async function login(body) {
  return await request.post('/user/login', body)
}

export async function register(body) {
  return await request.post('/user/register', body)
}

export async function info() {
  return await request.get('/user/info')
}

export async function update(body) {
  return await request.post('/user/update', body)
}

export async function upload(file) {
  const formData = new FormData()
  formData.append('file', file)
  return request.post('/user/upload', formData)
}

export async function getUserList(body) {
  return await request.post('/user/list', body)
}

// 冻结用户
export async function freeze(body) {
  return await request.post('/user/freeze', body)
}

// 修改密码
export async function updatePassword(body) {
  return await request.post('/user/update_passoword', body)
}

// 获取注册验证码
export async function getRegisterCaptcha(email) {
  return await request.get('/user/send_register_captcha', { email })
}

// 获取私密验证码
export async function getPrivateCaptcha() {
  return await request.get('/user/send_private_captcha')
}

// 刷新token
export async function refreshToken() {
  const refreshToken = window.localStorage.getItem('refresh_token') || ''
  return await request.post('/user/refresh', { refreshToken })
}

// 获取会议室列表
export async function getMeetList(body) {
  return await request.post('/meeting-room/list', body)
}

// 创建会议室
export async function createMeetRoom(body) {
  return await request.post('meeting-room/create', body)
}

// 根据id查询会议室信息
export async function getInfoById(id) {
  return await request.get(`/meeting-room/${id}`)
}

// 删除会议室
export async function deleteMeet(id) {
  return await request.post(`/meeting-room/delete`, { id })
}

// 修改会议室
export async function updateMeet(body) {
  return await request.post('meeting-room/update', body)
}