const express=require('express');
const router = express.Router();
const autorController=require("../controllers/AutorController")

router.get('/autores',autorController.getAllAutores);
router.get('/autores/:id',autorController.getAutoresById);
router.post('/autores/create',autorController.createAutor);
router.delete("/autores/:id", autorController.deleteAutor);
module.exports=router;