import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import ImageUpload from "../forms/ImageUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 8,
    flexDirection: "column",
    position: 'relative',
    maxWidth: '100%'
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(1),
  },
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between"
  }
}));

const ActiveChat = (props) => {
  const classes = useStyles();
  const { user } = props;
  const conversation = props.conversation || {};
  const sortedMessages = props.conversation ? conversation.messages.slice().sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) : {};
  const [showDialog, setShowDialog] = useState(false);
  const [attachments, setAttachments] = useState([]);
  
  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={sortedMessages}
              otherUser={conversation.otherUser}
              userId={user.id}
              userPhoto={user.photoUrl}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
              setShowDialog={setShowDialog}
              attachments={attachments}
              setAttachments={setAttachments}
            />
          </Box>
        </>
      )}
      <ImageUpload setShowDialog={setShowDialog} showDialog={showDialog} setAttachments={setAttachments} />
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) => conversation.otherUser.username === state.activeConversation
      )
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
