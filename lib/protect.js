module.exports = {
    logged(req, res, next) { 
         if(req.isAuthenticated()){ 
             next() 
        }else{ 
            res.redirect('/signin') 
        } 
    },
    Notlogged(req, res, next) { 
        if(!req.isAuthenticated()){ 
            next() 
       }else{ 
           res.redirect('/coches') 
       } 
   }
}