
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id : {
      type :Number , require : true
  }  ,
  firstNmae :  {type : String , require : true},
  lastName: {type : String , require : true},
  email:   {type : String , require : true},
});

UserSchema.index({'$**' : 'text'})

let User = mongoose.model('User', UserSchema);
module.exports = User;
