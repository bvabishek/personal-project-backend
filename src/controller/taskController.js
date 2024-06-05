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
      return res.status(400).json({ message: "Total hours are required" });
    }

    // Find the current task
    const task = await Tasks.findOne({ taskId });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Function to convert HH:MM:SS format to total seconds
    const convertToSeconds = (time) => {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return (hours * 3600) + (minutes * 60) + seconds;
    };

    // Function to convert total seconds to HH:MM:SS format
    const convertToHHMMSS = (seconds) => {
      const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      return `${hrs}:${mins}:${secs}`;
    };

    // Convert current and new total hours to seconds
    const currentDurationInSeconds = convertToSeconds(task.totalHours);
    const newDurationInSeconds = convertToSeconds(totalHours);

    console.log('Current total hours in seconds:', currentDurationInSeconds);
    console.log('New total hours in seconds:', newDurationInSeconds);

    // Sum the durations in seconds
    const totalDurationInSeconds = currentDurationInSeconds + newDurationInSeconds;

    console.log('Total duration in seconds:', totalDurationInSeconds);

    // Convert total duration back to HH:MM:SS format
    const totalHoursSum = convertToHHMMSS(totalDurationInSeconds);

    console.log('Total hours sum in HH:MM:SS:', totalHoursSum);

    // Update task's total hours
    task.totalHours = totalHoursSum;
    await task.save();

    res.status(200).json({ message: "Total hours updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



  
  
  
