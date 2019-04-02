module.exports = function pathResolver(path){
    if (!path) 
        path = "";
    path = decodeURIComponent(path);
    path = path.startsWith('/') ? path : ('/' + path);
    return path
}