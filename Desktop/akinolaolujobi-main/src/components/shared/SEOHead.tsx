import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const defaultMeta = {
  title: 'Akinola Olujobi | Speaker, Writer, Digital Marketer',
  description: 'Akinola Olujobi - I Teach, I Sing, I Write, I Go Digital, I Speak, I Inspire. Transforming ideas into compelling stories that captivate and convert.',
  image: 'https://akinolaolujobi.com/og-image.jpg',
  url: 'https://akinolaolujobi.com',
  author: 'Akinola Olujobi',
  keywords: 'Akinola Olujobi, speaker, writer, digital marketing, motivational speaker, content creator, author, Nigeria, Lagos, copywriting, public speaking, inspiration',
};

export default function SEOHead({
  title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  image = defaultMeta.image,
  url = defaultMeta.url,
  type = 'website',
  author = defaultMeta.author,
  publishedTime,
  modifiedTime,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | Akinola Olujobi` : defaultMeta.title;

  // Person structured data
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Akinola Olujobi',
    url: 'https://akinolaolujobi.com',
    image: image,
    sameAs: [
      'https://web.facebook.com/akinolaolujobi',
      'https://www.instagram.com/akinolaolujobi',
      'https://x.com/akinolaolujobi',
      'https://www.linkedin.com/in/akinolaolujobi',
      'https://www.youtube.com/@akinolaolujobi',
    ],
    jobTitle: 'Speaker, Writer, Digital Marketer',
    worksFor: {
      '@type': 'Organization',
      name: 'Akinola Olujobi',
    },
    description: description,
    knowsAbout: ['Public Speaking', 'Digital Marketing', 'Content Writing', 'Music', 'Teaching', 'Inspiration'],
  };

  // Website structured data
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Akinola Olujobi',
    url: 'https://akinolaolujobi.com',
    description: defaultMeta.description,
    publisher: {
      '@type': 'Person',
      name: 'Akinola Olujobi',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://akinolaolujobi.com/blog?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // Professional Service structured data
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Akinola Olujobi Services',
    url: 'https://akinolaolujobi.com/our-services',
    description: 'Professional speaking, writing, digital marketing, teaching, and inspiration services.',
    provider: {
      '@type': 'Person',
      name: 'Akinola Olujobi',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    serviceType: ['Public Speaking', 'Digital Marketing', 'Content Writing', 'Music Performance', 'Teaching', 'Motivational Speaking'],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Akinola Olujobi" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@akinolaolujobi" />
      <meta name="twitter:creator" content="@akinolaolujobi" />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </Helmet>
  );
}
