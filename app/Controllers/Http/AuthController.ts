import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async login({auth, request, response}: HttpContextContract) {

  const username = request.input('username')
  const password = request.input('password')

  const user = await User
    .query()
    .where('username', username)
    .firstOrFail()

  if(password !== user.password){
    return response.unauthorized('Invalid credentials')
  }

  const token = await auth.use('api').generate(user)

  return token
  }

}
