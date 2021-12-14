'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DocumentosSchema extends Schema {
    up() {
        this.create('documentos', (table) => {
            table.increments('id')
            table.string('nombre').notNullable()
            table.string('codigo').notNullable()
            table.string('titulo').notNullable()
            table.string('no_version').notNullable()
            table.string('firma').notNullable()
            table.integer('numero_revision').notNullable()
            table.integer('total_pagina').notNullable()
            table.date('fecha_revision').notNullable()
            table.date('fecha_edicion').notNullable()
            table.string('vigencia').notNullable()
            table.integer('usuario').unsigned().references('id').inTable('users')
            table.integer('area_perteneciente').unsigned().references('id').inTable('departamentos')
            table.integer('tipo_documento').unsigned().references('id').inTable('tipo_documentos')
            table.timestamps()
        })
    }

    down() {
        this.drop('documentos')
    }
}

module.exports = DocumentosSchema