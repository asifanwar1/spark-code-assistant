import { useRouter } from "next/navigation";
import Image from "next/image";
import userIcon from "@/assets/icons/user-icon-white.svg";
import logoutIcon from "@/assets/icons/signout-icon-white.svg";

export const createProfileItems = (
    router: ReturnType<typeof useRouter>,
    setIsModalOpen: (open: boolean) => void
) => [
    {
        id: 1,
        label: "View Profile",
        icon: <Image src={userIcon} alt="user" width={16} height={16} />,
        onClick: () => {
            router.push("/profile");
        },
    },
    {
        id: 2,
        label: "Logout",
        icon: <Image src={logoutIcon} alt="logout" width={16} height={16} />,
        onClick: () => {
            setIsModalOpen(true);
        },
    },
];
