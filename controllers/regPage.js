const regPage =(req,res)=>{
    try {
        res.status(200).send("this is reg page from router");
        
    } catch (error) {
        res.status(400).send({message:"error occures during running of the server"})
        console.log(error)
    }
}
export default regPage