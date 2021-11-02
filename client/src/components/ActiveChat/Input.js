import React, { useState } from "react";
import { FormControl, FilledInput, InputAdornment, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoodIcon from '@material-ui/icons/Mood';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  },
  icon: {
    color: theme.palette.secondary.main,
    marginLeft: '.7rem' 
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { postMessage, otherUser, conversationId, user, setShowDialog, attachments, setAttachments } = props;
  

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: attachments,
    };
    await postMessage(reqBody);
    setText("");
    setAttachments([]);
  };

  const handleDialog = () => {
    setShowDialog(true);
  }


  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="add attachment"
                onClick={handleDialog}
              >
                <MoodIcon className={classes.icon}/>
                <FilterNoneIcon className={classes.icon}/>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
