const Autor = require("../models/Autor");

exports.getAllAutores=async(req,res)=>{
    try{
        const autores=await Autor.getAll();
        res.json(autores);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}
exports.getAutoresById=async(req,res)=>{
    try{
        const autor=await Autor.getById(req.params.id);
        if(!autor) return res.status(400).json({message:"Autor no encontrado"});
        res.json(autor);
    }catch(error){
        res.status(500).json({error: error.message});
    }

}

exports.deleteAutor = async (req, res) => {
  try {
    const autor = await Autor.delete(req.params.id);
    res.json({ message: "Autor eliminado", autor });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};


exports.createAutor=async(req,res)=>{
    try{
        const autor=await Autor.create(req.body);
        res.status(201).json(autor);
    }catch(error){
        res.status(500).json({error: error.message});
    }

}