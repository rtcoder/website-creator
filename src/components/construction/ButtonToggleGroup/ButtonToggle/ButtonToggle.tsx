import Button from "@/components/construction/Button/Button";

interface Props {
    active?: boolean;
    color?: 'primary' | 'accent' | 'warning' | 'danger';
    value?: string | number;
    disabled?: boolean;
    className?: string;
    children: any;
    onClick?: () => void;
}

export default function ButtonToggle(props: Props) {
    return (
        <Button type="button"
                active={props.active}
                disabled={props.disabled}
                className={props.className}
                onClick={props.onClick}>
            {props.children}
        </Button>
    )
}
