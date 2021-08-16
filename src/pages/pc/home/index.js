import Link from 'next/link'

export default function Home() {
  return (
    <ul>
      <li>
        <Link href="/about?id=first" as="/about">
          <a>关于我们</a>
        </Link>
      </li>
      <li>
        <Link href="/blog?id=second" as="/blog/second">
          <a>My second blog post</a>
        </Link>
      </li>
      <li>
        <Link href="/blog?id=last" as="/blog/last">
          <a>My last blog post</a>
        </Link>
      </li>
    </ul>
  )
}