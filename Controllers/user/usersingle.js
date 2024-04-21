const user = require("../../Models/user");
const usersingle = async (req, res) => { 
    const userId = req.params.id;
    try {
      const userdetail = await user.findById(userId);
      if (!userdetail) {
        return res.status(404).send({ error: 'user detail not found' });
      }
  
      res.status(200).send({status:"successfully",data:userdetail});
    } catch (err) {
      res.status(500).send({ error: 'An error occurred while fetching userdetail ',servererror:err });
    }

  


}

module.exports = usersingle