export interface ISelectOption {
    value: string;
    label: string;
}

export interface ISelectFieldProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: ISelectOption[];
    error?: string;
    className?: string;
    registration?: any;
}
