import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import { newTimer } from "./utils/TimerUtils";
import EditableTimer from "./components/EditableTimer";
import ToggleableTimerForm from "./components/ToggleableTimerForm";

export default function App() {
  const [timers, setTimers] = useState([
    {
      title: "Mow the lawn",
      project: "House Chores",
      id: uuidv4(),
      elapsed: 5456099,
      isRunning: true,
    },
    {
      title: "Bake squash",
      project: "Kitchen Chores",
      id: uuidv4(),
      elapsed: 1273998,
      isRunning: false,
    },
  ]);

  const handleCreateFormSubmit = (timer) => {
    setTimers((prevTimers) => {
      return [newTimer(timer), ...prevTimers];
    });
  };
  const handleFormSubmit = (attrs) => {
    setTimers((prevTimers) =>
      prevTimers.map((timer) => {
        if (timer.id === attrs.id) {
          const { title, project } = attrs;
          return {
            ...timer,
            title,
            project,
          };
        }
        return timer;
      })
    );
  };

  const handleRemove = (timerId) => {
    setTimers((prevTimers) => prevTimers.filter((t) => t.id !== timerId));
  };
  return (
    <View style={styles.appContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Timers</Text>
      </View>
      <ScrollView style={styles.timerList}>
        <ToggleableTimerForm onFormSubmit={handleCreateFormSubmit} />
        {timers.map(({ title, project, id, elapsed, isRunning }) => (
          <EditableTimer
            key={id}
            id={id}
            title={title}
            project={project}
            elapsed={elapsed}
            isRunning={isRunning}
            onFormSubmit={handleFormSubmit}
            onRemovePress={handleRemove}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  titleContainer: {
    paddingTop: 35,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D6D7DA",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  timerListContainer: {
    flex: 1,
  },
  timerList: {
    paddingBottom: 15,
  },
});
