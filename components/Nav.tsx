'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  ['/', 'Home'],
  ['/routines', 'Routines'],
  ['/history', 'History'],
  ['/settings', 'Settings'],
];

export function Nav() {
  const path = usePathname();
  return (
    <nav className="grid grid-cols-4 gap-2 text-sm">
      {tabs.map(([href, label]) => (
        <Link
          key={href}
          href={href}
          className={`text-center p-2 rounded-xl ${path === href ? 'bg-indigo-600' : 'bg-slate-800'}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
