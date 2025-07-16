export interface IInputFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    registration?: any; // react-hook-form's register
    children?: React.ReactNode;
    className?: string;
    type: string;
}
