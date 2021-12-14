'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

// USUARIOS
Route.post('/registrarUsuario', 'UsuarioController.registrarUsuario')
Route.post('/login', 'UsuarioController.login')
Route.get('/getUserInfo', 'UsuarioController.getUserInfo').middleware(['auth'])

// DEPARTAMENTO
Route.post('/registrarDepa', 'DepartamentoController.registrarDepa')
Route.get('/allDepa', 'DepartamentoController.allDepa')
Route.patch('/editarDepa', 'DepartamentoController.editarDepa')
Route.delete('/eliminarDepa/:id', 'DepartamentoController.eliminarDepa')

// DOCUMENTOS
Route.get('/getDoc', 'DocumentoController.getDocument');
Route.get('/getTypeDoc', 'DocumentoController.getTypeOfDocument');
Route.post('/especificDoc', 'DocumentoController.getEspecificDocument');
Route.post('/newDoc', 'DocumentoController.newDocument');
Route.post('/newTD', 'DocumentoController.newTypeDocument');