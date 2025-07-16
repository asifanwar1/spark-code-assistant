import { StaticImageData } from "next/image";

export interface IFeature {
    text: string;
    icon?: React.ReactNode;
}

export interface IActionCardProps {
    title: string;
    description: string;
    features: IFeature[];
    icon: string | StaticImageData;
    href: string;
    className?: string;
}
