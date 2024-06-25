import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Box
} from '@chakra-ui/react';

const CoachingDetailsModal = ({ isOpen, onClose, eventDetails }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Session Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb="4">
            <Text fontSize="lg" mb="2" fontWeight="bold">
              Details
            </Text>
            <pre>{JSON.stringify(eventDetails, null, 2)}</pre>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CoachingDetailsModal;
