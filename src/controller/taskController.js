const Tasks = require("../model/task.model");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskbyId = async (req, res) => {
    try {
      const { projectId } = req.params;
      const tasks = await Tasks.find({ projectId: projectId });
  
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({ message: "Tasks not found for the projectId" });
      }
  
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

exports.createTask = async (req, res) => {
  try {
    const tasks = await Tasks.create(req.body);
    res.status(200).json({tasks: tasks,message: "Project created successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
    try {
      const {  taskId } = req.params;
      const tasks = await Tasks.findOneAndUpdate(
        {  taskId: taskId },
        req.body,
        { new: true }
      );
  
      if (!tasks) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const tasks = await Tasks.findOneAndDelete({ taskId: taskId });
  
      if (!tasks) {
        return res.status(404).json({ message: "tasks not found" });
      }
  
      res.status(200).json({ message: "Tasks deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateTaskStatus = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
  
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
  
      const task = await Tasks.findOneAndUpdate(
        { taskId: taskId },
        { status: status },
        { new: true } 
      );
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Status updated successfully", task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateTaskHours = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { totalHours } = req.body;
  
      if (!totalHours) {
        return res.status(400).json({ message: "hours is required" });
      }
  
      // Find the current task
      const task = await Tasks.findOne({ taskId: taskId });
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      // Convert the current total hours to seconds
      const [currentHours, currentMinutes, currentSeconds] = task.totalHours.split(":").map(Number);
      const currentDurationInSeconds = currentHours * 3600 + currentMinutes * 60 + currentSeconds;
  
      // Convert the new total hours to seconds
      const [newHours, newMinutes, newSeconds] = totalHours.split(":").map(Number);
      const newDurationInSeconds = newHours * 3600 + newMinutes * 60 + newSeconds;
  
      // Sum the durations
      const totalDurationInSeconds = currentDurationInSeconds + newDurationInSeconds;
  

      const hours = String(Math.floor(totalDurationInSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((totalDurationInSeconds % 3600) / 60)).padStart(2, "0");
      const seconds = String(totalDurationInSeconds % 60).padStart(2, "0");
      const totalHoursSum = `${hours}:${minutes}:${seconds}`;
  

      task.totalHours = totalHoursSum;
      await task.save();
  
      res.status(200).json({ message: "Total hours updated successfully", task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  
  