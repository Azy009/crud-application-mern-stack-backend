const user = require("../../../Models/usertable");
const frontenduser = async (req, res) => { 
    const user_id = req.user.id;
    try {
      const userdetail = await user.findById(user_id).select('-password -status -isAdmin');
      if (!userdetail) {
        return res.status(404).send({ error: 'user detail not found' });
      }
  
      res.status(200).send({status:"successfully",data:userdetail});
    } catch (err) {
      res.status(500).send({ error: 'An error occurred while fetching userdetail ',servererror:err });
    }

}

module.exports = frontenduser