const os = require('os');
function folderDirection(){
    switch(os.platform){
        case 'win32':
            return '/';
        default:
            return "\\";
    }
}
module.exports = {folderDirection};