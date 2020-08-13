import Link from 'next/link';

export const Nav = () => {
  return (
    <nav>
      <Link href="/">
        <h3>Limited Quiver</h3>
      </Link>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/leagues" >
          <a>Leagues</a>
        </Link>
      </li>
      <li>
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </li>
    </nav>
  )
}

