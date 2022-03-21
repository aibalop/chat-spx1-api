const bcrypt = require('bcrypt');

const salts = 10;

exports.generate = (value) => bcrypt.hashSync(value, salts);

exports.compare = (value, valueEncrypted) => bcrypt.compareSync(value, valueEncrypted);