import { StaticImageData } from "next/image";

export interface INavLink {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

export interface IProfileInfo {
    name: string;
    avatar?: string | StaticImageData;
    email?: string;
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
    profile?: IProfileInfo;
    onProfileClick?: () => void;
    className?: string;
}
