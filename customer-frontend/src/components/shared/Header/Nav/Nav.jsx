import useWindowSize from 'components/utils/windowSize/windowSize';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Nav = ({ navItem }) => {
  const router = useRouter();
  const [sub, setSub] = useState(false);
  const [height, width] = useWindowSize();

  useEffect(() => {
    if (height > 768) {
      setSub(false);
    }
  }, [height]);
  return (
    <ul className='header-nav'>
      {navItem.map((nav) => (
        <li
          key={nav.path}
          onClick={() => {
            nav.subNav ? setSub(!sub) : '';
          }}
        >
          <Link href={nav.path}>
            <a className={nav.path === router.pathname ? 'active' : ''}>
              {nav.name}
            </a>
          </Link>
          {nav.subNav && (
            <ul className={sub ? 'active' : ''}>
              {nav.subNav.map((sub) => (
                <li key={sub.path}>
                  <Link href={sub.path}>
                    <a>{sub.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
