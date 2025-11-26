import { StaticImageData } from "next/image";

export interface INavLink {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

export interface ITextLogo {
    text: string;
    className?: string;
}

export interface IImageLogo {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

export interface INavbarProps {
    imageLogo?: IImageLogo;
    textLogo?: ITextLogo;
    links: INavLink[];
    className?: string;
}
