// controllers/wordController.js
const Word = require('../models/Word');

const getAllWords = async (req, res) => {
  try {
    const words = await Word.find();
    res.status(200).json(words);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching words', error });
  }
};

const getWordById = async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.status(200).json(word);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching word', error });
  }
};

const createWord = async (req, res) => {
  try {
    const newWord = new Word(req.body);
    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(500).json({ message: 'Error creating word', error });
  }
};

const updateWord = async (req, res) => {
  try {
    const word = await Word.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.status(200).json(word);
  } catch (error) {
    res.status(500).json({ message: 'Error updating word', error });
  }
};

const deleteWord = async (req, res) => {
  try {
    const word = await Word.findByIdAndDelete(req.params.id);
    if (!word) {
      return res.status(404).json({ message: 'Word not found' });
    }
    res.status(200).json({ message: 'Word deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting word', error });
  }
};

module.exports = { getAllWords, getWordById, createWord, updateWord, deleteWord };
