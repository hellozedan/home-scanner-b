import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import autoIncrement from 'mongoose-auto-increment';
import APIError from '../helpers/APIError';


const HomeSchema = new mongoose.Schema({
  homeId: {
    type: String,
    unique: false,
    required: false
  },
  homeNumber: {
    type: Number,
    unique: false,
    required: false
  },
  homeAddress: {
    type: String,
    unique: false,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  loc: {
    type: [Number],  // [<longitude>, <latitude>]
    index: '2d',     // create the geospatial index
    unique: false,
    required: false
  }

});
autoIncrement.initialize(mongoose.connection);

HomeSchema.plugin(autoIncrement.plugin, { model: 'Home', startAt: 1, field: 'homeId' });

HomeSchema.method({
});


HomeSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((home) => {
        if (home) {
          return home;
        }
        const err = new APIError('No such home exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  list({ skip = 0, limit = 50, level = 1, homeNumber } = {}) {
    const query = homeNumber ? { homeNumber: homeNumber } : {};
    query.level = level;
    return this.find(query)
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};


export default mongoose.model('Home', HomeSchema);
