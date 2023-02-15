import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>工匠坚守</>,
    imageUrl: 'img/artisan-sprit.jpg',
    description: (
      <>
        以工匠的持之以恒的态度和精益求精的精神，创作和打磨精良的软件产品。
      </>
    ),
  },
  {
    title: <>大道至简</>,
    imageUrl: 'img/kiss.jpg',
    description: (
      <>
        始终探索最简的解决方案，以简单且资源消耗最少的方式解决看似复杂的问题。
      </>
    ),
  },
  {
    title: <>探索未来</>,
    imageUrl: 'img/take-fly-to-the-sky.jpg',
    description: (
      <>
        遥望浩瀚宇宙，畅想遥远未来，力争打造出能够跨越时空，影响世代的作品。
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={'Home'}
      description={`${siteConfig.title}: ${siteConfig.tagline}`}>
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className={clsx('hero__title', styles.heroTitle)}>{siteConfig.title}</h1>
          <p className={clsx('hero__subtitle', styles.heroSubtitle)}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            {/* <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link> */}
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container text--center">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
