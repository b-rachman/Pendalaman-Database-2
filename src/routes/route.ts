import {Router} from 'express'
import {FirebaseClient} from '../database/firebase'
const firebaseClient = new FirebaseClient()

const router = Router()

router.post('/antrian',async (req,res,next)=>{
    const antri =req.body
    try {
        await firebaseClient.addData(antri)
    } catch (error) {
        throw error
    }
    res.json({
        Urutan : antri.antrian,
        Nama : antri.nama,
        Keperluan : antri.keperluan,
        Status : "Berhasil Ditambahkan"
    })
})

router.get('/antrian',async (req,res,next)=>{
    let antrian
    try{
        antrian=await firebaseClient.getData()
    } catch(error){
        return next(error)
    }
    res.json(antrian)
})

router.get('/antrian/:antrian',async (req,res,next)=>{
    const antrian=Number(req.params.antrian)
    let antrians
    try{
        antrians =await firebaseClient.getDataByAntrian(antrian)
    } catch(error){
        return next(error)
    }
    res.json(antrians)
})

router.put('/antrian/:id', async (req, res, next) => {
    const id=req.params.id
    const update=req.body
    let antrian
    try {
        antrian = await firebaseClient.updateData(id,update)
    } catch (error) {
        return next(error)
    }
    res.json(antrian)
});

router.delete('/antrian', async (req, res, next) => {
    let cussers
    try {
       cussers = await firebaseClient.deleteData()
    } catch (error) {
       return next(error)
    }
    res.json({ message: 'Data telah dihapus'})
})

router.delete('/antrian/:id', async (req, res, next) => {
    const id=req.params.id
    let antrian
    try {
        await firebaseClient.deleteDataById(id)
    } catch (error) {
        return next(error)
    }
    res.json({
        message:"Data Deleted"
    })
});

export default router