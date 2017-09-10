const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


//connect to database
const { dbURI } = require('../config/environment');
mongoose.connect(dbURI, { useMongoClient: true });

//Importing the store model
const Store = require('../models/store.js');

//drop everything in the database
Store.collection.drop();

Store
  .create([{
    locationName: 'Liverpool Street',
    address: 'Unit 25 The Concourse, City of London, EC2M 7PY',
    reviews: [{
      ambienceRating: 5,
      foodQualityRating: 6,
      customerServiceRating: 7,
      reviewText: 'A great store, but too busy and not many tables. Better for taking food away than sitting in. Wouldn\'t recommend'
    },
    {
      ambienceRating: 8,
      foodQualityRating: 8,
      customerServiceRating: 8,
      reviewText: 'Really great store. Loved everything about it. Would go again in a heartbeat!'
    }]
  },
  {
    locationName: 'Commercial Road, Whitechapel',
    address: '201/217 Commercial Road, Tower Hamlets, E1 2BT',
    reviews: [{
      ambienceRating: 2,
      foodQualityRating: 2,
      customerServiceRating: 2,
      reviewText: 'A pretty poor experience all round'
    },
    {
      ambienceRating: 3,
      foodQualityRating: 3,
      customerServiceRating: 3,
      reviewText: 'Not in my top 10. I have been to a lot of Maccys but this was the worst'
    }]
  }
  ])
  .then(stores => console.log(`${stores.length} stores created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());
