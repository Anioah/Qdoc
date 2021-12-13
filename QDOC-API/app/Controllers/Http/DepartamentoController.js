'use strict'
const Departamento = use('App/Models/Departamento');
const Database = use('Database');
class DepartamentoController {

    async registrarDepa({ request, response }) {
        try {
            const depa = new Departamento()

            const { nombre, descripcion} = request.all()

            depa.nombre = nombre
            depa.descripcion = descripcion

            await depa.save()

            return response.status(200).send({ Departamento: depa })




        } catch (error) {
            return response.status(500).send({ message: "No se ha registrado de manera correcta", error: error })


        }
    }

    /* OBTENER DEPARTAMENTOS */
    async allDepa({response}){
        try {
            
        const data = await Departamento.all()
        return response.status(200).json(data)
            
        } catch (error) {

            return response.status(500).send({ message: "No se mostrará de manera correcta", error: error })
        }
    }

    /* EDITAR DEPARTAMENTO */

    async editarDepa({response, request}){
        try{

            const update_departamento = request.all()
            const departamento = await Departamento.findBy('id', update_departamento.id)
            

            departamento.nombre = update_departamento.nombre,
            departamento.descripcion = update_departamento.descripcion,
            
            
            await departamento.save()
                return response.status(201).send({ message: "El departamento ha sido actualizado", departamento })

        } catch (error) {
            
            return response.status(500).send({ message: "No se ha editado de manera correcta", error })
        }
    }

    async eliminarDepa({request, response, params}){
        try {
            const id = params.id
            const departamento = await Departamento.findOrFail(id)

            departamento.delete()
                return response.status(200).send({ message: "El producto ha sido eliminado", departamento })
        
            
        } catch (error) {
            console.log(error)
            return response.status(500).send({ message: "No se ha eliminado de manera correcta", error })
            
        }
    }
}

module.exports = DepartamentoController
