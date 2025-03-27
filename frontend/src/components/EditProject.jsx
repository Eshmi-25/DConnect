import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, DialogActions, DialogContent, DialogTitle, Dialog } from "@mui/material";

const EditProject = ({ open, handleClose, project, refreshProjects }) => {
  const [updatedProject, setUpdatedProject] = useState({
    name: project?.name || "",
    description: project?.description || "",
    keywords: project?.keywords || [],
    estdDuration: project?.estdDuration || "",
    budget: project?.budget || 0,
    questions: project?.questions || [],
  });

  // Handle changes in the form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle the submission of the form (Update project)
  const handleSubmit = async () => {
    const token = localStorage.getItem("token"); // Retrieve the Bearer token

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    try {
      const response = await axios.put(
        `/api/projects/edit/${project._id}`,
        updatedProject,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to the Authorization header
          },
        }
      );

      // Handle the response here (optional)
      console.log("Project updated successfully:", response.data);

      // Refresh the projects list after the update
      refreshProjects();
      handleClose(); // Close the modal after the update
    } catch (err) {
      console.error("Error updating project:", err);
    }
  };

  useEffect(() => {
    if (project) {
      setUpdatedProject({
        name: project.name,
        description: project.description,
        keywords: project.keywords,
        estdDuration: project.estdDuration,
        budget: project.budget,
        questions: project.questions,
      });
    }
  }, [project]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            label="Project Name"
            name="name"
            value={updatedProject.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={updatedProject.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Estimated Duration"
            name="estdDuration"
            value={updatedProject.estdDuration}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Budget"
            name="budget"
            type="number"
            value={updatedProject.budget}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Keywords"
            name="keywords"
            value={updatedProject.keywords.join(", ")}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Questions"
            name="questions"
            value={updatedProject.questions.join(", ")}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProject;
