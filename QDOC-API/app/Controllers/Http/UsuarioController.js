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

    async editarUsuario({ request, response }) {
        try {

            const update_usuario = request.all()
            const usuario = await User.findBy('id', update_usuario.id)

            usuario.username = update_usuario.username,
                usuario.nombre = update_usuario.nombre,
                usuario.email = update_usuario.email,
                usuario.password = update_usuario.password,
                usuario.apellidos = update_usuario.apellidos,
                usuario.departamento = update_usuario.departamento


            await usuario.save()
            return response.status(201).send({ message: "El usuario ha sido actualizado", usuario })

        } catch (error) {

            return response.status(500).send({ message: "No se ha editado de manera correcta", error })
        }
    }

    async eliminarUsuario({ request, response, params }) {
        try {
            const id = params.id
            const usuario = await User.findOrFail(id)

            usuario.delete()
            return response.status(200).send({ message: "El usuario ha sido eliminado", usuario })


        } catch (error) {
            console.log(error)
            return response.status(500).send({ message: "No se ha eliminado de manera correcta", error })

        }
    }

    async allUser({ response }) {
        try {
            const data = await Database.select("users.*", "departamentos.nombre as depa").from("users")
                .innerJoin("departamentos", "users.departamento", "departamentos.id")
            return response.status(200).json(data)

        } catch (error) {

            return response.status(500).send({ message: "No se mostrará de manera correcta", error: error })
        }
    }

    async deleteAuth({ response, auth, request }) {
        try {
            const data = await request.all();
            // get user information
            const user = await auth.getUser();
            // find a token with the user id

            const token = await Token.findBy('user_id', user.id);
            await token.delete();

            return response.status(200).json({ message: "Sesión finalizada correctamente" });

        } catch (error) {

            return response.status(500).json({ message: "No se realizo la petición exitosamente" });
        }
    }
}

module.exports = UsuarioController