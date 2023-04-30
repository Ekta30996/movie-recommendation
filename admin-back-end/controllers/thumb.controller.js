const movieModel = require('../models/movie.model')
const cloudinary = require('../lib/cloudinary')

exports.uploadThumb = async(req,res)=>{
    const movie = req.params.id

    cloudinary.uploader.upload(req.file.path,
    {
        resource_type:'image',
        folder:'thumb',
        transformation: [
            { width: 1350, height: 650},
            {quality:70}
        ]
    },
    async (err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send(err)
        }
        try
        {
            const newThumb ={
                thumbnail:req.file.originalname,
                thumburl:result.url,
                cloudinary_id:result.public_id,
            }
            const find = await movieModel.findByIdAndUpdate({'_id':movie},{$push:{thumb:newThumb}},{new:true})
            return res.status(200).send(find)
        }
        catch(err){
         res.status(500).send(err)
        }       
    })
}
