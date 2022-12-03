const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", async (req, res, next) => {
  console.log('Hello world')
  res.status(200).json({ message: "Course has been completed" })
  // try {
  //   const UserId = req.loginUser.id
  //   const { id } = req.params
  //   const data = await MyCourse.findByPk(id)
  //   if (!data) {
  //     res.status(404).json({ message: "Course not found" })
  //   } else {

  //     if (data.dataValues.UserId === UserId) {
  //       const result = MyCourse.update({
  //         status: "Completed"
  //       }, {
  //         where: { id }
  //       })
  //       res.status(200).json({ message: "Course has been completed" })
  //     } else {
  //       res.status(403).json({ message: "You are not authorized" })
  //     }
  //   }
  // } catch (err) {
  //   res.status(500).json({ message: "Internal server error" })
  // }
})

app.listen(3000);