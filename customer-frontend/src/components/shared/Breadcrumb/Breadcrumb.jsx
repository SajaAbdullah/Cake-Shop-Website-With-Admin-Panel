import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const Breadcrumb = ({ breadcrumb, title, description }) => {
  const router = useRouter();

  return (
    <>
      {/* <!-- BEGIN DETAIL MAIN BLOCK --> */}
      <div className='detail-block detail-block_margin'>
        <div className='wrapper'>
          <div className='detail-block__content'>
            <h1>{title}</h1>

            {breadcrumb && (
              <ul className='bread-crumbs'>
                {breadcrumb?.map(({ path, label }, i) => {
                  return (
                    <React.Fragment key={i}>
                      {path === router.asPath ? (
                        <li className='bread-crumbs__item'>{label}</li>
                      ) : (
                        <li className='bread-crumbs__item'>
                          <Link href={path}>
                            <a className='bread-crumbs__link'>{label}</a>
                          </Link>
                        </li>
                      )}
                    </React.Fragment>
                  );
                })}
              </ul>
            )}

            {/* IF NEED DESCRIPTION */}
            {description && <span className='error-descr'>{description}</span>}
          </div>
        </div>
      </div>
      {/* <!-- DETAIL MAIN BLOCK EOF   --> */}
    </>
  );
};
