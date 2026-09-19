export default {
  menu: {
    home: 'Home',
    experience: 'Experience',
    projects: 'Projects',
  },
  controls: {
    languageLabel: 'Language',
    downloadCv: 'Download CV',
  },
  hero: {
    title: 'Hi, I am a Frontend Developer',
    subtitle:
      'I build fast and user-friendly interfaces. Here you will find my experience, projects, and contacts.',
    name: 'Denis Bagmet',
    role: 'Mobile Developer',
    secondaryRole: 'iOS / Flutter',
    about:
      'iOS, Flutter, AppSec, and a love for hard problems. Where others see a bug, I see an interesting engineering challenge.',
  },
  home: {
    latestProjectsTitle: 'Latest work',
    selectedProjectsTitle: 'Selected projects',
    latestProjectsCta: 'View all projects',
    featuredCaseEyebrow: 'Featured case',
    featuredCaseTitle: 'The Tone of Victory',
    featuredCaseLead:
      'An iOS project for TAG Heuer, connected to Formula 1 and the launch of a limited TAG Heuer Connected edition. The project included a premium interface, localized content, video and audio scenarios, and a real stand launch in South Korea.',
    featuredCaseFacts: {
      clientLabel: 'Client',
      clientValue: 'TAG Heuer, the Swiss watch Maison within Louis Vuitton Moet Hennessy (LVMH).',
      formatLabel: 'Format',
      formatValue: 'An iOS app for a presentation stand and international launch of a branded Formula 1 project.',
      stackLabel: 'Stack',
      stackValue: 'Swift, SwiftUI, localization, video and audio handling, and a stable interface for a stand-based scenario.',
    },
    featuredCaseStand: {
      title: 'Stand photos',
      description: 'Real photos of the stand with the app running. They show that the project was used not only as an interface, but also as part of an offline brand presentation.',
      meta: 'Seoul / Spring 2025 / presentation stand',
    },
    socialsTitle: 'Get in touch',
    stats: {
      title: 'Portfolio Snapshot',
      totalProjects: 'Total projects',
      mobileProjects: 'Mobile projects',
      desktopProjects: 'Desktop and desktop-first work',
    },
    socials: {
      github: 'GitHub',
      telegram: 'Telegram',
      vk: 'VK',
      email: 'Email',
    },
    contactCard: {
      title: 'Contacts',
      subtitle: 'Open to interesting projects, collaborations, and good conversations.',
      items: [
        {
          key: 'telegram',
          label: 'Telegram',
          value: '@Debug0',
          href: 'https://t.me/Debug0'
        },
        {
          key: 'instagram',
          label: 'Instagram',
          value: '@instagram',
          href: 'https://www.instagram.com/bagmet__denis'
        },
        {
          key: 'vk',
          label: 'VK',
          value: 'vk.com/debug0',
          href: 'https://vk.com/debug0'
        },
        {
          key: 'email',
          label: 'Email',
          value: 'dnsbagmet@gmail.com',
          href: 'mailto:dnsbagmet@gmail.com'
        }
      ]
    }
  },
  experience: {
    name: 'Bagmet Denis',
    headline: 'Mobile developer whose job is also his hobby.',
    segments: {
      personal: 'Personal',
      education: 'Education',
      contact: 'Contact',
      experience: 'Experience',
    },
    sections: {
      personal: 'Personal',
      education: 'Education',
      contact: 'Contact',
      experience: 'Experience Timeline',
    },
    personal: [
      { key: 'name', label: 'Name', value: 'Denis Aleksandrovich Bagmet' },
      { key: 'birth', label: 'Date of Birth', value: '16 March 1999 (27)' },
      { key: 'location', label: 'City of Residence', value: 'Rostov-on-Don' },
      { key: 'university', label: 'University', value: 'Donetsk National University' },
      { key: 'specialty', label: 'Specialty', value: '09.03.01 Computer Science and Engineering' },
      { key: 'educationLevel', label: 'Education', value: "Bachelor's degree completed, currently on academic leave from the Master's program" },
      {
        key: 'languages',
        label: 'Languages',
        value: ['Ukrainian', 'Russian', 'English']
      }
    ],
    skillsCard: {
      title: 'Skills & Stack',
      expanded: {
        show: 'Show',
        hide: 'Hide'
      },
      categories: [
        {
          key: 'mobile',
          label: 'Mobile Development',
          items: ['Swift', 'SwiftUI', 'UIKit', 'Flutter', 'Dart', 'Kotlin', 'Jetpack Compose', 'iOS SDK', 'Android SDK']
        },
        {
          key: 'programmingLanguages',
          label: 'Programming Languages',
          items: ['Dart', 'Swift', 'JavaScript', 'TypeScript', 'Python']
        },
        {
          key: 'frameworks',
          label: 'Frameworks & Patterns',
          items: ['SwiftUI', 'UIKit', 'Flutter', 'AVFoundation', 'StoreKit', 'Combine', 'async/await', 'MVVM', 'BLoC', 'Riverpod', 'REST API', 'GraphQL']
        },
        {
          key: 'backendPayments',
          label: 'Backend & Payments',
          items: ['Node.js', 'Express.js', 'TypeScript', 'REST API', 'WebSocket', 'Stripe', 'YooKassa', 'In-App Purchases', 'Google Play Billing']
        },
        {
          key: 'databases',
          label: 'Databases & Storage',
          items: ['SQLite', 'Core Data', 'Hive', 'Drift', 'Firebase', 'PostgreSQL', 'MongoDB', 'Redis']
        },
        {
          key: 'toolsDev',
          label: 'Development Tools',
          items: ['Xcode', 'Android Studio', 'Visual Studio Code', 'Cursor', 'PyCharm', 'Git', 'GitLab', 'Docker', 'Postman', 'Figma', 'TestFlight', 'App Store Connect', 'Proxyman']
        },
        {
          key: 'toolsTraffic',
          label: 'Traffic Analysis',
          items: ['Postman', 'Proxyman', 'Burp Suite', 'Charles Proxy']
        },
        {
          key: 'toolsReverse',
          label: 'Reverse Engineering & Dynamic Analysis',
          items: ['Frida', 'Objection', 'Jadx', 'apktool', 'Ghidra', 'Hopper', 'MobSF']
        }
      ]
    },
    factsCard: {
      title: 'Interesting Facts',
      expanded: {
        show: 'Show countries',
        hide: 'Hide countries',
        title: 'Countries and regions'
      },
      items: [
        {
          key: 'travel',
          label: 'Travel',
          value: 'I love traveling and collecting new impressions.',
          note: 'I post travel photos and small notes on Instagram.',
          link: {
            label: 'Instagram',
            href: 'https://www.instagram.com/bagmet__denis'
          },
          countries: [
            { name: 'Azerbaijan', flag: '/flags/azerbaijan.svg' },
            { name: 'China', flag: '/flags/china.svg' },
            { name: 'Egypt', flag: '/flags/egypt.svg' },
            { name: 'Georgia', flag: '/flags/georgia.svg' },
            { name: 'Hong Kong', flag: '/flags/hong kong.svg' },
            { name: 'Israel', flag: '/flags/israel.svg' },
            { name: 'Kazakhstan', flag: '/flags/kazakhstan.svg' },
            { name: 'Macao', flag: '/flags/macao.svg' },
            { name: 'Malaysia', flag: '/flags/malaysia.svg' },
            { name: 'Montenegro', flag: '/flags/montenegro.svg' },
            { name: 'North Korea', flag: '/flags/north korea.svg' },
            { name: 'Palestine', flag: '/flags/palestine.svg' },
            { name: 'Russia', flag: '/flags/russia.svg' },
            { name: 'South Korea', flag: '/flags/south korea.svg' },
            { name: 'Turkey', flag: '/flags/turkey.svg' },
            { name: 'Ukraine', flag: '/flags/ukraine.svg' },
            { name: 'Uzbekistan', flag: '/flags/uzbekistan.svg' },
            { name: 'United Arab Emirates', flag: '/flags/united arab emirates.svg' }
          ]
        },
        {
          key: 'graffiti',
          label: 'Hobby',
          value: 'I enjoy drawing and graffiti.'
        }
      ]
    },
    education: [{ label: 'Main focus', value: 'Self-education, practical commercial development, and security research.' }],
    contact: [
      { label: 'Location', value: 'Available remotely' },
      { label: 'Email', value: 'dnsbagmet@gmail.com' },
      { label: 'Telegram', value: '@Debug0' },
    ],
    items: [
      {
        company: 'Adlíbis',
        title: 'Flutter Developer',
        period: 'August 2023 — Present',
        duration: '2 years 11 months',
        description:
          'Full-cycle development of production Flutter applications for iOS and Android: architecture, new products, backend/API integrations, releases, stability, and ongoing product development.',
        stack: ['Flutter', 'Dart', 'REST API', 'Dio', 'Firebase', 'BLoC', 'Riverpod', 'Drift', 'Hive', 'WebSocket', 'BLE', 'Deep Links', 'Platform Channels', 'CI/CD'],
        bullets: [
          'Designed application architecture and built product flows, authentication and refresh token logic, offline/cache scenarios, deep links, real-time communication, and local storage.',
          'Integrated Firebase Crashlytics, Analytics, FCM, and Auth; used post-release observability to identify and eliminate production failures.',
          'Implemented BLE, push notifications, and platform-specific functionality through MethodChannel / Platform Channels.',
          'Optimized UI responsiveness, memory usage, networking, and maintainability while reducing technical debt.',
          'Prepared and shipped production releases through TestFlight, App Store Connect, and Google Play; contributed to CI/CD and technical design.',
        ],
        achievements: [
          'Built and shipped 10+ production mobile applications for iOS and Android across luxury, sport, BLE/IoT, inventory management, and service products.',
          'Improved crash-free users from ~80% to 99%+ through Crashlytics, post-release monitoring, and systematic work on critical failures.',
          'Implemented BLE and native Android/iOS integrations through MethodChannel / Platform Channels.',
          'Improved architecture and code maintainability through refactoring and technical-debt reduction.',
        ],
        highlight: {
          label: 'Key international project',
          text: 'The Tone of Victory is an iOS project for TAG Heuer, a Louis Vuitton (LVMH) brand, tied to Formula 1 and a limited TAG Heuer Connected edition. The offline presentation-stand app launched in several countries, including South Korea.',
        },
        links: [{ label: 'Portfolio (projects)', href: '/projects' }],
      },
      {
        company: 'APP BOX EOOD',
        title: 'Full-stack Developer',
        period: 'September 2023 — March 2026',
        duration: '2 years 7 months',
        description:
          'Led Teleprompter Automatic as a full-stack developer across iOS, Android, backend, web panel, payments, internal libraries, testing, integrations, and releases.',
        stack: ['Swift', 'SwiftUI', 'UIKit', 'AVFoundation', 'StoreKit', 'Kotlin', 'Jetpack Compose', 'Node.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Vue.js', 'Stripe', 'YooKassa', 'Firebase', 'Flask'],
        bullets: [
          'Developed a commercial video recording and editing product with a teleprompter, subscriptions, backend services, and a web panel for an international audience.',
          'Built iOS media workflows with AVFoundation / AVKit: recording, preview, playback, video processing, export, editing tools, animated text, and the teleprompter engine.',
          'Optimized heavy capture scenarios: smooth high-FPS text scrolling during 4K recording, real-time filters, and background segmentation.',
          'Integrated StoreKit / In-App Purchases and Google Play Billing for subscriptions, lifetime access, purchase restoration, entitlement checks, and premium-status synchronization with the backend.',
          'Built the backend with Node.js / Express.js / TypeScript: REST APIs, authentication, file uploads, user sessions, purchases, subscriptions, Apple Server Notifications, and payment webhooks.',
          'Connected web payments through Stripe and YooKassa: checkout, payment account, renewals, subscription cancellation, and payment-status handling.',
          'Developed a Vue.js web panel and a separate Flask backend for a feedback, error-reporting, and user-support library.',
        ],
        achievements: [
          'Grew the product into a complete ecosystem: iOS, Android, iPad, Apple Watch, web panel, and backend.',
          'Published the app in the App Store and Google Play as a commercial subscription-based product.',
          'Reached tens of thousands of downloads per month and hundreds of thousands per year; the Android version passed 100,000+ installs with an approximately 4.6 rating.',
          'Implemented the product payment infrastructure: in-app purchases, web payments, webhooks, renewals, purchase restoration, and subscription synchronization.',
          'Delivered the complex media layer: 4K recording, smooth teleprompter playback, video editor, real-time filters, segmentation, animated text, and video export.',
        ],
        highlight: {
          label: 'Product full-stack',
          text: 'Teleprompter Automatic became a commercial subscription ecosystem with mobile apps, a web/backend platform, payments, a media pipeline, and international localization across 30 languages.',
        },
        links: [{ label: 'Teleprompter Automatic case', href: '/projects' }],
      },
      {
        company: 'Independent Contractor / Startup & Product Projects',
        title: 'Senior Mobile Engineer (iOS / Flutter / Backend)',
        period: 'October 2019 — June 2025',
        duration: '5 years 9 months',
        description:
          'Built mobile products for clients and startups in the US, Europe, and MENA: native iOS applications, Flutter products, and backend services from MVP to production.',
        stack: ['Swift', 'SwiftUI', 'UIKit', 'Flutter', 'Dart', 'Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'MongoDB', 'WebSocket', 'WebRTC', 'AVFoundation', 'CI/CD'],
        bullets: [
          'Owned full-cycle mobile development: MVP, architecture, UI, API integrations, real-time functionality, testing, CI/CD, releases, and support.',
          'Designed Node.js / Express.js backends with REST APIs, business logic, authentication, subscriptions, push notifications, and web admin panels.',
          'Worked with PostgreSQL, Redis, and MongoDB on caching, real-time flows, and backend performance.',
          'Solved complex video processing, live-streaming, WebSocket/WebRTC, media pipeline, and document-management tasks.',
          'Led a small team through technical design, code review, task breakdown, and delivery.',
        ],
        achievements: [
          'Built and shipped 30+ mobile products for iOS, Android, macOS, and watchOS, from MVPs to production-ready solutions.',
          'Launched products across 10+ countries, including a marketplace, private aviation platform, and real-time messenger for the US market.',
          'Delivered production-ready mobile architecture, backend APIs, and real-time functionality for complex consumer and startup products.',
        ],
        highlight: {
          label: 'Project range',
          text: 'An Avito-like marketplace, a private-aircraft booking platform, and a real-time messenger for the US market, plus media and business tools launched across multiple countries.',
        },
        links: [{ label: 'Portfolio (projects)', href: '/projects' }],
      },
      {
        company: 'DMT (Skolkovo / Industrial Video Systems)',
        title: 'Flutter Developer',
        period: 'October 2024 — May 2025',
        duration: '8 months',
        description:
          'Built a Flutter application for industrial personal video recorders used in energy, mining, oil and gas, and hazardous environments.',
        stack: ['Flutter', 'Dart', 'Dio', 'REST API', 'VLC Player', 'Video Streaming', 'Camera', 'Wi-Fi', 'File Management', 'Crypto', 'Firebase'],
        bullets: [
          'Implemented recorder connectivity, data retrieval, and device controls for recording, status, files, and screenshots.',
          'Built live video streaming, photo/video archive browsing, local storage, media processing, and content export.',
          'Integrated Firebase Crashlytics / Analytics and post-release monitoring.',
        ],
        achievements: [
          'Built the complete mobile application for the company’s industrial personal video recorders.',
          'Delivered real-time video streaming, recording controls, and photo/video archive workflows.',
          'Created a stable enterprise workflow for reliability-critical industrial scenarios.',
        ],
      },
      {
        company: 'ProStor.ae (UAE e-commerce grocery delivery)',
        title: 'Flutter Developer',
        period: 'April 2024 — May 2025',
        duration: '1 year 2 months',
        description:
          'Served as the sole Flutter developer for a production e-commerce platform in the UAE, owning architecture, product flows, releases, and technical development.',
        stack: ['Flutter', 'Dart', 'GraphQL', 'REST API', 'Dio', 'BLoC', 'Firebase', 'Deep Links', 'SQLite', 'Hive', 'WebSocket', 'CI/CD'],
        bullets: [
          'Built catalog, search, checkout, order and delivery flows, authentication, profile, push notifications, and engagement features.',
          'Integrated REST APIs and GraphQL, refresh token flows, error handling, and offline/cache scenarios.',
          'Handled deep links, navigation flows, and complex loading, empty, error, and edge-case states.',
          'Optimized UI, networking, and release stability while collaborating with backend, design, and product stakeholders.',
        ],
        achievements: [
          'Maintained and developed a production e-commerce application with 3,000+ SKUs and delivery across the UAE.',
          'As the sole Flutter developer, owned the full mobile delivery lifecycle from implementation to App Store and Google Play releases.',
          'Evolved the mobile architecture and reduced product technical debt.',
        ],
        links: [{ label: 'Portfolio project', href: '/projects' }],
      },
      {
        company: 'TAG Heuer / LVMH — The Tone of Victory',
        title: 'iOS Developer',
        period: 'January 2025 — March 2025',
        duration: '3 months',
        description:
          'Built the native iPadOS application The Tone of Victory for TAG Heuer Formula 1 events, combining local media content, multilingual flows, interactive behavior, and kiosk-style operation.',
        stack: ['Swift', 'SwiftUI', 'AVFoundation', 'AVKit', 'AVAudioSession', 'Combine', 'XCTest', 'XCUITest', 'String Catalogs', 'LocalizedStringKey', 'MDM / Single App Mode'],
        bullets: [
          'Designed the main application flow: navigation, animated transitions, media-content control, and playback-state handling.',
          'Worked with AVFoundation / AVKit on play, pause, replay, transitions between media, state restoration, and correct behavior across screen changes.',
          'Handled AVAudioSession scenarios: different headphones, audio route changes, interruptions, and iOS limitations around selecting a specific output device.',
          'Prepared a multilingual version for multiple markets, including Korean, Japanese, English, French, German, Spanish, Arabic, and Chinese.',
          'Accounted for MDM / Single App Mode and offline usage: the app had to run in a restricted environment without network dependency during the event flow.',
          'Ran integration testing for key scenarios and contributed to release-build preparation, bug fixing, and App Store publication.',
        ],
        achievements: [
          'Published the app in the App Store under TAG Heuer Professional Timing / LVMH Swiss Manufactures SA.',
          'The solution was used in an international TAG Heuer event series across multiple markets.',
          'Closed key launch risks before release: media playback, external audio-device behavior, offline operation, and integration coverage for the main flows.',
        ],
        highlight: {
          label: 'Premium brand experience',
          text: 'The Tone of Victory combined racing video, sound, imagery, copy, multilingual content, and interactive behavior for TAG Heuer / LVMH iPad installations.',
        },
        links: [{ label: 'The Tone of Victory case', href: '/projects' }],
      },
      {
        company: 'Mobile Business Solutions (MobSolutions)',
        title: 'Mobile Developer (iOS / Flutter)',
        period: 'August 2021 — June 2023',
        duration: '1 year 11 months',
        description:
          'Built native iOS applications with Swift / SwiftUI and Flutter applications for iOS and Android across the full cycle from architecture to publication.',
        stack: ['Swift', 'SwiftUI', 'UIKit', 'Flutter', 'Dart', 'REST API', 'Firebase', 'MVVM', 'BLoC', 'WebSocket', 'Payment Systems', 'Maps SDK', 'Platform Channels'],
        bullets: [
          'Built UI, business logic, and backend/API integrations with attention to platform guidelines, responsiveness, and user experience.',
          'Worked with async/await, completion handlers, Streams, background processes, push notifications, and deep links.',
          'Integrated Firebase and native Android/iOS code through MethodChannel / Platform Channels.',
          'Prepared, tested, and published production releases in the App Store and Google Play.',
        ],
        achievements: [
          'Built the complete native iOS application for the 585 jewelry chain with Swift (UIKit/SwiftUI), including UI, business logic, backend integration, and production support.',
          'For Insentry, built a native H.264/H.265 decoder for a RAW video stream based on byte stream / NALU processing and integrated it with Flutter through Platform Channels.',
          'Maintained 99%+ crash-free users through Crashlytics and post-release monitoring.',
        ],
        links: [{ label: 'Portfolio (projects)', href: '/projects' }],
      },
      {
        company: 'X-COM',
        title: 'Mobile Security Researcher / Reverse Engineer',
        period: 'January 2017 — September 2019',
        duration: '2 years 9 months',
        description:
          'Researched Android/iOS application security, reverse engineered mobile clients, and built private OSINT tooling.',
        stack: ['Reverse Engineering', 'Android Security', 'Burp Suite', 'Frida', 'JADX', 'apktool', 'Python', 'OSINT', 'HackerOne', 'WAPT'],
        bullets: [
          'Researched Android/iOS application APIs, protection mechanisms, traffic, authorization, sensitive-data storage, and internal logic.',
          'Analyzed APKs and mobile clients using Burp Suite, Frida, JADX, apktool, and non-standard mobile research methods.',
          'Built a private Python OSINT suite for searches by phone, email, username, VIN, and vehicle registration numbers.',
          'Documented discovered vulnerabilities, impact assessments, and exploitation scenarios.',
        ],
        achievements: [
          'Discovered a Telegram vulnerability as part of a closed research project; details remain under NDA.',
          'Found vulnerabilities in QIWI, Mail.ru, and other major services and received confirmations and rewards through bug bounty / HackerOne.',
          'The OSINT suite helped identify 400+ vehicle owners during major automaker recall campaigns.',
          'Published security articles and practical research materials on Codeby.net.',
          'Earned WAPT (Web Application Penetration Testing) certification from Codeby.net.',
        ],
        links: [
          { label: 'Codeby.net publications', href: 'https://codeby.net/members/debug.77915/' },
          { label: 'HackerOne: confirmed reports', href: 'https://hackerone.com/debug_denis' },
        ],
      },
    ],
  },
  projects_completed: 'mobile projects',
  desktop_completed: 'desktop projects',
  projects: {
    title: 'Projects',
    subtitle: 'Selected projects with goals, stack, and implementation details.',
    controlEyebrow: 'Case navigator',
    activeCategoryCountSuffix: 'projects in this selection',
    openLink: 'Open',
    showInfo: 'Show info',
    infoModalLabel: 'Additional information',
    closeModal: 'Close',
    noImages: 'No images for this project yet.',
    galleryHint: 'Swipe or drag to browse screenshots',
    fallbackDescription: 'Description will be added later.',
    articleLinks: {
      read: 'Read article',
      part1: 'Part 1',
      part2: 'Part 2',
      archived: 'Read archived article',
    },
    researchCard: {
      lab: 'Codeby / Lab',
      caseLabel: 'case',
      caseWord: 'case',
      photoLab: 'photo / lab',
      photoArchive: 'photo / archive',
      stamp: 'archive',
      parts: '{n} parts',
      archive: 'archive',
      previewLab: 'preview / lab',
      previewArchive: 'preview / archive',
      linkSoon: 'link soon',
      linkSoonTitle: 'The link will be added later',
      eyebrow: 'Security research',
    },
    notices: {
      archivedArticle: 'Archived article: the publication had to be hidden because the material was being abused.',
    },
    securityHud: {
      topbarHandle: 'debug_denis',
      topbarDisclosure: 'responsible disclosure',
      topbarMode: 'bug bounty // research // reports',
      topbarLinks: 'hackerone · codeby.net',
      eyebrow: '// security research',
      titleSmall: 'information',
      titleMain: 'security',
      sequence: 'hunt / find / document / report',
      intro:
        'Real findings in production services. Reports follow responsible disclosure, and details of sensitive cases stay closed.',
      ctaHackerOne: 'HackerOne profile',
      ctaCodeby: 'Codeby.net',
      globeTitle: 'attack surface',
      globeSub: '// live view',
      globeHint: 'orbit: auto · grey pins are nda work',
      legendPublic: 'public',
      legendPrivate: 'under nda',
      privateNote:
        'Some vulnerabilities were found during paid engagements. Company names, reports and details are covered by NDA — on the globe those targets show up as [REDACTED].',
      privateRedacted: '[REDACTED]',
      restrictedTag: 'restricted // nda',
      vulnEyebrow: '// found in the wild',
      vulnTitle: 'Vulnerabilities found',
      vulnCountLabel: 'records',
      colId: 'id',
      colTarget: 'target',
      colClass: 'class',
      colSeverity: 'severity',
      colStatus: 'status',
      severity: {
        critical: 'critical',
        high: 'high',
        medium: 'medium',
      },
      disclosureNote:
        'Case details are not published. Reports go through HackerOne and directly to vendors, exactly as the programs require.',
      researchEyebrow: '// research & publications',
      researchTitle: 'Research & articles',
      researchCountLabel: 'materials',
      links: {
        hackerone: 'hackerone',
        article: 'write-up',
      },
      findings: {
        telegram: {
          class: 'closed case',
          status: 'details withheld',
          note:
            'I researched the service deliberately, because I already suspected a likely weak spot — and found a critical vulnerability. Details are withheld because of how sensitive the case is.',
        },
        qiwi: {
          class: 'bug bounty',
          status: 'report submitted',
          note: 'Found as part of the bug bounty program; the report was documented and submitted through HackerOne.',
        },
        mailru: {
          class: 'bug bounty',
          status: 'report submitted',
          note: 'A vulnerability in Mail.ru services was found and submitted through HackerOne: found it, documented it, sent it.',
        },
        meest: {
          class: 'authorization logic',
          status: 'write-up published',
          note: 'My first finding: the authorization logic allowed access to other users accounts. The write-up is public.',
        },
      },
    },
    securityBoard: {
      eyebrow: 'Security cases',
      title: 'A critical finding and bug bounty reports',
      statusCode: 'debug_denis / responsible disclosure',
      ticker:
        'responsible disclosure // case details are not published // reports go through hackerone // found — documented — reported //',
      alertCritical: 'critical',
      alertReported: 'reported',
      scanning: 'Scanning target',
      uploading: 'Uploading report',
      labelTarget: 'target',
      labelFormat: 'format',
      labelResult: 'result',
      labelDetails: 'details',
      labelProgram: 'program',
      labelChannel: 'channel',
      labelStatus: 'status',
      telegramChannel: 'CH-01 · private research',
      telegramFormat: 'focused hunt',
      telegramResult: 'critical vulnerability',
      telegramDetails: 'withheld',
      telegramSub: 'critical vulnerability',
      telegramNote:
        'I researched Telegram deliberately, because I already suspected a likely weak spot — and found a critical vulnerability. Details are withheld because of how sensitive the case is.',
      flowStep1: 'target picked',
      flowStep2: 'vulnerability found',
      flowStep3: 'details withheld',
      telegramTag1: 'Focused hunt',
      telegramTag2: 'Closed case',
      telegramTag3: 'Serious risk',
      telegramStamp: 'details withheld',
      bountyProgram: 'bug bounty',
      bountyStatus: 'report submitted',
      bountySub: 'bug bounty · hackerone',
      qiwiNote:
        'As part of the bug bounty program I found a vulnerability in QIWI and filed the report through HackerOne, following responsible disclosure rules.',
      mailruNote:
        'A vulnerability in Mail.ru services was found and submitted through HackerOne: found it, documented it, sent it — no drama.',
      hackerOneProfile: 'HackerOne profile',
      vulnTitle: 'Vulnerabilities found',
      disclosureChip: 'responsible disclosure',
      codebyEyebrow: 'publications & profile',
      codebyText: 'Author profile and published research on Codeby.net.',
      codebyCta: 'open profile',
      railChannels: 'channels',
      railTotals: 'totals',
      railMode: 'mode',
      railCases: 'cases',
      railCritical: 'critical',
      railReports: 'reports',
      railDisclosed: 'disclosed',
      railChannelLabel: 'channel',
      hubLabel: 'vulnerabilities found',
      logTitle: 'watch log',
      logMeta: '3 found · 2 reported · responsible disclosure',
      patchLabel: 'patch',
      scanLabel: 'scan',
      sendLabel: 'send',
      spineResearch: 'セキュリティ研究',
      spineBounty: 'バグバウンティ',
      researchEyebrow: 'Publications',
      researchTitle: 'Articles & lab work',
      statFound: 'found',
      statReported: 'reported',
    },
    caseLabels: {
      engineeringContribution: 'Engineering contribution',
      solvedTasks: 'Solved tasks',
    },
    categories: {
      mobile: 'Mobile',
      fullstack: 'Front + Back',
      desktop: 'Desktop',
      cybersecurity: 'Cybersecurity',
    },
    categoryMeta: {
      mobile: {
        eyebrow: 'iOS / Android',
        description: 'Product-grade mobile apps: UX, motion, subscriptions, store releases, and the shipping work around them.',
      },
      fullstack: {
        eyebrow: 'Front + Back',
        description: 'Projects where I handled both the client side and backend work: APIs, integrations, server logic, and the full product flow.',
      },
      desktop: {
        eyebrow: 'Desktop / Utility',
        description: 'Desktop apps and internal tools where speed, dense UI, and day-to-day usability matter more than marketing gloss.',
      },
      cybersecurity: {
        eyebrow: 'Research / Offensive',
        description: 'Security research, assessments, PoCs, and applied work that often cannot be shown in full public detail.',
      },
    },
    insentry: {
      solvedTasks: [
        'Investigated a RAW video stream that VLC and similar players could not render.',
        'Built a native decoder: video rendering directly from bytes/NALU payloads.',
        'Packaged it as a Flutter library with a native-to-Flutter bridge.',
      ],
    },
    descriptions: {
      trezorSuite: 'A Flutter desktop clone of Trezor Suite: an experiment with crypto-wallet UX, dense navigation, desktop windows, and application state.',
      berry: 'A Flutter desktop app focused on a fast interface, local data, and comfortable use in a standalone desktop window.',
      avProtection: 'A desktop-first security utility concept with an interface for control, checks, and security-related workflows.',
      gifMaker: 'An app for creating GIF animations from photos directly on the phone. Users select images, build an animation, and quickly share the result.',
      storekeeper: 'An app for tracking consumables, goods, and warehouse operations for property managers, offices, beauty salons, and small stockrooms.',
      countdownWidget: 'An app with countdown timers and widgets for tracking important events, dates, and personal deadlines right from the phone screen.',
      boxingTimer: 'A sports interval timer for boxing, MMA, CrossFit, and workouts. Users can configure rounds, rest periods, sound cues, and training scenarios.',
      teleprompterAutomatic: '<strong>Teleprompter Automatic</strong> is a commercial product for recording and editing video with a teleprompter, automatic scrolling, script import and organization, auto subtitles, translations, logos, background replacement, social-media resizing, subscriptions, and a web/backend platform. I owned iOS, Android, payments, APIs, web panel, tests, integrations, and production releases.',
      mAlien: '<strong>M-Alien</strong> is a closed full-stack messenger for internal use by a company building AI-powered drones. The project is non-public and was delivered under NDA: I handled the Flutter mobile client, Node.js backend, realtime event exchange, media, notifications, local storage, and the glue between layers. The product includes direct and group chats, private auth without phone/email/social login, device and session management, QR flows, localization, themes, offline/cache logic, voice messages, and server infrastructure for events, files, and push notifications.',
      partyDay: 'A “Never Have I Ever” party game for groups and home parties. The app provides ready-made question packs, helps people start quickly, and keeps the flow lively with different categories, themes, and adult-party scenarios.',
      truthOrDare: 'A Truth or Dare party game for groups of friends. It includes multiple packs of tasks and questions for different moods, a bright game mechanic, and a quick way to start a party without setup friction.',
      truthOrDare2: 'A second Truth or Dare party game for quick parties and groups of friends. The app continues the idea of the first project with ready-made question and dare packs, a bright game flow, and an easy launch without extra setup.',
      passwordManager: 'A password manager for securely storing sensitive information. Users can save accounts, bank cards, documents, addresses, and other records, quickly find what they need, and keep it protected.',
      powerFit: 'A fitness tracker for building workout programs and logging training progress. The app helps plan exercises, record sets and weights, track result dynamics, and see how performance changes over time.',
      armira: 'A mobile store for Armira, an institute of scientific beauty, with a catalog of professional cosmetology products, preparations, devices, consumables, and care goods. The app helps users browse categories, promotions, and products for home or professional use.<br><br><a href="https://drive.google.com/file/d/1Jr5mk5f3wvo_uNVrbF1rHVn9K09lA0rf/view" target="_blank" rel="noopener noreferrer">Download APK</a>',
      tableCoins: 'Table Coins is a native iOS app built with SwiftUI 2.0 for managing and browsing a coin collection. The interface helps users work with the catalog, coin cards, and the visual state of the collection directly on iPhone.',
      blurPhoto: 'A photo editor for precise blur of unwanted objects, details, and visual imperfections. The app helps hide distracting parts of a shot, work with specific areas, and quickly get a cleaner image.',
      prostor: 'An online grocery store for products from Russia and CIS countries in the UAE. The app lets users browse a large catalog, order home delivery across the UAE, and buy familiar groceries, dairy, meat, fish, drinks, sweets, and household goods.',
      skin: 'An iPhone customization app with widgets, icons, themes, and visual packs for personalizing the home screen.',
      iHaveNeverAdult: 'A “Never Have I Ever” game for adult groups with ready-made questions and a quick party-start flow.',
      gold585: '<strong>585Gold</strong> is an e-commerce app for a large jewelry network: on its App Store page, the brand describes itself as a network with <strong>250+ accessible jewelry stores</strong> across every federal district of Russia. At that scale, the mobile product becomes an entry point into purchases, offers, delivery, payment, and service flows across the network.<br><br>The app covers gold and silver jewelry, diamond and gemstone pieces, search, filters, product cards, store availability, cart, promo codes, checkout, delivery, pickup points, loyalty bonuses, push/CRM integrations, analytics, and jewelry trade-in. The core product challenge is to connect polished jewelry presentation with a strong shopping journey: help customers choose an item quickly, trust the details, understand the terms, and move toward purchase without friction.',
      honeyWarehouse: 'An internal app for a honey supplier that helps track sales, warehouse stock, estimates, and related operations. It simplifies daily work with orders, calculations, and documents without scattered spreadsheets.',
      projectEstimator: 'A finance tracker for personal projects and everyday expenses. The app helps track spending and income, manage cash flow, keep operation history, and understand where money goes and how the financial result changes.',
      modPack: 'A mod catalog for Melon Playground where users can find, preview, and install new game modifications. The app simplifies the whole flow from choosing content to preparing it for use in Melon Playground.',
      passportPhotos: 'ID & Passport Photos is an app for creating document photos for different countries, IDs, passports, and visas directly from a smartphone.<br><br>It includes the key tools needed to prepare a compliant image: background removal and replacement, a simple built-in photo editor, format adjustment, and print-sheet preparation.<br><br>The app helps users go from a source photo to a ready result: edit the image, adapt it to the required document, and save or print it as a PDF.',
      faceYoga: 'A face fitness app with exercises, massage practices, and facial workout programs. Users can follow programs, repeat techniques step by step, and keep a regular care routine in a convenient mobile format.',
      femina: 'A women’s calendar for tracking the cycle, well-being, and important days. The app helps log events, monitor regularity, view predictions in a clear calendar, and better understand body changes through history.',
      allo: 'An app for recording incoming and outgoing calls with convenient audio management. Users can save conversations, listen to them, organize the history, share important recordings, and quickly return to key calls.',
      proScan: 'A mobile scanner and document manager. The app lets users scan papers with the camera, store documents in a library, compress files, add watermarks and signatures, work with PDFs, and prepare documents for sharing.',
      tiktokSaver: 'A utility for saving TikTok videos without watermarks. Users paste a video link, download a clean clip to the device, and can save it to the gallery or use it further without extra processing.',
      simpleBlock: 'An ad blocker for the device, similar in purpose to AdBlock. The app helps remove intrusive ads, enable filtering rules, and make web browsing cleaner, faster, and calmer.',
      dmt: 'A mobile client for DMT body-worn video recorders. The app connects to wearable devices, shows a live camera stream, saves the stream as a recording, downloads files from the recorder, and lets users view saved materials inside the app.',
      tales: 'An app for generating children’s fairy tales with AI. Users provide an idea or story parameters, while the backend API and DeepSeek integration help create a personalized tale for a child.',
      gamerMinimap: 'An iPhone and Apple Watch app with interactive minimaps for popular games. Users can choose game maps, add their own real-world objects, markers, and routes, then use the map from the phone or watch.',
      stService: 'An app for SafeTec service and warranty support. It helps industrial employees manage their objects, register requests, work with service tasks, and keep maintenance history in one place.',
      gorodKurort: 'An app for the Gorod-Kurort tour operator, made for browsing and booking tours around Samara, the Samara region, and Russia. It includes bus tours, river cruises, walking routes, weekend trips, and custom programs with online booking.<br><br><a href="https://vk.com/gorod_kurort" target="_blank" rel="noopener noreferrer">Gorod-Kurort on VK</a>',
      insentryRawStream: 'For <strong>Insentry</strong>, I did not build an app from scratch; I built a complex module inside a video-surveillance system: playback of a RAW video stream that VLC and similar players could not render.<br><br>The solution: a byte/NALU-level decoder and a Flutter library with a native bridge.',
      toneOfVictory: 'I pulled this case out separately: <strong>The Tone of Victory</strong>, a premium native iOS project for <strong>TAG Heuer</strong>, the watch Maison within <strong>Louis Vuitton Moët Hennessy (LVMH)</strong>.<br><br>The project was built for <strong>Formula 1 activation stands</strong> and premium brand spaces in spring <strong>2025</strong>, with launch across multiple markets. The project materials include real stand photos from <strong>South Korea</strong>, which clearly show how the product reached offline installations and a real audience.<br><br>From the engineering side, it was a modern 2024-2025 mobile production stack: <strong>Swift</strong>, <strong>SwiftUI</strong>, advanced <strong>video and audio</strong> work, localization, content adaptation for different countries, premium brand-experience UI, and the engineering plumbing needed for stable kiosk-style operation.',
      toneOfVictoryListing: 'A premium iOS project for the TAG Heuer Connected Calibre E5 x Formula 1 Edition: a branded Formula 1 experience for presentation stands and an international launch. The app combined racing visuals, video and audio scenarios, localized content, market adaptation, and a stable interface for offline brand activations.',
      plates: '<strong>Blin-da-Grif</strong> is a mobile workout app with individual AI-generated programs, an AI chat for clarifying training problems, community features, nutrition journals, statistics, and personal progress tracking.<br><br>Users can adapt workouts to their goal and level, ask the AI assistant what to do when an exercise is too hard or technique breaks down, share results with other members, and track nutrition in the same product. One of the program authors is <strong>Vladislav Tuinov</strong>, a 3-time European kickboxing champion. Technically, it is a Flutter/Dart app with Firebase, push notifications, REST/WebSocket layers, and Bluetooth/BLE flows for fitness devices.',
      beautify: 'Beautify is an app for service professionals who want to keep client bookings, schedules, and services in one convenient place.<br><br>The service helps automate appointments and client tracking: the schedule is always available, and a new client only needs to be added once instead of re-entering data for every booking.<br><br>The fast session creation flow is handled separately: services can be preconfigured with fixed price and duration, making it possible to book a client in about 10 seconds.',
      browserCredentials: 'A Raspberry Pi Zero W-based device built to demonstrate the risk of browser credential theft in a controlled lab environment.<br><br>A detailed guide from idea to implementation:<br><a href="https://codeby.net/resources/krazha-uchetnykh-dannykh-brauzerov-c-pomoshch-yu-raspberry-pi-zero-w-chast-1.349/" target="_blank" rel="noopener noreferrer">Part 1: preparation and concept</a><br><a href="https://codeby.net/resources/krazha-uchetnykh-dannykh-s-brauzerov-pomoshch-yu-raspberry-pi-zero-w-chast-2-podgotovka.351/" target="_blank" rel="noopener noreferrer">Part 2: setup and launch</a>',
      meestExpress: 'My first discovered vulnerability: research into Meest Express authorization logic and a scenario that could allow access to user accounts.<br><br><a href="https://codeby.net/threads/poluchaem-dostup-k-akkauntam-meest-express-moja-pervaja-najdennaja-ujazvimost.70233/" target="_blank" rel="noopener noreferrer">Read the article on Codeby.net</a>',
      whosHome: 'An ESP8266-based device for detecting users in a room through network activity.<br><br><a href="https://codeby.net/threads/opredelyayem-kto-doma-s-pomoshch-yu-esp8266.66662/" target="_blank" rel="noopener noreferrer">Read the article</a>',
      deauthDetector: 'A Wi-Fi client deauthentication detector: an experimental project for spotting suspicious disconnect/deauth events in a wireless network.',
      yaraAntivirus: 'An educational project for building a signature-based antivirus in C# using YARA rules to identify suspicious files.',
      hellion: 'A research project implementing an RMS trojan in a controlled lab environment to understand remote-control techniques and defensive measures.',
      closedOsintTool: 'A closed NDA project for a specific client: a series of scripts and modules for a complex OSINT tool that searched for a person’s digital footprint by phone number, email, and other initial identifiers.<br><br>The task involved aggregating public traces from social networks and open sources, including Avito, QIWI, Mail.ru, Odnoklassniki, VK, Facebook, Instagram, and other platforms. Conceptually, it was an aggregated people-search tool similar to products such as “Glaz Boga”, but built for the client’s internal scenario.<br><br>The project was delivered to a working state, but implementation details, architecture, collection methods, client identity, and results are not disclosed because of NDA obligations, data sensitivity, and legal-risk considerations. In the public portfolio, the case is described only at the level of role, task class, and general outcome.',
    },
    teleprompter: {
      card: {
        systemTitle: 'iOS + Android + backend + web panel',
      },
      info: {
        eyebrow: 'Commercial full-stack product',
        title: 'Teleprompter Automatic',
        lead: 'A commercial product for recording and editing video with a teleprompter, subscriptions, and a backend platform. The app is published in the App Store and Google Play, serves an international audience, and is developed as a subscription service.',
        platforms: {
          items: ['iOS app', 'Android app', 'Web panel', 'Backend + payments'],
        },
        roleLabel: 'My role',
        roleTitle: 'Full-stack product development',
        roleLead: 'I led Teleprompter Automatic as a full-stack developer across iOS, Android, backend, web panel, payments, internal libraries, testing, integrations, and releases.',
        scopeLabel: 'Product scale',
        scopeText: 'The product grew into an ecosystem: iOS, Android, iPad, Apple Watch, web panel, and backend. Current scale across App Store and Google Play: $50K+ revenue per month and 100K+ downloads per month, with the Android version rated around 4.6.',
        mobileGalleryEyebrow: 'iOS interface',
        mobileGalleryTitle: 'Mobile product screens',
        webGalleryEyebrow: 'Web + backend',
        webGalleryTitle: 'Web panel and backend flows',
        webGalleryLead: 'Below is a dedicated set of screens for the web side of the project. These views cover subscription management, script operations, remote control, and other backend-dependent product flows.',
        capture: {
          title: 'iOS: media and camera',
          items: [
            'Implemented media workflows with AVFoundation / AVKit: recording, preview, playback, video processing, export, and saving the result.',
            'Optimized heavy capture scenarios: smooth high-FPS text scrolling together with 4K recording, real-time filters, and background segmentation.',
            'Built internal libraries and modules for camera work, video object overlays, and user feedback collection.',
          ],
        },
        teleprompter: {
          title: 'Teleprompter engine',
          items: [
            'Built automatic scrolling, adjustable speed, mirrored text, cue indicator, appearance settings, and script synchronization with video capture.',
            'Tuned teleprompter behavior for smooth high-FPS operation while video recording is running in parallel.',
            'Prepared the product for an international audience, including 30 languages through String Catalogs / Localizable.strings.',
          ],
        },
        scripts: {
          title: 'Android and scripts',
          items: [
            'Implemented the main Android product flows with Kotlin / Jetpack Compose: video recording, script reading, importing files, folder organization, saving results, and premium access.',
            'Integrated Google Play Billing: subscriptions, purchase validation, access restoration, and server-side status synchronization.',
            'Built the Android version of the library for collecting feedback, errors, and user requests.',
          ],
        },
        editor: {
          title: 'Video editor',
          items: [
            'Implemented trimming, rotation, mirroring, aspect-ratio changes, speed changes, clip merging, and final export.',
            'Built text, image, and logo overlays, background replacement, real-time filters, and segmentation-based scenarios.',
            'Created auto subtitles, translation flows, animated text generation, AirPlay playback, and export presets for social-media formats.',
          ],
        },
        web: {
          title: 'Backend and web',
          items: [
            'Developed the backend with Node.js / Express.js / TypeScript: REST API, auth, social sign-in, file uploads, subscriptions, and payments.',
            'Designed PostgreSQL schemas for users, device sessions, purchases, and subscriptions; worked with indexes, relations, and access states.',
            'Built a Vue.js web panel for managing subscriptions, users, scripts, and internal product processes.',
          ],
        },
        watch: {
          title: 'Payments and quality',
          items: [
            'Connected monetization: StoreKit, Google Play Billing, purchase validation, access restoration, and premium-access synchronization between client and server.',
            'Connected website payments: Stripe and YooKassa, checkout, payment account area, webhooks, renewals, subscription cancellation, and payment-status processing.',
            'Covered critical flows with unit and integration tests: camera, video recording, editing, purchases, access restoration, and the mobile app → backend → payments chain.',
          ],
        },
      },
    },
  },
  restrictedProjectsNotice: {
    title: 'Restricted projects',
    description: [
      'Some projects are not publicly displayed in the portfolio due to legal restrictions or the sensitive nature of information security-related work.',
      'This includes vulnerability research and security analysis. Such projects are shared only upon request in private discussions, following responsible disclosure principles.',
    ],
  },
  antiAiNotice: {
    badge: 'Anti vibe coding notice',
    title: 'Almost everything here was built by hand, without vibe coding.',
    lead: 'About 95% of these projects came from actual engineering, manual decisions, debugging, and careful delivery.',
    description: [
      'I do use AI as a tool when it genuinely helps, but not as a substitute for thinking and ownership.',
    ],
  },
} as const
