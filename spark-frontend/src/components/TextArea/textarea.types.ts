export interface ITextAreaFieldProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    registration?: any;
    className?: string;
}
