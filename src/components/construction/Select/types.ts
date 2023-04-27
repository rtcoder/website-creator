export interface OptionProps {
    value: string | number | null;
    onClick?: (value: string | number | null) => void;
    children?: any;
    selected?: boolean;
    disabled?: boolean;
}

export interface SelectProps {
    children: any;
    label?: string;
    onChange?: (value: string | number | null) => void;
    className?: string;
}
