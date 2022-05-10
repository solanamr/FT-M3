// const bodyParser = require("body-parser");
const express = require("express");
const { post } = require("request");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
// server.use(express.json());
server.use(express.json());

// TODO: your code to handle requests

 const PATH = '/posts'
 let id = 0;

server.post(PATH, (req, res) => {
    const {author,title,contents} = req.body
    if(!author || !title || !contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parametros necesarios para crear el Post"})
    }
    const post = {
        author,
        title,
        contents,
        id: id++
    }
    posts.push(post)
    res.status(200).json(post)
    console.log(author, title, contents)
})

server.post(`${PATH}/author/:author`, (req, res) => {
    const { title, contents } = req.body
    const { author } = req.params
    if(!title || !contents){
        res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parametros necesarios para crear el Post"})
    }
    const post = {
        author,
        title,
        contents,
        id: id++
    }
    posts.push(post)
    res.status(200).json(post)
    console.log(author, title, contents)
})

server.get(PATH, (req, res) => {
    const { term } = req.query
    
    if(term){
        const posteos = posts.filter((p) =>
            p.title.includes(term) || p.contents.includes(term)
        )
             res.json(posteos)
    }else{
       return res.json(posts)
    }
})

server.get(`${PATH}/:author`,(req, res)=>{
    const { author } = req.params;
   const filtrado = posts.filter(p => p.author === author)
   if( filtrado.length === 0){
       return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
   }
   res.json(filtrado);
})


server.get(`${PATH}/:author/:title`,(req, res)=>{
    const { author, title } = req.params;
    const filtrado = posts.filter(p => p.author === author && p.title === title)
    if(filtrado.length === 0){
        return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
    }
    res.json(filtrado)
})

server.put(PATH, (req, res)=>{
    const {id, title, contents} = req.body
    if(!id || !title || !contents){
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }
    const posteos = posts.find(p =>p.id === id)
    if(posteos){
        posteos.title = title
        posteos.contents = contents
        res.json(posteos)
    }else{
        return res.status(STATUS_USER_ERROR).json({error: "No corresponde con un post válido"})
    }
})

server.delete(PATH, (req, res) => {
    let { id } = req.body;
    const findeo = posts.find((p) => p.id === parseInt(id));
    if (!id || !findeo) {
      return res
        .status(STATUS_USER_ERROR)
        .json({ error: "No corresponde con un id valido" });
    }
    posts = posts.filter((f) => f.id !== parseInt(id));
    res.json({ success: true });
  });

  server.delete('/author', (req, res) => {
    let { author } = req.body;
    const findeo = posts.find((p) => p.author === author);
    if (!findeo || !author) {
      return res.status(STATUS_USER_ERROR).json({ error: "No existe el autor indicado" });
    }
    let authordelete = [];
    posts = posts.filter((p) => {
      if (p.author !== author) {
        return true;
      } else {
        authordelete.push(p);
      }
    });
    return res.json(authordelete);
  });


module.exports = { posts, server };