import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Za-z0-9]{6,8}$/, // required by assignment
      trim: true,
    },

    targetUrl: {
      type: String,
      required: true,
      trim: true,
    },

    totalClicks: {
      type: Number,
      default: 0,
    },

    lastClicked: {
      type: Date,
      default: null,
    },

    // deleted: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    // versionKey: false, // remove __v
    timestamps: true,
  }
);

export default mongoose.model('Link', LinkSchema);
