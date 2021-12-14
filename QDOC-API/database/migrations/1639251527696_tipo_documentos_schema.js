'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TipoDocumentosSchema extends Schema {
    up() {
        this.create('tipo_documentos', (table) => {
            table.increments('id')
            table.string('descripcion').notNullable()
            table.boolean('inicial')
            table.boolean('numero_version')
            table.boolean('area_perteneciente')
            table.boolean('vigencia')
            table.boolean('fecha_edicion')
            table.timestamps()
        })
    }

    down() {
        this.drop('tipo_documentos')
    }
}

module.exports = TipoDocumentosSchema