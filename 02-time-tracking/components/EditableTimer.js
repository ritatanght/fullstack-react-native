import { useState } from "react";
import TimerForm from "./TimerForm";
import Timer from "./Timer";

export default function EditableTimer({
  id,
  title,
  project,
  elapsed,
  isRunning,
}) {
  const [editFormOpen, setEditFormOpen] = useState(false);
  if (editFormOpen) {
    return <TimerForm id={id} title={title} project={project} />;
  }
  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
    />
  );
}
