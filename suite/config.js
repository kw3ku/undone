require('../.env');
//instatiate envir variables

let CONFIG = {}
//making global 

CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '3008';

CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '3008';
CONFIG.db_name= process.env.DB_NAME || 'nodeAuth';
CONFIG.db_password = process.env.DB_PASSWORD || 'nodeuser';
CONFIG.db_user = process.env.DB_USER || 'nodeUser';


CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'jwt_please_change';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';


module.exports = CONFIG;

