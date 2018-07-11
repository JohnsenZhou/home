const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Promise = global.Promise;

const ProfileSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  resumeKeyWords: {
    type: [String],
    required: true
  },
  entranceDetails: {
    type: [{
      name: {
        type: String,
        require: true
      },
      url: {
        type: String,
        require: true
      }
    }],
    required: true
  },
  copyright: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
})

ProfileSchema.statics = {
  /**
   * 通过Id搜索Catalog
   * 
   * @param {any} id 
   * @returns 
   */
  getById(id) {
    return this.findOne({_id: id})
      .exec()
      .then(list => {
        if (list) {
          return list
        } else {
          const err = new Error("Can't found this catalog");
          return Promise.reject(err);
        }
      })
  },
  
  /**
   * 分页查询：query:{skip,limit}，limit:每页数量；skip：跳过多少条目
   * 
   * @param {any} query 
   * @returns 
   */
  findList(query) {
    return this.find()
      .sort()
      .skip(query.skip)
      .limit(query.limit)
      .exec();
  }
}

module.exports = mongoose.model('Catalog', ProfileSchema);
