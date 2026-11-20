/*
 * Default site content, taken from CONTENT.md. Seeded into the CMS on first
 * start; editors change everything from /admin afterwards.
 * Values in [BRACKETS] are placeholders that must be replaced before launch.
 */
import { richText } from './lexical'

export const settings = {
  siteName: 'Click Group',
  tagline: "Engineering practical solutions for Africa's hospitals and homes.",
  defaultDescription:
    'Click Group builds safe handling equipment for healthcare facilities and prepaid smart metering for property owners in Tanzania.',
  contactEmail: 'info@clickgroup.co.tz',
  phone: '[+255 XXX XXX XXX]',
  whatsapp: '',
  address: 'Goba, Dar es Salaam, Tanzania',
  socialLinks: [],
  announcementBar: {
    enabled: false,
    text: 'Click Meter now supports water and gas meters',
    url: '/solutions/click-meter',
  },
}

export const header = {
  items: [
    { label: 'Home', url: '/', children: [] },
    { label: 'About', url: '/about', children: [] },
    {
      label: 'Solutions',
      url: '',
      children: [
        {
          label: 'Click Meter',
          url: '/solutions/click-meter',
          description: 'Prepaid electricity, water & gas metering',
        },
        {
          label: 'Mortuary Lift System',
          url: '/solutions/mortuary-lift',
          description: 'Remote-controlled hydraulic lifting',
        },
      ],
    },
    { label: 'News', url: '/news', children: [] },
    { label: 'Contact', url: '/contact', children: [] },
  ],
  ctaButton: { label: 'Get a Quote', url: '/contact' },
}

export const footer = {
  cta: {
    heading: 'Tell us about your property or your hospital.',
    label: 'Get a quote',
    url: '/contact',
  },
  about:
    'Click Group builds prepaid utility metering for property owners and lifting equipment for hospital mortuaries, from Ifakara, Tanzania.',
  columns: [
    {
      title: 'Solutions',
      links: [
        { label: 'Click Meter', url: '/solutions/click-meter' },
        { label: 'Mortuary Lift System', url: '/solutions/mortuary-lift' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Home', url: '/' },
        { label: 'About', url: '/about' },
        { label: 'News', url: '/news' },
        { label: 'Contact', url: '/contact' },
      ],
    },
  ],
  copyright: '© {year} Click Group. All rights reserved.',
  // Add Privacy Policy and Terms of Service here once those pages exist.
  legalLinks: [],
}

export const products = [
  {
    name: 'Click Meter',
    slug: 'click-meter',
    order: 1,
    icon: 'zap',
    tagline: 'Prepaid utilities without the disputes',
    shortDescription:
      'Prepaid electricity, water and gas metering for landlords and property managers. Tenants pay by mobile money and get tokens instantly by SMS.',
    overview: richText(
      'Stop chasing tenants for bills. With Click Meter every unit gets its own prepaid meter, every payment is recorded, and every token is delivered in seconds.',
      'Landlords and property managers see sales, usage and outstanding debts for every property from one web dashboard, while tenants top up any time from their phone.',
    ),
    features: [
      { icon: 'zap', title: 'Electricity, water & gas', text: 'One platform for all your meters.' },
      { icon: 'smartphone', title: 'Pay with mobile money', text: 'Tenants pay via LipaPay using a control number.' },
      { icon: 'message-square', title: 'Instant STS tokens', text: 'Tokens are generated automatically and sent by SMS.' },
      { icon: 'layout-dashboard', title: 'Landlord dashboard', text: 'See sales, usage, debts and reports per property.' },
      { icon: 'wallet', title: 'Debt recovery', text: 'Recover outstanding balances gradually from token sales.' },
    ],
    specs: [
      { label: 'Utilities', value: 'Electricity, water, gas' },
      { label: 'Token standard', value: 'STS' },
      { label: 'Payment', value: 'Mobile money via LipaPay control number' },
      { label: 'Token delivery', value: 'SMS' },
      { label: 'Management', value: 'Web dashboard: landlords, meters, sales, debts, reports' },
    ],
    useCases: [
      { text: 'Rental apartments and compounds' },
      { text: 'Hostels and student housing' },
      { text: 'Commercial plazas with multiple tenants' },
      { text: 'Estates and institutions with shared utilities' },
    ],
    faqs: [
      {
        question: 'How do tenants buy tokens?',
        answer:
          'Through mobile money using the control number provided. The token is generated and sent to them by SMS automatically.',
      },
      {
        question: 'Can I manage several properties?',
        answer: 'Yes. All your properties and meters are managed from one dashboard.',
      },
      {
        question: 'What if a tenant owes money?',
        answer: 'Debts can be recorded and recovered automatically from future token purchases.',
      },
      { question: 'Do you install the meters?', answer: '[Yes. Confirm installation coverage area.]' },
    ],
    ctaLabel: 'Request a demo',
  },
  {
    name: 'Mortuary Lift System',
    slug: 'mortuary-lift',
    order: 2,
    icon: 'heart-pulse',
    tagline: 'No more lifting by hand',
    shortDescription:
      'A remote-controlled hydraulic lift that removes manual lifting from mortuary work. Safer for staff, more dignified for the deceased.',
    overview: richText(
      'Moving bodies manually is one of the leading causes of back injury among mortuary and nursing staff. Our hydraulic lift does the heavy work while staff guide it by remote control.',
      'Built from corrosion-resistant, easy-to-sanitize materials, it moves precisely in both vertical and horizontal directions, reducing injuries, sick leave and long-term costs for hospitals.',
    ),
    features: [
      { icon: 'remote', title: 'Remote-controlled', text: 'Precise vertical and horizontal movement.' },
      { icon: 'sparkles', title: 'Hygienic by design', text: 'Corrosion-resistant, easy-to-sanitize materials.' },
      { icon: 'shield-check', title: 'Fewer injuries', text: 'Reduces musculoskeletal disorders and sick leave.' },
      { icon: 'trending-down', title: 'Lower long-term cost', text: 'Less absenteeism, faster handling, longer equipment life.' },
      { icon: 'heart-pulse', title: 'Dignified handling', text: 'Smooth, controlled movement every time.' },
    ],
    specs: [
      { label: 'Load capacity', value: '[XXX kg]' },
      { label: 'Lift range', value: '[XXX – XXX mm]' },
      { label: 'Control', value: 'Wireless remote' },
      { label: 'Materials', value: 'Corrosion-resistant, sanitizable [stainless steel?]' },
      { label: 'Power', value: '[Voltage / battery]' },
    ],
    useCases: [
      { text: 'Hospital mortuaries' },
      { text: 'District and regional health centres' },
      { text: 'Funeral homes' },
    ],
    faqs: [
      { question: 'Does it fit existing mortuary cabinets?', answer: '[Answer.]' },
      { question: 'Is training included?', answer: '[Answer.]' },
      { question: 'What maintenance is required?', answer: '[Answer.]' },
      { question: 'Is there a warranty?', answer: '[Answer.]' },
    ],
    ctaLabel: 'Request a quote',
  },
]

/** News posts. `cover` is a key of `images` below; the seeder turns it into coverImage. */
export const posts = [
  {
    title: 'Introducing Click Meter: prepaid utilities for rental properties',
    slug: 'introducing-click-meter',
    category: 'click-meter',
    author: 'Click Group team',
    publishedAt: '2026-11-12T09:00:00.000Z',
    cover: 'apartmentTower',
    excerpt:
      'Every rental unit gets its own prepaid meter for electricity, water or gas. Tenants pay with mobile money and landlords stop chasing bills.',
    body: richText(
      'Shared utility bills are one of the most common causes of disputes between landlords and tenants. One meter for a whole building means someone has to split the bill, and someone always feels they paid too much.',
      'Click Meter gives every unit its own prepaid meter. Tenants buy electricity, water or gas tokens with mobile money through LipaPay, using a control number. The token is generated automatically and arrives by SMS within seconds.',
      'Landlords see every payment, every unit of usage and any outstanding debt for each property from one dashboard. Nobody has to collect cash or argue about readings.',
    ),
  },
  {
    title: 'How tenants buy a token with mobile money',
    slug: 'how-to-buy-a-token',
    category: 'click-meter',
    author: 'Click Group team',
    publishedAt: '2026-11-05T09:00:00.000Z',
    cover: 'phoneHands',
    excerpt: 'Pay with LipaPay using your control number and receive your STS token by SMS.',
    body: richText(
      'Each Click Meter has a control number. To top up, the tenant pays that control number through LipaPay from their phone.',
      'As soon as the payment is confirmed, an STS token is generated and sent to the tenant by SMS. They enter the token on the meter keypad and the units are added.',
    ),
  },
  {
    title: 'What landlords see on the Click Meter dashboard',
    slug: 'click-meter-dashboard-for-landlords',
    category: 'click-meter',
    author: 'Click Group team',
    publishedAt: '2026-10-28T09:00:00.000Z',
    cover: 'landlordReports',
    excerpt: 'Sales, usage, debts and reports for every property, without collecting cash.',
    body: richText(
      'The landlord dashboard lists every token sale by unit and by property, with usage over time.',
      'Outstanding balances can be recovered gradually: a share of each new token purchase goes towards the debt until it is cleared.',
    ),
  },
  {
    title: 'Why manual lifting in mortuaries has to end',
    slug: 'why-manual-lifting-has-to-end',
    category: 'healthcare',
    author: 'Click Group team',
    publishedAt: '2026-10-20T09:00:00.000Z',
    cover: 'doctor',
    excerpt: 'Moving bodies by hand puts mortuary and nursing staff at risk of back injury.',
    body: richText(
      'Back and shoulder injuries are among the most common reasons healthcare workers take time off. In mortuaries, where bodies are still often moved by hand, the strain is repeated many times a day.',
      'The Click Group Mortuary Lift System is a hydraulic lift controlled by remote. Staff guide the movement instead of carrying the weight.',
    ),
  },
]

/** Posts from earlier versions of the defaults, removed on `seed:reset`. */
export const retiredPostSlugs = ['safer-mortuaries-healthier-staff']

/** Photos in src/seed/images, uploaded to Media by the seeder. Focal point is in % (face/subject). */
export const images = {
  doctor: { file: 'hero-doctor.jpg', alt: 'Smiling health worker in teal scrubs with a stethoscope', focalX: 52, focalY: 35 },
  womanPhone: { file: 'hero-woman-phone.jpg', alt: 'Woman at home using her phone', focalX: 57, focalY: 40 },
  phoneHands: { file: 'hero-phone-hands.jpg', alt: 'Hands holding a smartphone', focalX: 62, focalY: 50 },
  tenantHome: { file: 'solutions-tenant-home.jpg', alt: 'Woman and child in a bright kitchen at home', focalX: 42, focalY: 55 },
  apartments: { file: 'solutions-apartments.jpg', alt: 'Orange apartment building behind trees', focalX: 45, focalY: 50 },
  landlord: { file: 'solutions-landlord-dashboard.jpg', alt: 'Smiling man checking a tablet next to his laptop', focalX: 80, focalY: 22 },
  tenantKitchen: { file: 'click-meter-tenant-kitchen.jpg', alt: 'Two women talking in a home kitchen', focalX: 60, focalY: 40 },
  landlordLaptop: { file: 'click-meter-landlord-laptop.jpg', alt: 'Man in a suit working on a laptop at his desk', focalX: 55, focalY: 30 },
  apartmentTower: { file: 'news-apartment-tower.jpg', alt: 'Tall apartment building against a cloudy sky', focalX: 60, focalY: 55 },
  landlordReports: { file: 'news-landlord-reports.jpg', alt: 'Smiling man in a suit holding a sheet of paper at his laptop', focalX: 45, focalY: 35 },
  teamOffice: { file: 'impact-team-office.jpg', alt: 'Man in a hat and long coat standing in a busy office', focalX: 45, focalY: 30 },
  serveKitchen: { file: 'serve-kitchen-wide.jpg', alt: 'Two women talking and laughing in a home kitchen', focalX: 55, focalY: 35 },
  apartmentsWide: { file: 'about-apartments-wide.jpg', alt: 'Orange apartment building between trees in evening light', focalX: 35, focalY: 45 },
  tenantWide: { file: 'click-meter-tenant-wide.jpg', alt: 'Woman at the counter of her bright kitchen at home', focalX: 25, focalY: 45 },
  landlordWide: { file: 'click-meter-landlord-wide.jpg', alt: 'Smiling man in glasses looking down at his tablet', focalX: 70, focalY: 40 },
  meter: { file: 'click-meter-prepaid-meter.jpg', alt: 'Prepaid electricity meter with keypad mounted on a wall', focalX: 75, focalY: 50 },
}

type Id = number | string
type MediaIds = Record<keyof typeof images, Id>

/** Photos and photo-dependent sections for each solution page, keyed by product slug. */
export const productMedia = (media: MediaIds): Record<string, Record<string, unknown> & { featureImages?: Id[] }> => ({
  'click-meter': {
    heroImage: media.womanPhone,
    heroSecondaryImage: media.meter,
    // In the same order as the product's features
    featureImages: [media.meter, media.phoneHands, media.tenantKitchen, media.landlordLaptop, media.apartments],
    newsCategory: 'click-meter',
    journeys: [
      {
        title: 'For tenants: top up in seconds',
        intro: 'No cash, no queue and no waiting for the landlord.',
        image: media.tenantWide,
        cardOnRight: true,
        steps: [
          { title: 'Find your control number', text: 'Every meter has its own control number.' },
          { title: 'Pay with mobile money', text: 'Pay that control number through LipaPay from your phone.' },
          { title: 'Receive your token by SMS', text: 'The STS token arrives within seconds of payment.' },
          { title: 'Enter it on the meter', text: 'Type the token on the keypad and the units are added.' },
        ],
      },
      {
        title: 'For landlords: every payment on record',
        intro: 'All your properties and meters in one web dashboard.',
        image: media.landlordWide,
        cardOnRight: false,
        steps: [
          { title: 'One meter per unit', text: 'Each unit pays for what it uses. No more splitting one bill.' },
          { title: 'See every sale', text: 'Token sales and usage for each unit and each property.' },
          { title: 'Recover debts automatically', text: 'A share of each new token goes towards what a tenant owes.' },
          { title: 'Reports when you need them', text: 'Download reports for each property from the dashboard.' },
        ],
      },
    ],
  },
  'mortuary-lift': {
    newsCategory: 'healthcare',
  },
})

/** Pages are built from blocks; product and media relations are filled in by the seeder. */
export const pages = (productIds: Id[], media: MediaIds) => [
  {
    title: 'Home',
    slug: 'home',
    seo: {
      metaTitle: 'Click Group | Prepaid utility meters and mortuary lifts, Tanzania',
      metaDescription:
        'Safe handling equipment for healthcare facilities and prepaid smart metering for property owners, designed and supported in Tanzania.',
    },
    layout: [
      {
        blockType: 'hero',
        heading: 'Prepaid meters for landlords. Lifting equipment for hospitals.',
        subheading:
          'Click Group is an engineering company in Ifakara, Tanzania. We build two products: one that makes utility billing fair for property owners and tenants, and one that keeps hospital staff from injuring themselves at work.',
        primaryCta: { label: 'See our products', url: '#solutions' },
        secondaryCta: { label: '', url: '' },
        highlights: [
          {
            title: 'Click Meter',
            url: '/solutions/click-meter',
            text: 'Tenants buy electricity, water and gas tokens with mobile money.',
          },
          {
            title: 'Mortuary Lift System',
            url: '/solutions/mortuary-lift',
            text: 'Staff move bodies by remote control instead of lifting by hand.',
          },
        ],
        image: media.doctor,
        secondaryImage: media.womanPhone,
        inset: {
          title: 'No health worker should injure themselves lifting a body by hand.',
          text: 'Our mission',
        },
        tags: [],
        // Shown only when filled in. Add a real figure, e.g. meters installed.
        stat: { value: '', label: '' },
      },
      {
        blockType: 'logos',
        heading: 'Backed and trusted by',
        logos: [
          { name: '[Accelerator]' },
          { name: '[Partner hospital]' },
          { name: 'LipaPay' },
          { name: '[Partner]' },
        ],
      },
      {
        blockType: 'introAccordion',
        headingMuted: 'We started with one problem in hospitals.',
        heading: 'Now we solve two.',
        body: 'Our first product came from one problem: mortuary staff injuring their backs lifting bodies by hand. We then applied the same approach to utility billing, where landlords chase payments and tenants dispute their bills.',
        linkCard: {
          lead: 'Learn more about our story',
          title: 'How Click Group started',
          url: '/about',
          image: media.doctor,
        },
        items: [
          {
            icon: 'hospital',
            title: 'Mortuary Lift System',
            text: 'A remote-controlled hydraulic lift that moves bodies up, down and across, so staff no longer lift by hand. Built from corrosion-resistant materials that are easy to clean.',
          },
          {
            icon: 'zap',
            title: 'Click Meter',
            text: 'Prepaid meters for electricity, water and gas, one per rental unit. Tenants pay with mobile money and get their token by SMS. Landlords see every payment online.',
          },
          {
            icon: 'map-pin',
            title: 'Based in Dar es Salaam',
            text: 'Our head office is in Goba, Dar es Salaam, Tanzania. Get in touch to arrange a demo or a quote for your property or hospital.',
          },
        ],
      },
      {
        blockType: 'bento',
        anchor: 'solutions',
        heading: 'Our products',
        intro: 'Click Meter for property owners and tenants. The Mortuary Lift System for hospitals.',
        slides: [
          {
            image: media.tenantHome,
            title: 'Click Meter',
            text: 'Prepaid electricity, water and gas for rental homes. Tenants top up with mobile money and get their token by SMS.',
            link: { label: 'Explore Click Meter', url: '/solutions/click-meter' },
          },
          {
            // Placeholder photo: replace with a real healthcare or lift photo.
            image: media.doctor,
            title: 'Mortuary Lift System',
            text: 'A remote-controlled hydraulic lift, so hospital staff never have to lift a body by hand.',
            link: { label: 'Explore the lift', url: '/solutions/mortuary-lift' },
          },
        ],
        cards: [
          {
            type: 'fact',
            label: 'One meter platform',
            value: 'Electricity, water and gas',
            text: 'Each rental unit gets its own prepaid meter, topped up with mobile money.',
          },
          { type: 'photo', image: media.apartments },
          {
            type: 'feature',
            image: media.landlord,
            label: 'For landlords',
            value: 'See every payment without chasing tenants.',
            text: 'Sales, usage and debts for each property in one web dashboard.',
            link: { label: 'How Click Meter works', url: '/solutions/click-meter' },
          },
        ],
      },
      {
        blockType: 'spotlight',
        heading: 'Prepaid utilities without the disputes',
        body: 'Stop chasing tenants for bills. Every unit gets its own prepaid meter, every payment is recorded, and every token is delivered in seconds.',
        image: media.meter,
        features: [
          { title: 'Electricity, water and gas', text: 'One platform for all your meters.', image: media.meter },
          { title: 'Pay with mobile money', text: 'Tenants pay via LipaPay using a control number.', image: media.phoneHands },
          { title: 'Instant tokens by SMS', text: 'STS tokens are generated automatically and sent by SMS.', image: media.tenantKitchen },
          { title: 'Landlord dashboard', text: 'See sales, usage, debts and reports for each property.', image: media.landlordLaptop },
          { title: 'Debt recovery', text: 'Recover outstanding balances gradually from token sales.', image: media.landlord },
        ],
        cta: { label: 'Request a demo', url: '/contact?product=click-meter' },
      },
      {
        blockType: 'spotlight',
        heading: 'No more lifting by hand',
        // Stand-in until there is a real lift or mortuary photo (one per feature is best).
        image: media.doctor,
        body: 'Moving bodies manually is one of the leading causes of back injury among mortuary and nursing staff. Our hydraulic lift does the heavy work while staff guide it by remote control.',
        imageOnLeft: true,
        features: products[1].features.map(({ title, text }) => ({ title, text })),
        cta: { label: 'Request a quote', url: '/contact?product=mortuary-lift' },
      },
      {
        blockType: 'stats',
        anchor: 'impact',
        heading: 'Built around the people who use it',
        intro:
          'Tenants who want to pay only for what they use. Landlords who want every payment recorded. Mortuary staff who should never have to lift a body by hand. We design, install and support every system ourselves, from our base in Ifakara.',
        image: media.teamOffice,
        cta: { label: 'More about us', url: '/about' },
        stats: [
          { value: '[XXX]+', label: 'Meters installed' },
          { value: '[XX,XXX]+', label: 'Tokens delivered' },
          { value: '[X]', label: 'Healthcare facilities equipped' },
        ],
      },
      {
        blockType: 'cards',
        anchor: 'who-we-serve',
        heading: 'Who we serve',
        intro: 'Two products, built for the people who use them every day.',
        image: media.serveKitchen,
        cards: [
          {
            icon: 'building',
            title: 'Landlords and property managers',
            text: 'Every unit on its own prepaid meter. See each payment online and recover debts without collecting cash.',
          },
          {
            icon: 'home',
            title: 'Tenants',
            text: 'Pay only for what you use. Top up electricity, water or gas from your phone whenever you need to.',
          },
          {
            icon: 'hospital',
            title: 'Hospitals and health centres',
            text: 'A remote-controlled lift for the mortuary, so staff no longer move bodies by hand.',
          },
        ],
        cta: { label: 'Talk to us', url: '/contact' },
      },
      {
        blockType: 'testimonials',
        heading: 'What our customers say',
        items: [
          { quote: '[Quote from a landlord using Click Meter.]', name: '[Name]', role: 'Landlord', organization: '[Town]' },
          { quote: '[Quote from mortuary/nursing staff using the lift.]', name: '[Name]', role: '[Role]', organization: '[Hospital]' },
        ],
      },
      { blockType: 'latestNews', heading: 'News and updates', intro: 'Product news and guides from the Click Group team.', count: 4 },
      {
        blockType: 'faq',
        heading: 'Frequently asked questions',
        intro:
          'Short answers about Click Meter and the Mortuary Lift System. If your question is not here, ask us directly.',
        cta: { label: 'Ask a question', url: '/contact' },
        items: [
          {
            question: 'How do tenants buy electricity, water or gas tokens?',
            answer:
              "With mobile money through LipaPay, using the meter's control number. The token is generated automatically and sent by SMS within seconds.",
          },
          {
            question: 'Can I manage several properties from one account?',
            answer:
              'Yes. All your properties and meters are in one dashboard, with sales, usage and debts for each unit.',
          },
          {
            question: 'What happens if a tenant owes money?',
            answer: 'The debt is recorded and recovered gradually from their future token purchases.',
          },
          {
            question: 'What is the Mortuary Lift System?',
            answer:
              'A hydraulic lift operated by remote control. It raises and moves bodies so mortuary and nursing staff do not have to lift them by hand.',
          },
          {
            question: 'Where is Click Group based?',
            answer:
              'Our head office is in Goba, Dar es Salaam, Tanzania. We design, install and support our systems ourselves.',
          },
          {
            question: 'How do I get a quote?',
            answer:
              'Send us a message through the contact page and tell us about your property or facility. We will get back to you with the details.',
          },
        ],
      },
    ],
  },
  {
    title: 'About',
    slug: 'about',
    seo: {
      metaTitle: 'About Click Group',
      metaDescription: 'Practical engineering from Ifakara, Tanzania: safer workplaces and fairer utility services.',
    },
    layout: [
      {
        blockType: 'hero',
        heading: 'Engineering for hospitals and homes, from Ifakara.',
        subheading:
          'Click Group designs, builds and supports two products in Tanzania: a remote-controlled lift that ends manual lifting in mortuaries, and prepaid meters that make utility bills fair for landlords and tenants.',
        primaryCta: { label: 'See our products', url: '/#solutions' },
        secondaryCta: { label: '', url: '' },
        highlights: [
          { title: 'Our story', url: '#story', text: 'How a problem in hospital mortuaries started the company.' },
          { title: 'How we work', url: '#how-we-work', text: 'We design, build, install and support every system ourselves.' },
        ],
        image: media.teamOffice,
        secondaryImage: media.meter,
        inset: { title: 'Safe work for hospital staff. Fair bills for tenants.', text: 'What we believe' },
        tags: [],
      },
      {
        blockType: 'stats',
        anchor: 'story',
        heading: 'How Click Group started',
        intro:
          'Click Group began in Ifakara with one problem: mortuary and nursing staff were moving bodies by hand and injuring their backs. We built a remote-controlled hydraulic lift so they no longer have to. With the backing of an accelerator programme, we then took the same approach to another everyday problem, utility bills that landlords and tenants argue about. That became Click Meter.',
        image: media.doctor,
        cta: { label: 'See the Mortuary Lift System', url: '/solutions/mortuary-lift' },
        stats: [],
      },
      {
        blockType: 'cards',
        anchor: 'values',
        heading: 'What drives us',
        intro: 'Reliable technology, supported locally, that keeps workers safe and makes essential services fair.',
        image: media.apartmentsWide,
        cards: [
          { icon: 'shield-check', title: 'Safety first', text: 'People come before machines. Every product starts with the person who uses it.' },
          { icon: 'wrench', title: 'Built for here', text: 'Designed for local conditions, installed and supported by our own team.' },
          { icon: 'gauge', title: 'Transparency', text: 'Clear data and clear bills, so nobody has to guess what they paid for.' },
          { icon: 'heart-pulse', title: 'Dignity', text: 'In how we treat the people we work with, and how the deceased are handled.' },
        ],
      },
      {
        blockType: 'steps',
        anchor: 'how-we-work',
        heading: 'How we work',
        intro: 'From the first visit to years of use, one team is responsible for your system.',
        steps: [
          { title: 'Understand the site', text: 'We visit the hospital or property and look at how the work is done today.' },
          { title: 'Design and build', text: 'We design each system for local conditions and build it ourselves.' },
          { title: 'Install', text: 'Our team installs the lift or the meters and shows staff, landlords and tenants how to use them.' },
          { title: 'Support', text: 'We maintain and support every system we install.' },
        ],
      },
      {
        blockType: 'team',
        heading: 'Meet the team',
        intro: 'The people designing, building and supporting our solutions.',
        members: [
          { name: '[Name]', role: 'Founder & CEO' },
          { name: '[Name]', role: 'Head of Engineering' },
          { name: '[Name]', role: 'Operations' },
          { name: '[Name]', role: 'Software Lead' },
        ],
      },
    ],
  },
  {
    title: 'Contact',
    slug: 'contact',
    seo: {
      metaTitle: 'Contact Click Group',
      metaDescription: 'Get a quote for Click Meter or the Mortuary Lift System.',
    },
    layout: [
      {
        blockType: 'contact',
        heading: "Let's talk",
        text: 'Tell us what you need and our team will get back to you within one business day.',
        interests: [
          { label: 'Click Meter' },
          { label: 'Mortuary Lift System' },
          { label: 'Partnership' },
          { label: 'Other' },
        ],
        offices: [
          {
            name: 'Head Office',
            address: 'Goba, Dar es Salaam, Tanzania',
            phone: '[+255 XXX XXX XXX]',
            email: 'info@clickgroup.co.tz',
            hours: 'Mon–Fri 08:00–17:00',
          },
        ],
        successMessage: "Thank you! We've received your message and will be in touch soon.",
      },
    ],
  },
]
