const mongoose = require("mongoose");

const WebsiteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    hero: {
      name: { type: String, required: true },
      role: { type: String },
      desc: { type: String },
      links: [
        {
          title: String,
          link: String,
        },
      ],
    },
    about: {
      experiences: [
        {
          position: String,
          company: String,
          start: String,
          end: String,
          location: String,
          tasks: [String],
        },
      ],
      education: [
        {
          start: String,
          end: String,
          level: String,
        },
      ],
    },
    projects: [
      {
        title: String,
        desc: String,
        url: {
          repo: String,
          demo: String,
        },
      },
    ],
    techStacks: [String],
    themes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Website", WebsiteSchema);
