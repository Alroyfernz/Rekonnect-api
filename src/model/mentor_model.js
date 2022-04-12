const { model, Schema } = require("mongoose");

const mentorSchema = new Schema(
  {
    user_id: {
      type: String,
      ref: "user_details",
    },
    user_profile: { type: String },
    expertise: [
      {
        type: String,
      },
    ],
    address_details: {
      street: {
        type: String,
      },
      zip_code: {
        type: String,
      },
      state: {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
      },
      city: {
        id: {
          type: String,
        },
        name: {
          type: String,
        },
      },
      landmark: {
        type: String,
      },
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = model("mentor_details", mentorSchema);