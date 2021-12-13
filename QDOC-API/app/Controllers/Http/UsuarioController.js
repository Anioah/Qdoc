'use strict'
const User = use('App/Models/User');
const Database = use('Database');
class UsuarioController {

    async registrarUsuario({ request, response }) {
        try {
            const user = new User()

            const { username, email, departamento, nombre, apellidos, password } = request.all()

            user.username = username
            user.email = email
            user.password = password
            user.nombre = nombre
            user.apellidos = apellidos
            user.departamento = departamento

            await user.save()

            return response.status(200).send({ user: user })




        } catch (error) {
            return response.status(401).send({ message: "No se ha registrado de manera correcta", error: error })


        }
    }

    //Iniciamos Sesión
    async login({ request, response, auth }) {
        try {

            const { email, password } = request.all()
            await auth.attempt(email, password)

            return await auth.withRefreshToken().attempt(email, password)
        } catch (error) {
            console.log(error)
            return response.status(401).send({ message: "Error al loguearse" })

        }
    }

    /* Informacion del usuario */
    async getUserInfo({ auth, response }) {
        const user = await auth.getUser()
        const datauser = await Database.select('users.*')
            .from('users')
            .where('users.id', user.id)
        return response.status(200).json(datauser)
    }
}

module.exports = UsuarioController
