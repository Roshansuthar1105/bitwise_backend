const home = (req,res)=>{
    try {
        res.status(202).send("this is home page from controller");
    } catch (error) {
        res.status(404).send({message:error})
    }
}
export default home;