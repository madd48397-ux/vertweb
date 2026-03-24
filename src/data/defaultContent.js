// Default site content — this seeds the CMS store on first load.
// Everything here is editable from the admin panel.

export const defaultSiteContent = {
  global: {
    siteName: "VERDOT",
    tagline: "Pure Progress.",
    logo: "/logo.svg",
    footerText: "© 2026 VERDOT. All rights reserved.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/verdot-biotechnologies",
      youtube: "https://www.youtube.com/@VERDOT-Biotechnologies",
    },
    contactEmail: "info@verdot-biotechnologies.com",
    contactPhone: "+33 (0)4 73 64 14 14",
    address: "ZI de Ladoux, 63118 Cébazat, France",
  },

  navigation: [
    {
      id: "about",
      label: "About",
      href: "/about",
      children: [
        { id: "about-overview", label: "Overview", href: "/about" },
        { id: "about-leadership", label: "Leadership", href: "/about/leadership" },
        { id: "about-newsroom", label: "Newsroom", href: "/about/newsroom" },
        { id: "about-history", label: "Our History", href: "/about/history" },
        { id: "about-sustainability", label: "Sustainability", href: "/about/sustainability" },
        { id: "about-careers", label: "Careers", href: "/about/careers" },
      ],
    },
    {
      id: "modalities",
      label: "Modalities",
      href: "/modalities",
      children: [
        { id: "mod-advanced", label: "Advanced Therapies & mRNA", href: "/modalities/advanced-therapies" },
        { id: "mod-antibodies", label: "Antibodies", href: "/modalities/antibodies" },
        { id: "mod-recombinant", label: "Recombinant Proteins", href: "/modalities/recombinant-proteins" },
        { id: "mod-vaccines", label: "Vaccines", href: "/modalities/vaccines" },
      ],
    },
    {
      id: "solutions",
      label: "Solutions",
      href: "/solutions",
      children: [
        { id: "sol-columns", label: "Chromatography Columns", href: "/solutions/chromatography-columns" },
        { id: "sol-systems", label: "Chromatography Systems", href: "/solutions/chromatography-systems" },
        { id: "sol-tff", label: "TFF Systems", href: "/solutions/tff-systems" },
        { id: "sol-custom", label: "Custom Systems", href: "/solutions/custom-systems" },
      ],
    },
    {
      id: "resources",
      label: "Resources",
      href: "/resources",
      children: [
        { id: "res-videos", label: "Videos", href: "/resources/videos" },
        { id: "res-blog", label: "Blog", href: "/resources/blog" },
        { id: "res-support", label: "Customer Support", href: "/resources/support" },
      ],
    },
    { id: "quality", label: "Quality", href: "/quality" },
    { id: "contact", label: "Contact Us", href: "/contact" },
  ],

  pages: {
    home: {
      id: "home",
      title: "Home",
      slug: "/",
      sections: [
        {
          id: "hero",
          type: "hero",
          heading: "Pure Progress.",
          subheading: "Tailored purification technologies through sustainable engineering.",
          ctaText: "Discover Our Solutions",
          ctaLink: "/solutions",
          backgroundImage: "",
        },
        {
          id: "intro",
          type: "text-image",
          heading: "Custom-Designed Purification Equipment",
          body: "Customization is the standard for 85% of our products. VERDOT has been providing downstream solutions for bioprocessing since 1988, with over 70 years of engineering excellence.",
          imageUrl: "",
          imageAlt: "VERDOT equipment",
          layout: "image-right",
        },
        {
          id: "products-highlight",
          type: "cards",
          heading: "Our Solutions",
          cards: [
            {
              id: "card-columns",
              title: "InPlace™ Chromatography Columns",
              description: "From tech transfer to commercial manufacturing. Scale with confidence.",
              icon: "Columns3",
              link: "/solutions/chromatography-columns",
            },
            {
              id: "card-tff",
              title: "TFF Systems",
              description: "GMP TFF processing from clarification to formulation. One System, All You Need.",
              icon: "Filter",
              link: "/solutions/tff-systems",
            },
            {
              id: "card-custom",
              title: "Custom Systems",
              description: "Adapt. Evolve. Overcome. Evolution of Single-use FlexiPro Chrom System.",
              icon: "Settings",
              link: "/solutions/custom-systems",
            },
          ],
        },
        {
          id: "news-preview",
          type: "news",
          heading: "Our Latest News",
          maxItems: 3,
        },
        {
          id: "modalities-section",
          type: "text-block",
          heading: "Supporting All Biological Processes",
          body: "Our downstream technologies can support all biological processes — from advanced therapies and mRNA therapeutics to antibodies, recombinant proteins, and vaccines.",
        },
        {
          id: "newsletter",
          type: "newsletter",
          heading: "Stay Updated",
          body: "Fill in your details to sign up and receive the latest updates from VERDOT.",
        },
      ],
    },

    about: {
      id: "about",
      title: "About VERDOT",
      slug: "/about",
      sections: [
        {
          id: "about-hero",
          type: "hero",
          heading: "Pure Progress.",
          subheading: '"Pure Progress represents our passion to provide innovative, high-quality products that will enable the advancement of new therapeutic treatments along with a sustainable approach to make those biologics affordable and available to patients." — Charles Ruban, President and CEO',
        },
        {
          id: "about-mission",
          type: "text-block",
          heading: "Our Mission",
          body: "Provide tailored purification technologies to biopharmaceutical companies striving to bring innovative and transformative therapies to patients.",
        },
        {
          id: "about-team",
          type: "text-image",
          heading: "One Team, One Vision",
          body: "At VERDOT, we are a dedicated, close-knit team of bioprocessing engineers and scientists who fundamentally believe in moving science forward.\n\nOur vision and commitment is to provide technologies to our clients that enable the development of therapeutic treatments, and ultimately, improve patients' lives through:\n\n• Downstream bioprocessing expertise\n• Custom solution engineering\n• Manufacturing excellence and global support\n• Sustainable operations",
          layout: "image-right",
        },
        {
          id: "about-location",
          type: "text-image",
          heading: "Made in France, for the Entire World",
          body: "Our headquarters and manufacturing facilities are in Riom, within the department of Puy-de-Dôme, right in the heart of France. All equipment is designed, engineered, manufactured, and assembled within our ISO 9001:2015 certified facilities.",
          layout: "image-left",
        },
      ],
    },

    solutions: {
      id: "solutions",
      title: "Solutions",
      slug: "/solutions",
      sections: [
        {
          id: "solutions-hero",
          type: "hero",
          heading: "Purification Solutions",
          subheading: "Process-scale chromatography columns, systems, and TFF solutions for GMP manufacturing.",
        },
        {
          id: "solutions-cards",
          type: "cards",
          heading: "Explore Our Technologies",
          cards: [
            {
              id: "sol-card-auto",
              title: "Automated Columns (200–2000 mm)",
              description: "Process-scale LPLC columns with automated packing and unpacking for GMP manufacturing.",
              link: "/solutions/chromatography-columns",
            },
            {
              id: "sol-card-manual",
              title: "Manual Columns (50–200 mm)",
              description: "Versatile manual chromatography columns for pilot and bench scale operations.",
              link: "/solutions/chromatography-columns",
            },
            {
              id: "sol-card-single-use",
              title: "Single-Use Chromatography System",
              description: "FlexiPro single-use chromatography system for flexible bioprocessing.",
              link: "/solutions/chromatography-systems",
            },
            {
              id: "sol-card-tff",
              title: "TFF Single-Use System",
              description: "Tangential flow filtration for clarification to formulation.",
              link: "/solutions/tff-systems",
            },
          ],
        },
      ],
    },

    contact: {
      id: "contact",
      title: "Contact Us",
      slug: "/contact",
      sections: [
        {
          id: "contact-hero",
          type: "hero",
          heading: "Get in Touch",
          subheading: "Thank you for your interest in VERDOT. Our specialists are here to help.",
        },
        {
          id: "contact-form",
          type: "contact-form",
          heading: "Send Us a Message",
        },
      ],
    },
  },

  news: [
    {
      id: "news-1",
      title: "VERDOT and GMI Announce New Agency Partnership",
      date: "2025-09-16",
      excerpt: "This agreement marks a significant step in VERDOT's expansion into the United States.",
      body: "VERDOT and GMI have announced a new agency partnership that marks a significant step in VERDOT's expansion into the United States market. This collaboration will strengthen VERDOT's presence in North America and provide local support to customers.",
      image: "",
      slug: "verdot-gmi-partnership",
    },
    {
      id: "news-2",
      title: "GEN Article: The Greening of Biopharma",
      date: "2025-09-15",
      excerpt: "From operational overhauls to product design, biomanufacturing and bioprocessing companies reduce their environmental impact.",
      body: "From operational overhauls to product design, biomanufacturing and bioprocessing companies reduce their environmental impact. VERDOT has been featured in GEN for its commitment to sustainable bioprocessing solutions.",
      image: "",
      slug: "greening-of-biopharma",
    },
    {
      id: "news-3",
      title: "Driving Sustainable Innovation: VERDOT's New Centre of Excellence",
      date: "2025-09-05",
      excerpt: "VERDOT's new sustainable headquarters and manufacturing facility in Riom, France was designed with sustainability at its core.",
      body: "VERDOT's new sustainable headquarters and manufacturing facility in Riom, France was designed with sustainability at its core. The Centre of Excellence represents a major investment in the future of sustainable bioprocessing manufacturing.",
      image: "",
      slug: "centre-of-excellence",
    },
  ],
};
