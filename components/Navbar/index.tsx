import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { navs } from './config';
import styles from './index.module.scss';

const Navbar: NextPage = () => {
  const { pathname } = useRouter();
  console.log('pathname: ', pathname);

  return (
    <div className={styles.navbar}>
      <section className={styles.logArea}>JUEJIN</section>
      <section className={styles.linkArea}>
        {navs?.map((nav, index) => (
          <Link key={index} href={nav?.value} legacyBehavior>
            <a className={pathname === nav?.value ? styles.active : ''}>
              {nav.label}
            </a>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Navbar;
