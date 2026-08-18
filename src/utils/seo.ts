import type { Course, Faq, Instructor, Location } from '../data/types';
import { site } from '../data/site';
import { socials } from '../data/socials';

type JsonLd = Record<string, unknown>;

const ctx = { '@context': 'https://schema.org' };

function absolute(path: string): string {
  return `${site.url}${path}`;
}

/** Organization + SportsOrganization. */
export function buildOrganization(): JsonLd {
  const sameAs = [socials.facebook, socials.instagram].filter(Boolean);
  return {
    ...ctx,
    '@type': ['Organization', 'SportsOrganization'],
    '@id': absolute('/#organization'),
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    description: site.description,
    taxID: site.fiscalCode,
    legalName: site.legalName,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Aldo Moro 3/7',
      postalCode: '37066',
      addressLocality: 'Sommacampagna',
      addressRegion: 'VR',
      addressCountry: 'IT',
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** SportsActivityLocation per ciascuna sede. */
export function buildSportsActivityLocation(location: Location): JsonLd {
  return {
    ...ctx,
    '@type': 'SportsActivityLocation',
    '@id': absolute(`/#${location.slug}`),
    name: `${location.facility}`,
    url: absolute('/sedi/'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      postalCode: location.zip,
      addressLocality: location.city,
      addressRegion: location.province,
      addressCountry: 'IT',
    },
    provider: { '@id': absolute('/#organization') },
  };
}

/** Schema Course per una pagina sport. */
export function buildCourse(course: Course, locations: Location[]): JsonLd {
  const courseLocations = locations.filter((location) =>
    course.locations.includes(location.slug),
  );
  const locationRefs = courseLocations.map((location) => ({ '@id': absolute(`/#${location.slug}`) }));
  return {
    ...ctx,
    '@type': 'Course',
    '@id': absolute(`/sport/${course.slug}/#course`),
    name: `Corso di ${course.name} — ${site.name}`,
    description: course.description,
    provider: { '@id': absolute('/#organization') },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: 'PT1H',
      location: locationRefs,
    },
  };
}

/** Schema Person per un tecnico. */
export function buildInstructor(instructor: Instructor): JsonLd {
  return {
    ...ctx,
    '@type': 'Person',
    '@id': absolute(`/#instructor-${instructor.slug}`),
    name: instructor.name,
    ...(instructor.role ? { jobTitle: instructor.role } : {}),
    ...(instructor.grade ? { knowsAbout: `Arti marziali — ${instructor.grade}` } : {}),
    worksFor: { '@id': absolute('/#organization') },
  };
}

/** BreadcrumbList. */
export function buildBreadcrumbs(items: { name: string; path: string }[]): JsonLd {
  return {
    ...ctx,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

/** FAQPage — usare solo quando la pagina mostra realmente le FAQ. */
export function buildFaqPage(faqs: Faq[]): JsonLd {
  return {
    ...ctx,
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

/** WebSite (opzionale, per il futuro search action). */
export function buildWebsite(): JsonLd {
  return {
    ...ctx,
    '@type': 'WebSite',
    '@id': absolute('/#website'),
    name: site.name,
    url: site.url,
    inLanguage: site.lang,
    publisher: { '@id': absolute('/#organization') },
  };
}
