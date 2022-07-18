import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from 'App/Models/Team'
import TeamUser from 'App/Models/TeamUser'
import User from 'App/Models/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const user = await User.all()

    return {users: user}
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.only([
      'name',
      'email',
      'password',
      'username',
      'elo',
      'bio'
    ])

    const teamData = await request.only([
      'team_name',
      'role'
    ])

    const teamExists = await Team.findBy('name', teamData.team_name)

    if(!teamExists){
      return {Error: 'team do not exists'}
    }

    const user = await User.create(data)

    const userTeam = await TeamUser.create({
      user_id: user.id,
      team_id: teamExists.id,
      role: teamData.role
    })

    if(user){
      return {created: true, User: user, Team: userTeam}
    }else{
      return {created: false}
    }
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    if(user){
      return {user: user};
    }else{
      return {error: 'User do not found!'}
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const data = await request.only([
      'name',
      'email',
      'password',
      'username',
      'elo',
      'bio'
    ])

    const user = await User.findOrFail(params.id)

    user.merge(data)

    const userResult = await user.save();

    if(userResult){
      return {Updated: true, User: user}
    }else{
      return {Updated: false}
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    if(user){
      user.delete()
      return {Deleted: true}
    }else{
      return {Deleted: false, Error: 'User do not found'}
    }
  }
}
