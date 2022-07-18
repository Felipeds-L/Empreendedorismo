import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Team from 'App/Models/Team'
import User from 'App/Models/User'

export default class TeamsController {
  public async index({}: HttpContextContract) {
    const teams = await Team.all()

    if(teams){
      return {Teams: teams}
    }else{
      return {Error: 'Any team has been found'}
    }
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.only([
      'name'
    ])
    const user = await User.findOrFail(auth.user?.id)

    const team = await Team.create({
      name: data.name,
      owner: user.id
    })

    if(team){
      return {Created: true, Team: team}
    }else{
      return {Error: 'Team creation error'}
    }

  }

  public async show({ request }: HttpContextContract) {
    const team = await Team.findByOrFail('name', request.only(['name']))

    if(team){
      return {Team: team}
    }else{
      return {Error: 'Team do not found!'}
    }
  }

  public async update({ auth, request, params }: HttpContextContract) {
    const user = await User.findOrFail(auth.user?.id)
    const team = await Team.findOrFail(params.id)

    if(team.owner === user.id){
      const data = request.only([
        'name'
      ])

      team.merge(data)

      const teamResult = await team.save()

      if(teamResult){
        return {Updated: true, team: teamResult}
      }else{
        return {Error: 'Error on update team informations'}
      }
    }else{
      return {Error: 'You need be the owner to edit team informations'}
    }
  }

  public async destroy({ auth, params }: HttpContextContract) {
    const user = await User.findOrFail(auth.user?.id)
    const team = await Team.findOrFail(params.id)

    if(user.id === team.owner){
      team.delete()
      return {Deleted: true}
    }else{
      return {Error: 'Only the owner can delete de team'}
    }
  }
}
