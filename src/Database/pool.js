const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const db_config = {
    connectionTimeoutMilllis: 300 ,
    idleTimeoutMillis: 200 ,
    max: 20 ,
    connectionString:'postgres://postgres:postgres@localhost:5432/postgres?currentSchema=Pishing'
}

const pool = new Pool(db_config);


pool.on('connect' , client => {
    console.log('database is connected ......')
})

pool.on('remove' , client => {
    console.log('database is connection removed or closed ......')
})


module.exports= pool;