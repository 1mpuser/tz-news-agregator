import {Schema, model} from 'mongoose';

const RoleSchema = new Schema({
    value : {type : String , unique : true, default : "USER"}
})

module.exports = model('Role', RoleSchema);
