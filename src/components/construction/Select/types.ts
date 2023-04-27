export interface OptionProps {
    value: string | number;
    onClick?: (value: string | number) => void;
    children?: any;
    selected?: boolean;
    disabled?: boolean;
}

export interface SelectProps {
    children: any;
    label?: string;
    onChange?: (value: string | number) => void;
    className?: string;
}
