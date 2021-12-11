'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartamentosSchema extends Schema {
  up () {
    this.create('departamentos', (table) => {
      table.increments('id')
      table.string('nombre').notNullable()
      table.string('descripcion').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('departamentos')
  }
}

module.exports = DepartamentosSchema
