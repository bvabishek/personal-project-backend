const Userconfig = require("../model/userconfig.model");
const admin = require('../firebase/firebaseadmin');

exports.getAllUsers = async (req, res) => {
  try {
    const userconfig = await Userconfig.find({});

    const userStatusPromises = userconfig.map(async (user) => {
      try {
        const firebaseUser = await admin.auth().getUser(user.uid);
        return {
          ...user.toObject(),
          isActive: !firebaseUser.disabled,
        };
      } catch (error) {
        return {
          ...user.toObject(),
          isActive: false,
        };
      }
    });

    const usersWithStatus = await Promise.all(userStatusPromises);

    res.status(200).json(usersWithStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserbyId = async (req, res) => {
  try {
    const { uid } = req.params;
    const userconfig = await Userconfig.findOne({ uid: uid });

    if (!userconfig) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userconfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUsers = async (req, res) => {
  try {
    const userconfig = await Userconfig.create(req.body);
    res.status(200).json(userconfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const userconfig = await Userconfig.findOneAndUpdate(
      { uid: uid },
      req.body,
      { new: true }
    );

    if (!uid) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userconfig);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { uid } = req.params;
    
    await admin.auth().deleteUser(uid);
    const userconfig = await Userconfig.findOneAndDelete({ uid: uid });

    if (!userconfig) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    if (error.code && error.code.startsWith('auth/')) {
      return res.status(500).json({ message: `Firebase error: ${error.message}` });
    }
    
    res.status(500).json({ message: error.message });
  }
};

  exports.disableUser = async (req, res) => {
    try {
      const { uid } = req.params;
  
      await admin.auth().updateUser(uid, { disabled: true });
  
      const userconfig = await Userconfig.findOne({ uid: uid });
      
      if (!userconfig) {
        return res.status(404).json({ message: "User not found" });
      }
  
      userconfig.disabled = true;
      await userconfig.save();
  
      res.status(200).json({ message: "User disabled successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.enableUser = async (req, res) => {
    try {
      const { uid } = req.params;
  
      await admin.auth().updateUser(uid, { disabled: false });
  
      const userconfig = await Userconfig.findOne({ uid: uid });
  
      if (!userconfig) {
        return res.status(404).json({ message: "User not found" });
      }
  
      userconfig.disabled = false;
      await userconfig.save();
  
      res.status(200).json({ message: "User enabled successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  