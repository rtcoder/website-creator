import classNames from "@/helpers/classNames";
import styles from './Modal.module.scss'
import React, {ReactNode} from "react";
import ModalHead from "@/components/construction/Modal/ModalHead";

export interface ModalProps {
    opened: boolean;
    onClose: () => void;
}

interface MainModalProps extends ModalProps {
    children: ReactNode | ReactNode[]
}

export function Modal(props: MainModalProps) {
    const {children} = props;
    const modalClasses = classNames({
        [styles.modalArea]: true,
        [styles.open]: props.opened
    });

    const head = React.Children.toArray(children).find((child: any) => child.type?.name === 'ModalHeader');
    const content = React.Children.toArray(children).filter((child: any) => child.type?.name !== 'ModalHeader');
    return (
        <div className={modalClasses}>
            <div className={styles.modalContainer}>
                <ModalHead onClose={props.onClose}>{head || ''}</ModalHead>

                <div className={styles.content}>
                    {props.opened ? content : ''}
                </div>
            </div>

        </div>
    )
}

export function ModalHeader({children}) {
    return (<>{children}</>)
}
