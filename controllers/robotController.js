// controllers/robotController.js
import Robot from '../models/Robot.js';

// Get all robots
export const getAllRobots = async (req, res) => {
  try {
    const robots = await Robot.find();
    res.json(robots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching robots', error });
  }
};

// Get robot by ID
export const getRobotById = async (req, res) => {
  try {
    const robot = await Robot.findById(req.params.id);
    if (!robot) return res.status(404).json({ message: 'Robot not found' });
    res.json(robot);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching robot', error });
  }
};

// Create new robot
export const createRobot = async (req, res) => {
  try {
    const robot = new Robot(req.body);
    await robot.save();
    res.status(201).json(robot);
  } catch (error) {
    res.status(400).json({ message: 'Error creating robot', error });
  }
};

// Update robot status
export const updateRobotStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['inactive', 'waiting', 'active', 'charging'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const robot = await Robot.findByIdAndUpdate(
      req.params.id,
      { status, lastUpdated: Date.now() },
      { new: true }
    );

    if (!robot) return res.status(404).json({ message: 'Robot not found' });
    res.json(robot);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
};

// Update robot location
export const updateRobotLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const robot = await Robot.findByIdAndUpdate(
      req.params.id,
      { location: { latitude, longitude }, lastUpdated: Date.now() },
      { new: true }
    );

    if (!robot) return res.status(404).json({ message: 'Robot not found' });
    res.json(robot);
  } catch (error) {
    res.status(500).json({ message: 'Error updating location', error });
  }
};
