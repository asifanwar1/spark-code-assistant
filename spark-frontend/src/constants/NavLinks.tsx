export interface NavLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export const mainNavLinks: NavLink[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Chat', href: '/chat' },
  { label: 'Analytics', href: '/analytics' },
];

