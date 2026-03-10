const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    rationale: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      enum: ['DV', 'UX'],
      required: [true, 'Tag (DV or UX) is required'],
    },
    link: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    year: {
      type: String,
      default: () => new Date().getFullYear().toString(),
    },
    images: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
