"use client";

import { ReactNode } from "react";
import { default as ModalComponent, ModalProps } from "react-responsive-modal";
import "@/modules/profile/styles/reactResponsiveModal.css";

type ModelProps = ModalProps & {
    children: ReactNode;
};
const Modal = ({ children, ...props }: ModelProps) => {
    return (
        <ModalComponent open={props.open} onClose={props.onClose} showCloseIcon={false} center>
            {children}
        </ModalComponent>
    );
};

export default Modal;
