const { Schema, model } = require('mongoose');
const shortid = require('shortid');
const AccessLog = require('./accessLog'); 

const UrlSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  longUrl: {
    type: String,
    required: true,
  },
  customAlias: {
    type: String,
    unique: true, // Evita duplicados en alias personalizados
    sparse: true, // Permite null o undefined
  },
  shortUrl: {
    type: String,
    default: function () {
      return `${process.env.BASE_URL}/${this.customAlias || this._id}`;
    },
  },
  clicks: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

UrlSchema.statics.getStatistics = async function(urlId) {
    try {
      // clicks por fecha
      const dailyClicks = await AccessLog.aggregate([
        {
          $match: {
            urlId: urlId, //filtro el id del url
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalClicks: { $sum: 1 },
          },
        },
        {
          $sort: { "_id": 1 },
        },
      ]);
  
      //clicks por país
      const clicksByCountry = await AccessLog.aggregate([
        {
          $match: {
            urlId: urlId,
          },
        },
        {
          $group: {
            _id: "$country",
            totalClicks: { $sum: 1 },
          },
        },
        {
          $sort: { totalClicks: -1 },
        },
      ]);
  
      //clicks por ciudad
      const clicksByCity = await AccessLog.aggregate([
        {
          $match: {
            urlId: urlId,
          },
        },
        {
          $group: {
            _id: "$city",
            totalClicks: { $sum: 1 },
          },
        },
        {
          $sort: { totalClicks: -1 },
        },
      ]);
  
      return {
        dailyClicks,
        clicksByCountry,
        clicksByCity,
      };
    } catch (error) {
      console.error('Error in aggregation:', error);
      throw error;
    }
  };
  

module.exports = model('Url', UrlSchema);
