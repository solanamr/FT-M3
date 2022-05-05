var fs  = require("fs")
var http  = require("http");
const { dirname } = require("path");

// Escribí acá tu servidor
http.createServer(function(req,res){
    if(req.url === 'arcoiris_doge'){
        fs.readFile(`${__dirname}/images/arcoiris_doge.jpg`,function(err, data){
            if(err) {
                res.writeHead(404, {'Content-Type':'text/plain'})
                res.end('HUBO UN ERROR')}
            else {
                res.writeHead(200, {'Content-Type':'image/jpeg'})
                res.end(data)}
        })
    }else if(req.url === 'badboy_doge'){
        fs.readFile(`${__dirname}/images/badboy_doge.jpg`,function(err, data){
            if(err) {
                res.writeHead(404, {'Content-Type':'text/plain'})
                res.end('HUBO UN ERROR')}
            else {
                res.writeHead(200, {'Content-Type':'image/jpeg'})
                res.end(data)}
        })
    }else if(req.url === 'code_doge'){
        fs.readFile(`${__dirname}/images/code_doge.jpg`,function(err, data){
            if(err) {
                res.writeHead(404, {'Content-Type':'text/plain'})
                res.end('HUBO UN ERROR')}
            else {
                res.writeHead(200, {'Content-Type':'image/jpeg'})
                res.end(data)}
        })
    }else if(req.url === 'resaca_doge'){
        fs.readFile(`${__dirname}/images/resaca_doge.jpg`,function(err, data){
            if(err) {
                res.writeHead(404, {'Content-Type':'text/plain'})
                res.end('HUBO UN ERROR')}
            else {
                res.writeHead(200, {'Content-Type':'image/jpeg'})
                res.end(data)}
        })
    }else if(req.url === 'retrato_doge'){
        fs.readFile(`${__dirname}/images/retrato_doge.jpg`,function(err, data){
            if(err) {
                res.writeHead(404, {'Content-Type':'text/plain'})
                res.end('HUBO UN ERROR')}
            else {
                res.writeHead(200, {'Content-Type':'image/jpeg'})
                res.end(data)}
        })
    }else if(req.url === 'sexy_doge'){
        fs.readFile(`${__dirname}/images/sexy_doge.jpg`,function(err, data){
            if(err) {
                res.writeHead(404, {'Content-Type':'text/plain'})
                res.end('HUBO UN ERROR')}
            else {
                res.writeHead(200, {'Content-Type':'image/jpeg'})
                res.end(data)}
        })
    }}).listen(3000, '127.0.0.1');

