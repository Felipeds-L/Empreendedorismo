import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Teams extends BaseSchema {
  protected tableName = 'teams'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table
        .integer('owner')
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
