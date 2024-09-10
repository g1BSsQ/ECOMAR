import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useWalletList } from "@meshsdk/react";
import { useWalletContext } from '../../context/WalletContext';
interface Props {
  isDisabled: boolean;
}

export default function ConnectionHandler(props: Props) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {connected, connect, disconnect} = useWalletContext();
  const wallets = useWalletList();
  
  return (
    <>
      {connected ? (
        <Button variant="outline" className="bg-blue-500 text-primary-foreground px-12 py-3" isDisabled={props.isDisabled} onClick={disconnect}>
          Disconnect Wallet
        </Button> 
      ) : (
        <>
          <Button variant="outline" className="bg-blue-500 text-primary-foreground px-12 py-3" isDisabled={props.isDisabled} onClick={onOpen}>
            Connect Wallet
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Choose a Wallet</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {wallets.map((w, i) =>
                  <div
                    key={i}
                    className="flex items-center mb-4 p-4 bg-gray-100 rounded-lg justify-between"
                    style={{marginBottom: '15px'}}
                    onClick={async () => {
                      await connect(w.name);
                      onClose();
                    }}
                  >
                    <b className="ml-3">{w.name}</b>
                    <img src={w.icon} style={{ width: '48px', marginRight:"15px" }} />
                  </div>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
}