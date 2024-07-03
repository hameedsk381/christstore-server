// controllers/songsController.js
const Song = require('../models/Song');
const Category = require('../models/Category');

exports.uploadSong = async (req, res) => {
  const { ragaam, taalam, chaaya, rachayitha, anuvaadam, paata ,fileUrl,category,title,songNum } = req.body;

  const newSong = new Song({
    ragaam,
    taalam,
    chaaya,
    rachayitha,
    anuvaadam,
    paata,fileUrl,category,title,songNum
  });

  try {
    const savedSong = await newSong.save();
    res.status(201).json(savedSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSongById = async (req, res) => {
    try {
      const message = await Song.findById(req.params.id);
      if (!message) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.status(200).json(message);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching Song', error });
    }
  };

exports.updateSong = async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSong) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(400).json({ message: 'Error updating Song', error });
  }
};

exports.deleteSong = async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.status(200).json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting Song', error });
  }
};
