'use client';

import { Navigation } from '@/components/Navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-sand-light dark:bg-charcoal pt-20 transition-colors">
      <Navigation />

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-terracotta text-sm tracking-[0.2em] uppercase mb-4"
          >من نحن</p>
          <h1 className="font-arabic text-4xl md:text-6xl font-bold text-charcoal dark:text-sand mb-4"
          >
            قصتنا
          </h1>
        </div>

        <div className="animate-fade-in-up">
          <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=1200&q=80"
              alt="توابل مغربية"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sand-light dark:from-charcoal via-transparent to-transparent" />
          </div>

          <p className="text-lg text-charcoal/80 dark:text-sand/80 leading-relaxed mb-6 text-right"
          >
            مرحباً بكم في وصفات شيماء، رحلة culinaria عبر النكهات الغنية والمتنوعة للمغرب. 
            هنا نحتفل بالتقاليد الأصيلة للطبخ المغربي، المتوارثة عبر أجيال من الطباخين المنزليين 
            والشيفات الذين يفهمون أن الطعام ليس مجرد قوت، بل هو تعبير عن الحب والضيافة والهوية الثقافية.
          </p>

          <h2 className="font-arabic text-2xl font-bold text-charcoal dark:text-sand mt-12 mb-4 text-right"
          >
            قلب المطبخ المغربي
          </h2>

          <p className="text-charcoal/80 dark:text-sand/80 leading-relaxed mb-6 text-right"
          >
            المطبخ المغربي هو نسيج جميل منقوش من التأثيرات الأمازيغية والعربية والمتوسطية والإفريقية. 
            يتسم بالتوازن الدقيق بين الحلو والمالح، والاستخدام السخي للتوابل العطرية مثل الزعفران والكمون والقرفة، 
            وتقنيات الطهي البطيء التي تسمح للنكهات بالامتزاج والتعمق.
          </p>

          <p className="text-charcoal/80 dark:text-sand/80 leading-relaxed mb-6 text-right"
          >
            من الطاجين الشهير - آنية الطين المخروطية التي تخلق أطيب وألذ الحساء - إلى البسطيلة 
            الراقية التي تزين المناسبات الخاصة، كل طبق يروي قصة مكان وزمان. الكسكس يوم الجمعة، 
            المحضر بحب ويتقاسم مع العائلة، يمثل روح الضيافة المغربية.
          </p>

          <h2 className="font-arabic text-2xl font-bold text-charcoal dark:text-sand mt-12 mb-4 text-right"
          >
            رحلة شخصية
          </h2>

          <p className="text-charcoal/80 dark:text-sand/80 leading-relaxed mb-6 text-right"
          >
            هذه المجموعة من الوصفات شخصية جداً. كل وصفة تم اختبارها في مطابخ منزلية، 
            وتعديلها للطباخين المعاصرين مع احترام التقاليد التقليدية. سواء كنت تعدي طاجينك الأول 
            أو تبحثين عن تقنيتك في بخار الكسكس، ستوجهك هذه الوصفات بتعليمات واضحة ونصائح مفيدة.
          </p>

          <div className="bg-white dark:bg-charcoal-light p-8 shadow-lg rounded-2xl my-12"
          >
            <blockquote className="font-arabic text-xl text-charcoal dark:text-sand text-center"
            >
              "الكأس الأول ناعم كالحياة،<br />
              والثاني قوي كالحب،<br />
              والثالث لطيف كالموت."
            </blockquote>
            <cite className="block text-center text-charcoal/60 dark:text-sand/60 mt-4 text-sm"
            >
              — مثل مغربي عن الشاي
            </cite>
          </div>

          <h2 className="font-arabic text-2xl font-bold text-charcoal dark:text-sand mt-12 mb-4 text-right"
          >
            انضم للرحلة
          </h2>

          <p className="text-charcoal/80 dark:text-sand/80 leading-relaxed mb-8 text-right"
          >
            سواء كنت مبتدئاً فضولياً أو طباخاً محترفاً يبحث عن آفاق culinaria جديدة، 
            تدعوك هذه الوصفات لاستكشاف الدفء والغنى من المطبخ المغربي. اجمعي مكوناتك، 
            وادعي أحباءك، واصنعي الذكريات حول المائدة.
          </p>

          <div className="flex justify-center mt-12">
            <Link
              href="/recipes"
              className="btn-primary inline-flex items-center gap-2"
            >
              استكشف الوصفات
              <ArrowLeft size={18} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-charcoal dark:bg-black text-white/60 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2026 وصفات شيماء. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </main>
  );
}
