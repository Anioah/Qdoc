'use strict'

const Documento = use('App/Models/Documento');
const TipoDocumento = use('App/Models/TipoDocumento');

class DocumentoController {

    async getDocument({ response }) {
        try {
            const documentos = await Documento.all();

            return response.status(200).json(documentos);
        } catch (error) {
            return response.status(500).json({ message: "No se pudo realizar la petición correctamente" });
        }
    }

    async getEspecificDocument({ request, response }) {
        try {
            const data = await request.all();
            const documento = await Documento.findBy("id", data.id);

            return response.status(200).json(documento);
        } catch (error) {
            return response.status(500).json({ message: "No se pudo realizar la petición correctamente" });
        }
    }

    async getTypeOfDocument({ response }) {
        try {
            const typeDocuments = await TipoDocumento.all();

            return response.status(200).json(typeDocuments);
        } catch (error) {
            return response.status(500).json({ message: "No se pudo realizar la petición correctamente" });
        }
    }

    async newDocument({ request, response }) {
        try {
            const data = await request.all();
            const document = await new Documento();

            document.nombre = data.nombre;
            document.codigo = data.codigo;
            document.titulo = data.titulo;
            document.firma = data.firma;
            document.numero_revision = data.numero_revision;
            document.total_pagina = data.total_pagina;
            document.no_version = data.no_version;
            document.fecha_revision = data.fecha_revision;
            document.fecha_edicion = data.fecha_edicion;
            document.vigencia = data.vigencia;
            document.usuario = data.usuario;
            document.area_perteneciente = data.area_perteneciente;
            document.tipo_documento = data.tipo_documento

            if (await document.save()) {
                return response.status(200).json({ message: "Operación realizada correctamente" });
            }

        } catch (error) {
            return response.status(500).json({ message: "No se pudo realizar la petición correctamente" });
        }
    }

    async newTypeDocument({ request, response }) {
        try {
            const data = await request.all();
            const typeDoc = await new TipoDocumento();

            typeDoc.descripcion = data.descripcion;
            typeDoc.inicial = data.inicial;
            typeDoc.numero_version = data.numero_version;
            typeDoc.area_perteneciente = data.area_perteneciente;
            typeDoc.vigencia = data.vigencia;
            typeDoc.fecha_edicion = data.fecha_edicion

            if (await typeDoc.save()) {
                return response.status(200).json({ message: "Operación realizada correctamente" });
            }

        } catch (error) {
            return response.status(500).json({ message: "No se pudo realizar la petición correctamente" });
        }
    }
}

module.exports = DocumentoController