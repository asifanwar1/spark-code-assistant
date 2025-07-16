import { StaticImageData } from "next/image";

export interface IFeatureCardProps {
    icon: string | StaticImageData;
    title: string;
    description: string;
    className?: string;
}
