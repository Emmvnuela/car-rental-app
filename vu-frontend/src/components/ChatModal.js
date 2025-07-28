import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ChatModal = ({ isOpen, onRequestClose, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Chat"
    style={{
      content: {
        width: "400px",
        height: "500px",
        margin: "auto",
        padding: "0",
        borderRadius: "10px",
        overflow: "hidden",
      },
    }}
  >
    {children}
  </Modal>
);

export default ChatModal;
