const express = require('express')
const app = express()

const pathConfig = require('../constans').pathConfig
const isVideo = require('is-video');
const thumbnailGenerator  = require('video-thumbnail-generator').default;
const fs = require('fs');
const path = require('path');
const thumbDir = './thumbnails';

function optionsMethodHandling(res){
    const headers = {}
    headers["Access-Control-Allow-Origin"] = "*"
    headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS"
    headers["Access-Control-Allow-Credentials"] = false
    headers["Access-Control-Max-Age"] = '86400' // 24 hours
    headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    res.writeHead(200, headers)
    res.end();
}

function setHeaders(res){
    res.reply = res.send
    res.setHeader('content-type', 'application/json')
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
    res.setHeader("Pragma", "no-cache")
    res.setHeader("Expires", 0)
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    res.setHeader("Access-Control-Allow-Credentials", false)
    res.setHeader("Access-Control-Max-Age", "86400")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept")
}

app.get('/thumbservice', function(req, res) {
    setHeaders(res);
    const id = req.query.id.startsWith('/') ? req.query.id.substring(1) : req.query.id;
    console.log('THUMB: ', id);
    const assetPath = path.resolve(pathConfig.source, id || '.');
    if (!isVideo(assetPath)){
        return res.end();
    }
    
    const size = `${req.query.width || '320'}x${req.query.height || '240'}`;
    const frame = req.query.frame || "1";
    const thumbFile = `${path.basename(id)}.${frame}.${size}.png`;
    const thumbFilePath = path.resolve(thumbDir, thumbFile);
    const tg = new thumbnailGenerator({
        sourcePath: assetPath,
        thumbnailPath: thumbDir
    });
    tg.generate({
        filename: thumbFile,
        timestamps: [frame],
        size: size
    }).then(d=>{
        res.sendFile(thumbFilePath);
        return new Promise(r=>setTimeout(()=>r(fs.unlinkSync(thumbFilePath)), 100));
    }).catch(err=>{
        console.error(`Error during thumb creation: ${err}`);
        return res.send(err);
    });
});

app.use(function (req, res){
    if (req.method === 'OPTIONS') {
        optionsMethodHandling(res)
        return
    }
    res.status=404;
    res.end();
})

module.exports = function(){
    return new Promise(res=>{
        const server = app.listen(36507, "0.0.0.0", function(){
            const connection = {
                host: '127.0.0.1',
                port: server.address().port
            }
            fs.writeFileSync('./helper.config.json', JSON.stringify(connection), null, '  ');
            console.log('Thumb service is listening on: ' + connection.host + ":" + connection.port);
            res(connection);
        })
    })
}
