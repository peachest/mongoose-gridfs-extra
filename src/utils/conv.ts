import _ from "lodash"
import {mongo} from "mongoose";

export function conv2ObjectId(id: mongo.ObjectId | string | number): mongo.ObjectId{
    if (_.isString(id) || _.isNumber(id)){
        return new mongo.ObjectId(id)
    }else {
        return id
    }
}
