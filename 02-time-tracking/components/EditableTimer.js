import { useState } from "react";
import PropTypes from "prop-types";
import TimerForm from "./TimerForm";
import Timer from "./Timer";

export default function EditableTimer({
  id,
  title,
  project,
  elapsed,
  isRunning,
  onFormSubmit,
  onRemovePress,
  onStartPress,
  onStopPress,
}) {
  const [editFormOpen, setEditFormOpen] = useState(false);

  const openForm = () => setEditFormOpen(true);
  const closeForm = () => setEditFormOpen(false);
  const handleSubmit = (timer) => {
    onFormSubmit(timer);
    closeForm();
  };

  if (editFormOpen) {
    return (
      <TimerForm
        id={id}
        title={title}
        project={project}
        onFormSubmit={handleSubmit}
        onFormClose={closeForm}
      />
    );
  }
  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
      onEditPress={openForm}
      onRemovePress={onRemovePress}
      onStartPress={onStartPress}
      onStopPress={onStopPress}
    />
  );
}

EditableTimer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  elapsed: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onRemovePress: PropTypes.func.isRequired,
  onStartPress: PropTypes.func.isRequired,
  onStopPress: PropTypes.func.isRequired,
};
