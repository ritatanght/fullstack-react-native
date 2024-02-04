import { SafeAreaView, StyleSheet } from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import PropTypes from "prop-types";

import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";
import NavigationBar from "../components/NavigationBar";

const Comments = ({ style, comments, onClose, onSubmitComment }) => {
  return (
    <SafeAreaView style={style}>
      <NavigationBar
        title="Comments"
        leftText="Close"
        onPressLeftText={onClose}
      />
      <CommentInput placeholder="Leave a comment" onSubmit={onSubmitComment} />
      <CommentList items={comments} />
    </SafeAreaView>
  );
};

Comments.propTypes = {
  style: StyleSheet.ViewPropTypes,
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitComment: PropTypes.func.isRequired,
};

Comments.defaultProps = {
  style: null,
};

export default Comments;
