const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  try {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .collection('contacts')
    .findOne({ _id: userId });

  if (!contact) {
    return res.status(404).json({message: 'Contact not found'});
  }

  res.status(200).json(contact);
} catch (err) {
  res.status(500).json({ error: err.message });
}
};



const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb
    .getDb()
    .collection('contacts')
    .insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    // Make sure 'response' is defined
    const response = await mongodb
      .getDb()
      .collection('contacts')
      .replaceOne({ _id: userId }, contact);

    if (response.modifiedCount > 0) {
      // Optionally return the updated document instead of 204
      const updatedContact = await mongodb
        .getDb()
        .collection('contacts')
        .findOne({ _id: userId });

      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Contact not found or no changes made.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while updating the contact.' });
  }
};


const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .collection('contacts')
      .deleteOne({ _id: userId });
    
    console.log(response);

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Contact successfully deleted' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while deleting the contact.' });
  }
};


module.exports = { 
  getAll, 
  getSingle, 
  createContact, 
  updateContact,
  deleteContact
};