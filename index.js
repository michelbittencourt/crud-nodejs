const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer({
  name: 'crud-nodejs',
  version: '1.0.0'
});

var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'rd'
    }
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(3000, function () {
  console.log('%s listening at %s', server.name, server.url);
});

// rotas REST

server.get('/', (req, res, next) => {
    
    knex('usuario').then((dados) => {
        res.send(dados);
    }, next)
    
});

server.post('/cadastrarUsuario', (req, res, next) => {
    
    knex('usuario')
        .insert(req.body)
        .then((dados) => {
            res.send(dados);
        }, next)
    
});

server.get('/buscaPorId/:id', (req, res, next) => {
    
    const { id } = req.params;

    knex('usuario')
        .where('id', id)
        .first()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('Não foram encontrados dados referentes'))
            res.send(dados);
        }, next)
        
});

server.put('/atualizarUsuario/:id', (req, res, next) => {
    
    const { id } = req.params;

    knex('usuario')
        .where('id', id)
        .update(req.body)
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('Não foram encontrados dados referentes'))
            res.send('Dados atualizados com sucesso');
        }, next)
        
});

server.del('/deletarUsuario/:id', (req, res, next) => {
    
    const { id } = req.params;

    knex('usuario')
        .where('id', id)
        .delete()
        .then((dados) => {
            if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
            res.send('dados excluidos');
        }, next)
        
});