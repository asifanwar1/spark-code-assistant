export interface IMessage {
    id: number;
    sender: string;
    text: string;
}

export interface ITeamSidebarProps {
    selected: string;
    onSelect: (section: string) => void;
}
