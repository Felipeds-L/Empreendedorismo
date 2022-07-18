import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TeamUsers extends BaseSchema {
  protected tableName = 'team_users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
      table
        .integer('team_id')
        .unsigned()
        .references('teams.id')
        .onDelete('CASCADE')
      table.string('role')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
