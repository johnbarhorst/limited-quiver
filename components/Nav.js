import Link from 'next/link';

export const Nav = () => {
  return (
    <nav>
      <h3>Limited Quiver</h3>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/shooters" >
          <a>Shooters</a>
        </Link>
      </li>
    </nav>
  )
}

