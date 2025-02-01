const { Schema, model } = require("mongoose");
const { ROLE } = require("../config/roles");

// Update the ROLE object in ../config/roles.js to include:
// ROLE = {
//   SCHOOL: "School",
//   PARENT: "Parent",
//   STUDENT: "Student",
//   ADMIN: "Admin",
//   SUPERADMIN: "Superadmin"
// }

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: [ROLE.SCHOOL, ROLE.PARENT, ROLE.STUDENT, ROLE.ADMIN, ROLE.SUPERADMIN],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    linkedStudentId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: function() { return this.role === ROLE.PARENT || this.role === ROLE.STUDENT; }
    },
    schoolId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: function() { return this.role === ROLE.STUDENT; }
    }
  },
  { timestamps: true }
);

module.exports = model("users", UserSchema);
