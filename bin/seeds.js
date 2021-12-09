// bin/seeds.js
/*
const mongoose = require("mongoose");
const Journey = require("../models/journey.model");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/library-project";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const Journeys = [
    {
         belongsTo: [{ type: Schema.Types.ObjectId, ref: "User" }],
         name: { type: String },
        feeling: "Happiness",
        },
        episodes: [{ type: Schema.Types.ObjectId, ref: "Episodes" }],
      }
]

Journey.create(Journeys)
  .then((booksFromDB) => {
    console.log(`Created ${booksFromDB.length} books`);

    // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating books from the DB: ${err}`)
  );
*/
