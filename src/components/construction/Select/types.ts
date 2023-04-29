export interface OptionProps {
    value: string | number | null;
    onClick?: (value: any | null) => void;
    children?: any;
    selected?: boolean;
    disabled?: boolean;
}

export interface SelectProps {
    children: any;
    label?: string;
    onChange?: (value: any | null) => void;
    className?: string;
}
