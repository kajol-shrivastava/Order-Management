const mongoose = require("mongoose")


const isValid = function (value) {
  if (typeof value == "undefined" || value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;
  return true;
};


const isValidRequest = function (data) {
  if (Object.keys(data).length == 0) return false;
  return true;
};


const validName = function (name) {
  return /^[a-zA-Z]{2,30}$/.test(name)
}


const isValidMail = function (v) {
  return /^([0-9a-z]([-_\\.]*[0-9a-z]+)*)@([a-z]([-_\\.]*[a-z]+)*)[\\.]([a-z]{2,9})+$/.test(v);
};


const isValidMobile = function (num) {
  return /^[6789]\d{9}$/.test(num);
};





const isValidObjectId = function (objectId) {
  return mongoose.Types.ObjectId.isValid(objectId)
}


const isValidPassword = function (password) {
  if (password.length >= 8 && password.length <= 15) {
    return true
  }
  return false
}





const isValidCustormertype=function (status){
  return(["regular", "platinum", "gold"].indexOf(status)!=-1)
}




module.exports = {isValid, 
    validName, isValidMail, 
    isValidRequest,isValidMobile,
     isValidPassword, isValidObjectId,
      removeExtraSpace,isValidCustormertype,
}