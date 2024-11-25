import {useAuth} from "@/contexts/AuthContext";
import {Modal, ModalBody, ModalContent} from "@nextui-org/modal";
import LoginForm from "@/components/auth/LoginForm";

const AuthModal = () => {
    const { authModalIsOpen, toggleAuthModal } = useAuth();

    if (!authModalIsOpen) return null;

    return (
        <Modal isOpen={authModalIsOpen} onClose={toggleAuthModal} backdrop="blur" placement="center" classNames={{
            wrapper: 'z-[999999]',
            backdrop: 'z-[999999]',
        }}>
            <ModalContent>
                <ModalBody className={"p-5"}>
                    <LoginForm />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default AuthModal;