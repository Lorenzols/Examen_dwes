const bcrypt = require('bcrypt')

const helpers = {}

helpers.encryptPassword = async(passsword) =>{ 
    const salt = await bcrypt.genSalt(10) 
    const hash = await bcrypt.hash(passsword, salt) 
    return hash 
}

helpers.macthPassword = async(passsword, savePassword) =>{ 
    try{ 
        return await bcrypt.compare(passsword, savePassword) 
    }catch(error){ 
        console.log(error);
    }
}

module.exports = helpers
