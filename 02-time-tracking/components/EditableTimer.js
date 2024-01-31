import { useState } from "react";
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
    />
  );
}
