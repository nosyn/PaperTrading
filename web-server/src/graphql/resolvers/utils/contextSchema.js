const yup = require("yup");

const userSchema = yup
  .object()
  .shape({
    _id: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required()
  .default(null)
  .nullable();

module.exports = yup
  .object()
  .shape({ currentUser: userSchema })
  .required("Context is required")
  .default(null)
  .nullable();
