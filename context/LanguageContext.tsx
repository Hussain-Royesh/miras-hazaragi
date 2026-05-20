'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// ─── English strings ────────────────────────────────────────────────────────
const en = {
  // AnnouncementBar
  announcement: 'Free shipping on orders over £120 to UK & Australia · Handmade in Quetta, Pakistan',

  // Navbar
  nav_collections: 'Collections',
  nav_shop: 'Shop',
  nav_story: 'Our Story',
  nav_craft: 'Craft',
  nav_artisans: 'Artisans',
  nav_gallery: 'Gallery',
  nav_cart: 'Cart',

  // Hero
  hero_tag: 'Hazargi Heritage · Est. 2020',
  hero_h1_line1: 'Her Art,',
  hero_h1_line2: 'Her',
  hero_h1_em: 'Power.',
  hero_desc: 'Miras celebrates the ancient art of Khamak embroidery — each stitch a story of Hazargi women, their resilience, and the beauty woven into every thread.',
  hero_cta_shop: 'Shop Now',
  hero_cta_story: 'Our Story',
  hero_handcrafted: 'Handcrafted in Quetta',
  hero_khamak: 'Khamak Embroidery',
  hero_living_heritage: 'A Living Heritage',

  // Collections
  col_tag: 'Curated Selection',
  col_h2: 'Our Collections',
  col_desc: 'Each collection tells a story rooted in Hazargi culture, crafted by skilled artisans using centuries-old techniques.',
  col_explore: 'Explore',

  // Products
  prod_tag: 'Artisan Creations',
  prod_h2: 'Shop the Collection',
  prod_all: 'All',
  prod_khamak: 'Khamak',
  prod_dress: 'Dress',
  prod_accessories: 'Accessories',
  prod_embroidered: 'Embroidered',
  prod_add_cart: 'Add to Cart',
  prod_badge_new: 'New',
  prod_badge_handstitched: 'Handstitched',

  // Story
  story_tag: 'Our Heritage',
  story_h2_line1: 'Woven in Tradition,',
  story_h2_em: 'Worn with Pride',
  story_p1: 'Miras — meaning "heritage" in Dari — was born from a deep love of Hazargi culture and a desire to share it with the world. Every garment is a canvas of our ancestors\' art.',
  story_p2: 'Our cooperative of skilled Hazargi women in Quetta hand-stitches each piece using traditional Khamak embroidery, ensuring every customer carries a piece of living history.',
  story_cta: 'Meet Our Artisans',
  story_years: 'Years of Craft',
  story_stat_artisans: 'Artisans',
  story_stat_pieces: 'Pieces Made',
  story_stat_countries: 'Countries',

  // Craft
  craft_tag: 'The Making',
  craft_h2: 'The Art of Khamak',
  craft_desc: 'Khamak is one of the most intricate embroidery traditions of the Hazara people — a form of counted thread work that requires exceptional patience, precision, and skill.',
  craft_s1_name: 'Thread Selection',
  craft_s1_desc: 'Fine silk and wool threads are hand-selected, often dyed using natural pigments from local flora found in the Hazarajat highlands.',
  craft_s2_name: 'Pattern Design',
  craft_s2_desc: 'Each Khamak pattern is drawn freehand, passed down through generations of Hazargi women who carry the designs in memory.',
  craft_s3_name: 'Hand Embroidery',
  craft_s3_desc: 'Artisans spend weeks stitching intricate geometric motifs, each piece taking between 40 and 120 hours of dedicated craftsmanship.',
  craft_s4_name: 'Final Finishing',
  craft_s4_desc: 'Garments are hand-washed, gently pressed, and inspected by our master embroiderers before being carefully packaged for you.',

  // Artisans
  artisans_tag: 'The Hands Behind',
  artisans_h2: 'Meet Our Artisans',
  artisans_desc: 'Behind every Miras garment is a skilled Hazargi woman whose artistry and dedication make each piece extraordinary.',
  artisan1_title: 'Master Embroiderer',
  artisan1_bio: 'With over 20 years of experience, Fatima is the heart of our cooperative. She learned Khamak from her grandmother and now teaches the next generation of artisans.',
  artisan2_title: 'Pattern Designer',
  artisan2_bio: 'Zahra creates our signature geometric patterns, blending traditional Hazargi motifs with contemporary aesthetics to tell the stories of her people through stitch.',
  artisan3_title: 'Thread & Dye Specialist',
  artisan3_bio: 'Maryam sources and prepares our silk threads, specialising in natural dyeing techniques that produce our distinctive, long-lasting colours and textures.',

  // Testimonials
  test_tag: 'Customer Stories',
  test_h2: 'What They Say',
  test1: 'The most beautiful piece of clothing I have ever owned. The Khamak embroidery is extraordinary — you can feel the love and skill in every single stitch.',
  test2: "I purchased a dress for my sister's wedding and everyone wanted to know where it was from. The quality is exceptional and the delivery was so thoughtful.",
  test3: 'As a Hazargi woman living abroad, wearing Miras makes me feel connected to my heritage. This brand means so much more than just clothing.',
  test1_name: 'Sarah M.',
  test1_loc: 'London, UK',
  test2_name: 'Layla K.',
  test2_loc: 'Melbourne, Australia',
  test3_name: 'Nadia R.',
  test3_loc: 'Toronto, Canada',

  // Gallery
  gal_tag: 'Follow Our Journey',
  gal_platform: 'instagram',

  // Newsletter
  news_tag: 'Stay Connected',
  news_h2: 'Join the Miras Circle',
  news_desc: 'Be the first to hear about new collections, artisan stories, and exclusive offers. We promise to only send what matters.',
  news_placeholder: 'Your email address',
  news_btn: 'Subscribe',
  news_thanks: 'Thank you for joining — welcome to the Miras family.',

  // Footer
  footer_desc: 'Celebrating Hazargi heritage through the art of Khamak embroidery. Every stitch tells a story of resilience, beauty, and belonging.',
  footer_shop: 'Shop',
  footer_about: 'About',
  footer_help: 'Help',
  footer_shop_links: ['New Arrivals', 'Khamak Collection', 'Evening Wear', 'Accessories', 'Sale'],
  footer_about_links: ['Our Story', 'Artisans', 'Khamak Craft', 'Sustainability', 'Press'],
  footer_help_links: ['Shipping Info', 'Returns & Exchanges', 'Size Guide', 'Care Guide', 'Contact Us'],
  footer_rights: '© 2025 Miras Hazargi. All rights reserved.',
  footer_privacy: 'Privacy Policy',
  footer_terms: 'Terms',
  footer_badges: ['Handmade', 'Ethically Sourced', 'Women-Led'],
}

// ─── Dari / Afghan Persian strings ──────────────────────────────────────────
const fa: typeof en = {
  announcement: 'ارسال رایگان برای سفارش‌های بالای £۱۲۰ به بریتانیا و استرالیا · دست‌ساز در کویته، پاکستان',

  nav_collections: 'مجموعه‌ها',
  nav_shop: 'خرید',
  nav_story: 'داستان ما',
  nav_craft: 'صنایع‌دستی',
  nav_artisans: 'هنرمندان',
  nav_gallery: 'گالری',
  nav_cart: 'سبد خرید',

  hero_tag: 'میراث هزارگی · تأسیس ۲۰۲۰',
  hero_h1_line1: 'هنر او،',
  hero_h1_line2: 'قدرت',
  hero_h1_em: 'اوست.',
  hero_desc: 'میراث هنر باستانی خامک‌دوزی را جشن می‌گیرد — هر بخیه داستانی از زنان هزارگی است، مقاومت آن‌ها، و زیبایی که در هر نخ تنیده شده.',
  hero_cta_shop: 'همین حالا خرید کنید',
  hero_cta_story: 'داستان ما',
  hero_handcrafted: 'دست‌ساز در کویته',
  hero_khamak: 'خامک‌دوزی',
  hero_living_heritage: 'میراث زنده',

  col_tag: 'انتخاب ویژه',
  col_h2: 'مجموعه‌های ما',
  col_desc: 'هر مجموعه داستانی از فرهنگ هزارگی روایت می‌کند، ساخته هنرمندان ماهر با تکنیک‌های چندصدساله.',
  col_explore: 'کاوش کنید',

  prod_tag: 'آثار هنرمندان',
  prod_h2: 'خرید از مجموعه',
  prod_all: 'همه',
  prod_khamak: 'خامک',
  prod_dress: 'لباس',
  prod_accessories: 'لوازم جانبی',
  prod_embroidered: 'گلدوزی',
  prod_add_cart: 'افزودن به سبد',
  prod_badge_new: 'جدید',
  prod_badge_handstitched: 'دست‌دوخت',

  story_tag: 'میراث ما',
  story_h2_line1: 'بافته در سنت،',
  story_h2_em: 'پوشیده با افتخار',
  story_p1: 'میراث — به معنای «ارث» در دری — از عشق عمیق به فرهنگ هزارگی و میل به به اشتراک‌گذاری آن با جهان پدید آمد. هر پوشاک بوم هنر نیاکان ماست.',
  story_p2: 'تعاونی ما از زنان ماهر هزارگی در کویته هر قطعه را با خامک‌دوزی سنتی دست‌دوز می‌کنند و تضمین می‌کنند هر مشتری تکه‌ای از تاریخ زنده را با خود ببرد.',
  story_cta: 'با هنرمندان ما آشنا شوید',
  story_years: 'سال هنر',
  story_stat_artisans: 'هنرمند',
  story_stat_pieces: 'قطعه ساخته شده',
  story_stat_countries: 'کشور',

  craft_tag: 'فرآیند ساخت',
  craft_h2: 'هنر خامک',
  craft_desc: 'خامک یکی از پیچیده‌ترین سنت‌های گلدوزی مردم هزاره است — نوعی کار با نخ شمارشی که صبر استثنایی، دقت و مهارت می‌طلبد.',
  craft_s1_name: 'انتخاب نخ',
  craft_s1_desc: 'نخ‌های ابریشم و پشم ظریف دست‌چین می‌شوند، که اغلب با رنگ‌های طبیعی از گیاهان محلی ارتفاعات هزارجات رنگرزی می‌شوند.',
  craft_s2_name: 'طراحی نقش',
  craft_s2_desc: 'هر نقش خامک آزادانه طراحی می‌شود، از نسلی به نسل دیگر توسط زنان هزارگی منتقل شده که طرح‌ها را در حافظه نگه می‌دارند.',
  craft_s3_name: 'گلدوزی دستی',
  craft_s3_desc: 'هنرمندان هفته‌ها وقت صرف بخیه‌زنی نقوش هندسی پیچیده می‌کنند و هر قطعه بین ۴۰ تا ۱۲۰ ساعت کار مستمر نیاز دارد.',
  craft_s4_name: 'تکمیل نهایی',
  craft_s4_desc: 'پوشاک‌ها دست‌شویی می‌شوند، آرام اتو می‌شوند و توسط گلدوزان استاد ما بازرسی می‌گردند، سپس با دقت برای شما بسته‌بندی می‌شوند.',

  artisans_tag: 'دستانی که می‌سازند',
  artisans_h2: 'با هنرمندان ما آشنا شوید',
  artisans_desc: 'پشت هر پوشاک میراث، زن ماهر هزارگی‌ای است که هنر و تعهدش هر قطعه را استثنایی می‌کند.',
  artisan1_title: 'گلدوز استاد',
  artisan1_bio: 'فاطمه با بیش از ۲۰ سال تجربه، قلب تعاونی ماست. او خامک را از مادربزرگش آموخت و اکنون نسل بعدی هنرمندان را آموزش می‌دهد.',
  artisan2_title: 'طراح نقش',
  artisan2_bio: 'زهرا نقوش هندسی شاخص ما را خلق می‌کند و نقوش سنتی هزارگی را با زیبایی‌شناسی معاصر ترکیب می‌کند تا داستان مردمش را از طریق بخیه روایت کند.',
  artisan3_title: 'متخصص نخ و رنگرزی',
  artisan3_bio: 'مریم نخ‌های ابریشم ما را تهیه و آماده می‌کند و در تکنیک‌های رنگرزی طبیعی تخصص دارد که رنگ‌ها و بافت‌های متمایز و پایدار ما را تولید می‌کنند.',

  test_tag: 'داستان‌های مشتریان',
  test_h2: 'آنچه می‌گویند',
  test1: 'زیباترین تکه لباسی که تا به حال داشتم. گلدوزی خامک فوق‌العاده است — می‌توانید عشق و مهارت را در هر بخیه احساس کنید.',
  test2: 'یک لباس برای عروسی خواهرم خریدم و همه می‌خواستند بدانند از کجاست. کیفیت استثنایی است و تحویل بسیار دلسوزانه بود.',
  test3: 'به عنوان یک زن هزارگی که در خارج از کشور زندگی می‌کنم، پوشیدن میراث مرا به میراثم متصل می‌کند. این برند خیلی بیشتر از فقط لباس است.',
  test1_name: 'سارا م.',
  test1_loc: 'لندن، بریتانیا',
  test2_name: 'لیلا ک.',
  test2_loc: 'ملبورن، استرالیا',
  test3_name: 'نادیا ر.',
  test3_loc: 'تورنتو، کانادا',

  gal_tag: 'سفر ما را دنبال کنید',
  gal_platform: 'اینستاگرام',

  news_tag: 'در ارتباط باشید',
  news_h2: 'به دایره میراث بپیوندید',
  news_desc: 'اولین کسی باشید که از مجموعه‌های جدید، داستان‌های هنرمندان و پیشنهادهای ویژه مطلع می‌شوید. قول می‌دهیم فقط چیزی ارسال کنیم که ارزشمند است.',
  news_placeholder: 'آدرس ایمیل شما',
  news_btn: 'عضو شوید',
  news_thanks: 'ممنون که پیوستید — به خانواده میراث خوش آمدید.',

  footer_desc: 'جشن میراث هزارگی از طریق هنر خامک‌دوزی. هر بخیه داستانی از مقاومت، زیبایی و تعلق روایت می‌کند.',
  footer_shop: 'خرید',
  footer_about: 'درباره ما',
  footer_help: 'راهنما',
  footer_shop_links: ['ورودی‌های جدید', 'مجموعه خامک', 'لباس شب', 'لوازم جانبی', 'حراج'],
  footer_about_links: ['داستان ما', 'هنرمندان', 'صنایع خامک', 'پایداری', 'مطبوعات'],
  footer_help_links: ['اطلاعات ارسال', 'مرجوعی و تبادل', 'راهنمای سایز', 'راهنمای نگهداری', 'تماس با ما'],
  footer_rights: '© ۲۰۲۵ میراث هزارگی. تمامی حقوق محفوظ است.',
  footer_privacy: 'سیاست حریم خصوصی',
  footer_terms: 'شرایط استفاده',
  footer_badges: ['دست‌ساز', 'تهیه اخلاقی', 'رهبری زنان'],
}

// ─── Context ────────────────────────────────────────────────────────────────
export type Lang = 'en' | 'fa'
type T = typeof en

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: T
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children, overrides = {} }: { children: ReactNode; overrides?: Partial<T> }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('miras-lang') as Lang | null
    if (saved === 'fa' || saved === 'en') setLangState(saved)
  }, [])

  useEffect(() => {
    const html = document.documentElement
    if (lang === 'fa') {
      html.setAttribute('dir', 'rtl')
      html.setAttribute('lang', 'fa')
      html.classList.add('lang-fa')
    } else {
      html.setAttribute('dir', 'ltr')
      html.setAttribute('lang', 'en')
      html.classList.remove('lang-fa')
    }
  }, [lang])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('miras-lang', l)
  }

  const enWithOverrides = { ...en, ...overrides }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: lang === 'fa' ? fa : enWithOverrides, isRTL: lang === 'fa' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
