import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { articles, getArticleBySlug, type Article, type ArticleSection } from '@/lib/articles'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords.join(', '),
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updated,
      authors: [article.author],
      images: [{ url: article.heroImage }],
    },
  }
}

function ArticleContent({ section, index }: { section: ArticleSection; index: number }) {
  switch (section.type) {
    case 'heading':
      return (
        <h2 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(24px, 3vw, 32px)',
          fontWeight: 400,
          color: '#1C1917',
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginTop: index === 0 ? 0 : '48px',
          marginBottom: '20px',
        }}>
          {section.text}
        </h2>
      )
    case 'paragraph':
      return (
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '16px',
          color: '#6B6560',
          lineHeight: 1.8,
          fontWeight: 300,
          marginBottom: '24px',
        }}>
          {section.text}
        </p>
      )
    case 'image':
      return (
        <figure style={{
          margin: '40px -40px',
          position: 'relative',
        }}>
          <div style={{
            position: 'relative',
            aspectRatio: '16/9',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <Image
              src={section.src || ''}
              alt={section.alt || ''}
              fill
              style={{ objectFit: 'cover' }}
              quality={85}
            />
          </div>
          {section.caption && (
            <figcaption style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              color: '#9B9690',
              fontWeight: 300,
              marginTop: '12px',
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              {section.caption}
            </figcaption>
          )}
        </figure>
      )
    case 'cta':
      return (
        <div style={{
          margin: '48px 0',
          padding: '40px',
          background: '#1C1917',
          borderRadius: '4px',
          textAlign: 'center',
          borderLeft: '3px solid #B5924C',
        }}>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '22px',
            fontWeight: 400,
            color: '#FAF7F2',
            lineHeight: 1.4,
            marginBottom: '24px',
            fontStyle: 'italic',
          }}>
            {section.text}
          </p>
          <Link href={section.ctaHref || '/#consultation'} style={{
            display: 'inline-block',
            padding: '14px 40px',
            background: '#B5924C',
            color: '#FAF7F2',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 500,
            textDecoration: 'none',
            borderRadius: '2px',
            transition: 'background 0.3s ease',
          }}>
            {section.ctaText}
          </Link>
        </div>
      )
    default:
      return null
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  // Get related articles (exclude current)
  const relatedArticles = articles.filter(a => a.slug !== slug).slice(0, 2)

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tennessee Custom Cabinets',
      url: 'https://tennesseecustomcabinets.com',
    },
    datePublished: article.date,
    dateModified: article.updated,
    image: article.heroImage,
    keywords: article.keywords.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* ── Article Hero ── */}
        <section style={{
          position: 'relative',
          height: '60vh',
          minHeight: '400px',
          maxHeight: '600px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
            priority
            quality={90}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(28,25,23,0.2) 0%, rgba(28,25,23,0.5) 50%, rgba(28,25,23,0.95) 100%)',
          }} />
          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '800px',
            padding: '0 40px 60px',
            margin: '0 auto',
            width: '100%',
          }}>
            <Link href="/resources" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#B5924C',
              marginBottom: '24px',
              textDecoration: 'none',
              fontWeight: 500,
            }}>
              ← Back to Resources
            </Link>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px',
            }}>
              <span style={{
                padding: '4px 12px',
                border: '1px solid rgba(181,146,76,0.4)',
                borderRadius: '2px',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#B5924C',
                fontWeight: 500,
              }}>
                {article.category}
              </span>
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: 'rgba(250,247,242,0.5)',
              }}>
                {article.readTime}
              </span>
            </div>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(30px, 4.5vw, 48px)',
              fontWeight: 300,
              color: '#FAF7F2',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}>
              {article.title}
            </h1>
          </div>
        </section>

        {/* ── Author / Date Bar ── */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '24px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E8E4DC',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#1C1917',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '16px',
              color: '#B5924C',
              fontWeight: 500,
            }}>
              {article.author.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                color: '#1C1917',
                fontWeight: 400,
                lineHeight: 1.3,
              }}>
                {article.author}
              </p>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: '#9B9690',
                fontWeight: 300,
              }}>
                {article.date} · Updated {article.updated}
              </p>
            </div>
          </div>
        </div>

        {/* ── Article Body ── */}
        <article style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '48px 40px 60px',
        }}>
          {article.content.map((section, index) => (
            <ArticleContent key={index} section={section} index={index} />
          ))}
        </article>

        {/* ── Related Articles ── */}
        {relatedArticles.length > 0 && (
          <section style={{
            background: '#F0EBE3',
            padding: '80px 40px',
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
            }}>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#B5924C',
                marginBottom: '12px',
                fontWeight: 500,
              }}>
                Keep Reading
              </p>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(28px, 3.5vw, 36px)',
                fontWeight: 300,
                color: '#1C1917',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: '40px',
              }}>
                More from Our Journal
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '32px',
              }}>
                {relatedArticles.map((related) => (
                  <Link key={related.slug} href={`/resources/${related.slug}`} style={{ textDecoration: 'none' }}>
                    <article className="related-card" style={{
                      borderRadius: '4px',
                      overflow: 'hidden',
                      background: '#FDFCFA',
                      border: '1px solid #E8E4DC',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      cursor: 'pointer',
                    }}>
                      <div style={{
                        position: 'relative',
                        aspectRatio: '16/10',
                        overflow: 'hidden',
                      }}>
                        <Image
                          src={related.heroImage}
                          alt={related.title}
                          fill
                          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          quality={80}
                        />
                      </div>
                      <div style={{ padding: '24px' }}>
                        <span style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '10px',
                          letterSpacing: '0.15em',
                          textTransform: 'uppercase',
                          color: '#B5924C',
                          fontWeight: 500,
                        }}>
                          {related.category}
                        </span>
                        <h3 style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '20px',
                          fontWeight: 400,
                          color: '#1C1917',
                          lineHeight: 1.3,
                          marginTop: '8px',
                          marginBottom: '12px',
                          letterSpacing: '-0.01em',
                        }}>
                          {related.title}
                        </h3>
                        <span style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '12px',
                          color: '#9B9690',
                        }}>
                          {related.readTime}
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Final CTA ── */}
        <section style={{
          background: '#1C1917',
          padding: '80px 40px',
          textAlign: 'center',
        }}>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            <div style={{
              width: '40px',
              height: '1px',
              background: '#B5924C',
              margin: '0 auto 32px',
            }} />
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 300,
              color: '#FAF7F2',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}>
              Your Home Deserves Better <br />
              <span style={{ fontStyle: 'italic', color: '#D4B483' }}>Than Stock Cabinets</span>
            </h2>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '16px',
              color: 'rgba(250,247,242,0.6)',
              lineHeight: 1.7,
              fontWeight: 300,
              marginBottom: '32px',
            }}>
              Schedule a free in-home consultation. We will measure your space, discuss your
              vision, and show you what handcrafted custom cabinetry can do for your home.
            </p>
            <Link href="/#consultation" style={{
              display: 'inline-block',
              padding: '16px 48px',
              background: '#B5924C',
              color: '#FAF7F2',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 500,
              textDecoration: 'none',
              borderRadius: '2px',
            }}>
              Schedule Your Free Consultation
            </Link>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              color: 'rgba(250,247,242,0.3)',
              marginTop: '16px',
              fontWeight: 300,
            }}>
              Serving Nashville, Franklin, Brentwood, Murfreesboro & all of Middle Tennessee
            </p>
          </div>
        </section>

        <style>{`
          .related-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(28,25,23,0.1);
          }
          .related-card:hover img {
            transform: scale(1.05);
          }
          @media (max-width: 768px) {
            figure {
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
          }
        `}</style>
      </main>
    </>
  )
}
