
const roleBasedAuthentication = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; 
      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        return res.status(403).json({ message: 'Access Denied' });
      }
    };
  };

  module.exports={
    roleBasedAuthentication
  }
  


//   function checkUserRole(allowedRoles) {
//     return function (req, res, next) {
//       const userRole = req.user.role; 
//       if (allowedRoles.includes(userRole)) {
//         next();
//       } else {
//         res.status(403).json({ message: 'Forbidden' }); 
//       }
//     };
//   }
  
//   module.exports = {checkUserRole};