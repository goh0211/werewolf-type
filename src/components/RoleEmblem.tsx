import type { RoleId } from '../data/roles'

type Props = {
  role: RoleId
  className?: string
  title?: string
}

const common = {
  viewBox: '0 0 64 64',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': true,
} as const

export function RoleEmblem({ role, className, title }: Props) {
  const label = title ?? role
  return (
    <span className={`role-emblem ${className ?? ''}`} role="img" aria-label={label}>
      {role === 'villager' && (
        <svg {...common}>
          <path d="M11 49h42M17 49V28l15-11 15 11v21" />
          <path d="M26 49V36h12v13M9 24l23-17 23 17" />
          <path d="M15 54c7-2 12-5 17-10M49 54c-7-2-12-5-17-10" />
          <path d="M14 50c-2-5-2-10-1-15M50 50c2-5 2-10 1-15" />
        </svg>
      )}
      {role === 'seer' && (
        <svg {...common}>
          <path d="M8 32s8-14 24-14 24 14 24 14-8 14-24 14S8 32 8 32Z" />
          <circle cx="32" cy="32" r="8" />
          <circle cx="32" cy="32" r="3" />
          <path d="M42 10c7 3 11 9 12 16-4-3-9-4-14-2 3-5 3-10 2-14Z" />
          <path d="M15 14l3 5 5 2-5 2-3 5-2-5-5-2 5-2 2-5Z" />
        </svg>
      )}
      {role === 'medium' && (
        <svg {...common}>
          <path d="M22 52h20M25 52l2-22h10l2 22" />
          <path d="M24 30h16l-2-7H26l-2 7Z" />
          <path d="M29 23c-1-8 2-13 7-16 1 5 5 7 4 13-1 5-5 7-11 3Z" />
          <path d="M17 42c-6-3-7-10-3-14 2 4 5 5 8 5M47 42c6-3 7-10 3-14-2 4-5 5-8 5" />
          <path d="M20 56c7-4 17-4 24 0" />
        </svg>
      )}
      {role === 'knight' && (
        <svg {...common}>
          <path d="M32 7 49 13v14c0 13-7 22-17 30-10-8-17-17-17-30V13l17-6Z" />
          <path d="m24 39 18-18M38 18l8 8M20 43l6 3-9 9-8 1 1-8 9-9 1 4Z" />
        </svg>
      )}
      {role === 'werewolf' && (
        <svg {...common}>
          <path d="M18 17 9 9l2 18c1 17 10 26 21 29 11-3 20-12 21-29l2-18-9 8-7-7-7 5-7-5-7 7Z" />
          <path d="m19 30 8 4-7 2M45 30l-8 4 7 2" />
          <path d="M25 43c5 4 9 4 14 0M27 49l2-5M37 49l-2-5" />
        </svg>
      )}
      {role === 'madman' && (
        <svg {...common}>
          <path d="M13 16c8-5 14-5 19 1 5-6 11-6 19-1l-3 27c-8 9-24 9-32 0l-3-27Z" />
          <path d="m20 28 8 4-9 3M44 28l-8 4 9 3" />
          <path d="M32 17v28M28 43l4 7 4-7" />
          <path d="M45 12c6 1 10 5 11 10-4-2-8-2-12 0 2-3 2-7 1-10Z" />
        </svg>
      )}
    </span>
  )
}
