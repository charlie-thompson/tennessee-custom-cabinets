import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { articles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Resources & Insights | Tennessee Custom Cabinets',
  description: 'Expert advice on custom cabinetry, kitchen design trends, and Amish craftsmanship for Nashville, Franklin, Brentwood, and Middle Tennessee homeowners.',
  keywords: 'custom cabinets Nashville, kitchen design trends Tennessee, Amish cabinets guide, custom cabinetry Middle Tennessee, cabinet buying guide Franklin TN',
  openGraph: {
    title: 'Resources & Insights | Tennessee Custom Cabinets',
    description: 'Expert advice on custom cabinetry, kitchen design trends, and Amish craftsmanship for Middle Tennessee homeowners.',
    type: 'website',
  },
}

export default function ResourcesPage() {
  const featuredArticle = articles[1] // Kitchen trends as the feature
  const otherArticles = articles.filter((_, i) => i !== 1)

  return (
    <main>
      {/* ── Hero Section ── */}
      <section style={{
        position: 'relative',
        height: '70vh',
        minHeight: '500px',
        maxHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        <Image
          src="/images/projects/kitchen-07.JPG"
          alt="Luxury custom kitchen cabinetry in Nashville Tennessee"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          priority
          quality={90}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(28,25,23,0.3) 0%, rgba(28,25,23,0.6) 50%, rgba(28,25,23,0.92) 100%)',
        }} />
        <div style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '900px',
          padding: '0 40px 80px',
          margin: '0 auto',
          width: '100%',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#B5924C',
            marginBottom: '20px',
            fontWeight: 500,
          }}>
            Resources & Insights
          </p>
          <h1 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 300,
            color: '#FAF7F2',
            lineHeight: 1.1,
            marginBottom: '20px',
            letterSpacing: '-0.02em',
          }}>
            Craftsmanship, Design, <br />
            <span style={{ fontStyle: 'italic', color: '#D4B483' }}>and the Details That Matter</span>
          </h1>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '17px',
            color: 'rgba(250,247,242,0.75)',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto',
            fontWeight: 300,
          }}>
            Expert insights on custom cabinetry, luxury kitchen design, and what sets
            handcrafted Amish woodworking apart from the rest.
          </p>
        </div>
      </section>

      {/* ── Featured Article ── */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 40px 0',
      }}>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#B5924C',
          marginBottom: '32px',
          fontWeight: 500,
        }}>
          Featured
        </p>
        <Link href={`/resources/${featuredArticle.slug}`} style={{ textDecoration: 'none' }}>
          <article className="featured-card" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0',
            borderRadius: '4px',
            overflow: 'hidden',
            background: '#1C1917',
            transition: 'transform 0.4s ease',
            cursor: 'pointer',
          }}>
            <div style={{
              position: 'relative',
              aspectRatio: '4/3',
              minHeight: '360px',
            }}>
              <Image
                src={featuredArticle.heroImage}
                alt={featuredArticle.title}
                fill
                style={{ objectFit: 'cover' }}
                quality={85}
              />
            </div>
            <div style={{
              padding: '48px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
              <span style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#B5924C',
                marginBottom: '16px',
                fontWeight: 500,
              }}>
                {featuredArticle.category}
              </span>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(24px, 3vw, 34px)',
                fontWeight: 400,
                color: '#FAF7F2',
                lineHeight: 1.2,
                marginBottom: '16px',
                letterSpacing: '-0.02em',
              }}>
                {featuredArticle.title}
              </h2>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '15px',
                color: 'rgba(250,247,242,0.6)',
                lineHeight: 1.7,
                marginBottom: '24px',
                fontWeight: 300,
              }}>
                {featuredArticle.excerpt}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  color: 'rgba(250,247,242,0.4)',
                }}>
                  {featuredArticle.date}
                </span>
                <span style={{
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  background: 'rgba(250,247,242,0.2)',
                }} />
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  color: 'rgba(250,247,242,0.4)',
                }}>
                  {featuredArticle.readTime}
                </span>
              </div>
            </div>
          </article>
        </Link>
      </section>

      {/* ── Article Grid ── */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '64px 40px 40px',
      }}>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#B5924C',
          marginBottom: '32px',
          fontWeight: 500,
        }}>
          All Articles
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '32px',
        }}>
          {otherArticles.map((article) => (
            <Link key={article.slug} href={`/resources/${article.slug}`} style={{ textDecoration: 'none' }}>
              <article className="article-card" style={{
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
                    src={article.heroImage}
                    alt={article.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    quality={80}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    padding: '4px 12px',
                    background: 'rgba(28,25,23,0.85)',
                    borderRadius: '2px',
                  }}>
                    <span style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '10px',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#B5924C',
                      fontWeight: 500,
                    }}>
                      {article.category}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '28px 24px 24px' }}>
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#1C1917',
                    lineHeight: 1.3,
                    marginBottom: '12px',
                    letterSpacing: '-0.01em',
                  }}>
                    {article.title}
                  </h3>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '14px',
                    color: '#6B6560',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                    fontWeight: 300,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden',
                  }}>
                    {article.excerpt}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '12px',
                        color: '#9B9690',
                      }}>
                        {article.date}
                      </span>
                      <span style={{
                        width: '3px',
                        height: '3px',
                        borderRadius: '50%',
                        background: '#E8E4DC',
                      }} />
                      <span style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '12px',
                        color: '#9B9690',
                      }}>
                        {article.readTime}
                      </span>
                    </div>
                    <span style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#B5924C',
                      fontWeight: 500,
                    }}>
                      Read →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA Section ── */}
      <section style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '60px 40px 100px',
        textAlign: 'center',
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
          color: '#1C1917',
          lineHeight: 1.2,
          marginBottom: '16px',
          letterSpacing: '-0.02em',
        }}>
          Ready to Start Your Project?
        </h2>
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '16px',
          color: '#6B6560',
          lineHeight: 1.7,
          marginBottom: '32px',
          fontWeight: 300,
          maxWidth: '500px',
          margin: '0 auto 32px',
        }}>
          Schedule a free in-home design consultation and see why Middle Tennessee
          homeowners trust us with their most important rooms.
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
          transition: 'background 0.3s ease',
        }}>
          Get Your Free Consultation
        </Link>
      </section>

      <style>{`
        .featured-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(28,25,23,0.2);
        }
        .article-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(28,25,23,0.1);
        }
        .article-card:hover img {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .featured-card {
            grid-template-columns: 1fr !important;
          }
          .featured-card > div:first-child {
            min-height: 240px !important;
            aspect-ratio: 16/10 !important;
          }
          .featured-card > div:last-child {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </main>
  )
}
