'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Documento extends Model {
    static get table() { return 'documentos' }
}

module.exports = Documento
