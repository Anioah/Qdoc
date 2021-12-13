'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Departamento extends Model {

    static get table() { return 'departamentos' }
}

module.exports = Departamento
