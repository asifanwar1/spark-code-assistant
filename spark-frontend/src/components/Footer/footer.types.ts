export interface IFooterLink {
    label: string;
    href: string;
}

export interface ISocialLink {
    platform: string;
    href: string;
    icon: React.ReactNode;
}

export interface IFooterProps {
    companyInfo: {
        name: string;
        address?: string;
        email?: string;
    };
    links: {
        title: string;
        links: IFooterLink[];
    }[];
    socialLinks: ISocialLink[];
    className?: string;
}
