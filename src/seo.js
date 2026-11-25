import { wedding } from './data/content'

export const seo = {
  title: {
    en: 'Sreng ♥ Phana Wedding Invitation',
    km: 'ស្រេង ♥ ផាណា · សិរីមង្គលអាពាហ៍ពិពាហ៍',
  },
  description: {
    en: `You're invited to the wedding of ${wedding.groom.fullName} & ${wedding.bride.fullName}. Friday, 11 December 2026 · 5:00 PM at ${wedding.venue.name.en}, Kampong Speu.`,
    km: `សូមអញ្ជើញចូលរួមពិធីមង្គលការរបស់ ${wedding.groom.fullNameKm} និង ${wedding.bride.fullNameKm}។ ថ្ងៃសុក្រ ទី១១ ខែធ្នូ ឆ្នាំ២០២៦ · ម៉ោង ៥:០០ ល្ងាច នៅ ${wedding.venue.name.km} ខេត្តកំពង់ស្ពឺ។`,
  },
  keywords:
    'wedding, invitation, Cambodia, Kampong Speu, Ear Kim Sreng, SamAng BorPhana, Sreng, Phana, អាពាហ៍ពិពាហ៍, មង្គលការ',
  imagePath: wedding.coverPhoto,
  /** Set after deploy for best social previews, e.g. https://your-domain.com */
  siteUrl: '',
}

function absoluteUrl(path) {
  const base =
    seo.siteUrl ||
    (typeof window !== 'undefined' ? window.location.origin : '')
  if (!base) return path
  return `${base.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([key, value]) => {
    if (value == null) return
    el.setAttribute(key, value)
  })
  return el
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

/** Sync document SEO for the current language. */
export function applySeo(lang = 'en') {
  const title = seo.title[lang] || seo.title.en
  const description = seo.description[lang] || seo.description.en
  const image = absoluteUrl(seo.imagePath)
  const url = absoluteUrl('/')

  document.title = title
  document.documentElement.lang = lang === 'km' ? 'km' : 'en'

  upsertMeta('meta[name="description"]', {
    name: 'description',
    content: description,
  })
  upsertMeta('meta[name="keywords"]', {
    name: 'keywords',
    content: seo.keywords,
  })
  upsertMeta('meta[name="author"]', {
    name: 'author',
    content: `${wedding.groom.fullName} & ${wedding.bride.fullName}`,
  })
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: 'index, follow',
  })

  upsertMeta('meta[property="og:type"]', {
    property: 'og:type',
    content: 'website',
  })
  upsertMeta('meta[property="og:site_name"]', {
    property: 'og:site_name',
    content: title,
  })
  upsertMeta('meta[property="og:locale"]', {
    property: 'og:locale',
    content: lang === 'km' ? 'km_KH' : 'en_US',
  })
  upsertMeta('meta[property="og:title"]', {
    property: 'og:title',
    content: title,
  })
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: description,
  })
  upsertMeta('meta[property="og:url"]', {
    property: 'og:url',
    content: url,
  })
  upsertMeta('meta[property="og:image"]', {
    property: 'og:image',
    content: image,
  })
  upsertMeta('meta[property="og:image:alt"]', {
    property: 'og:image:alt',
    content: `${wedding.groom.fullName} & ${wedding.bride.fullName} wedding invitation`,
  })

  upsertMeta('meta[name="twitter:card"]', {
    name: 'twitter:card',
    content: 'summary_large_image',
  })
  upsertMeta('meta[name="twitter:title"]', {
    name: 'twitter:title',
    content: title,
  })
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: description,
  })
  upsertMeta('meta[name="twitter:image"]', {
    name: 'twitter:image',
    content: image,
  })

  upsertLink('canonical', url)

  upsertJsonLd('seo-jsonld-event', {
    '@context': 'https://schema.org',
    '@type': 'Event',
    additionalType: 'https://en.wikipedia.org/wiki/Wedding',
    name: `Wedding of ${wedding.groom.fullName} & ${wedding.bride.fullName}`,
    description,
    image: [image],
    startDate: wedding.dateISO,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: wedding.venue.name.en,
      address: {
        '@type': 'PostalAddress',
        streetAddress: wedding.venue.en,
        addressLocality: 'Krong Chbar Mon',
        addressRegion: 'Kampong Speu',
        addressCountry: 'KH',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: wedding.venue.lat,
        longitude: wedding.venue.lng,
      },
    },
    organizer: [
      {
        '@type': 'Person',
        name: wedding.groom.fullName,
      },
      {
        '@type': 'Person',
        name: wedding.bride.fullName,
      },
    ],
    url,
  })
}
