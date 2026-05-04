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
    pdfs: {
      type: [
        {
          url: { type: String, required: true },
          originalName: { type: String, default: 'document.pdf' },
        },
      ],
      default: [],
    },
    youtubeLink: {
      url: { type: String, default: '' },
      title: { type: String, default: '' },
    },
    prototypeEmbed: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
