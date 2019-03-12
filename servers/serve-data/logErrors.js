const fs = require('fs');

module.exports = {
    saveError: function(line, name) {
        fs.appendFile('./logs', `TIME: ${Date()} | LINE: ${line} | ERROR: ${name}\r\n`, (err) => {
            if(err)
                return console.log(err);
        });
    }
};
