import { StyleSheet, View, Text, TextInput } from "react-native";
import PropTypes from "prop-types";
import TimerButton from "./TimerButton";
import { useState } from "react";

export default function TimerForm({
  id,
  title: titleText,
  project: projectText,
  onFormSubmit,
  onFormClose,
}) {
  const [title, setTitle] = useState(id ? titleText : "");
  const [project, setProject] = useState(id ? projectText : "");
  const submitText = id ? "Update" : "Create";

  const handleSubmit = () => {
    onFormSubmit({ id, title, project });
  };
  return (
    <View style={styles.formContainer}>
      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Title</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
      </View>
      <View style={styles.attributeContainer}>
        <Text style={styles.textInputTitle}>Project</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            underlineColorAndroid="transparent"
            value={project}
            onChangeText={(text) => setProject(text)}
          />
        </View>
      </View>
      <View style={styles.buttonGroup}>
        <TimerButton
          small
          color="#21BA45"
          title={submitText}
          onPress={handleSubmit}
        />
        <TimerButton
          small
          color="#DB2828"
          title="Cancel"
          onPress={onFormClose}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "white",
    borderColor: "#D6D7DA",
    borderWidth: 2,
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 0,
  },
  attributeContainer: {
    marginVertical: 8,
  },
  textInputContainer: {
    borderColor: "#D6D7DA",
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 5,
  },
  textInput: {
    height: 30,
    padding: 5,
    fontSize: 12,
  },
  textInputTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

TimerForm.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  project: PropTypes.string,
  onFormSubmit: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
};

TimerForm.defaultProps = {
  id: null,
  title: "",
  project: "",
};
