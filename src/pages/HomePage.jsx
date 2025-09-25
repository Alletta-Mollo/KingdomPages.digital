import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Feather, MessageSquare, Book, Sparkles } from 'lucide-react';
import { libraryData } from '@/data/libraryData';
import { WavySeparator } from '@/components/WavySeparator';
import { PencilLine } from 'lucide-react';
import BookCarousel from "@/components/BookCarousel";



const AnimatedOrb = ({ className, initial, animate }) => (
  <motion.div
    className={`orb ${className}`}
    initial={initial}
    animate={animate}
  ></motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, link, linkText, delay }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const top = useTransform(mouseYSpring, [-0.5, 0.5], ['40%', '60%']);
  const left = useTransform(mouseXSpring, [-0.5, 0.5], ['40%', '60%']);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12.5deg', '-12.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12.5deg', '12.5deg']);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative h-full"
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className="h-full text-center p-6 md:p-8 glassmorphism rounded-2xl flex flex-col aurora-card"
      >
        <div className="mb-4 inline-block p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full text-primary">
          <Icon size={32} style={{ transform: 'translateZ(50px)' }}/>
        </div>
        <h3 className="text-2xl font-bold mb-2 text-foreground" style={{ transform: 'translateZ(50px)' }}>{title}</h3>
        <p className="text-muted-foreground mb-6 flex-grow" style={{ transform: 'translateZ(40px)' }}>{description}</p>
        <Button asChild variant="outline" style={{ transform: 'translateZ(60px)' }}>
          <NavLink to={link} className="group">
            {linkText} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </NavLink>
        </Button>
      </div>
    </motion.div>
  );
};

// const Marquee = () => {
//   const titles = libraryData.slice(0, 10); // Adjust as needed

//   return (
//     <div className="relative flex w-full overflow-x-hidden">
//       <div className="marquee">
//         <div className="marquee__content">
//           {titles.map(item => (
//             <div key={`${item.id}-1`} className="flex flex-col items-center mx-6 space-y-2">
//               <img
//                 src={item.picture}
//                 alt={item.title}
//                 className="w-36 h-32 object-cover rounded-xl shadow-lg"
//               />
//               <span className="text-base font-medium text-foreground text-center whitespace-nowrap">
//                 {item.title}
//               </span>
//             </div>
//           ))}
//         </div>
//         <div aria-hidden="true" className="marquee__content">
//           {titles.map(item => (
//             <div key={`${item.id}-2`} className="flex flex-col items-center mx-6 space-y-2">
//               <img
//                 src={item.picture}
//                 alt={item.title}
//                 className="w-36 h-32 object-cover rounded-xl shadow-lg"
//               />
//               <span className="text-base font-medium text-foreground text-center whitespace-nowrap">
//                 {item.title}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

<BookCarousel />






const HomePage = () => {
  return (
    <div className="space-y-24 md:space-y-24 overflow-hidden">
      <div className="creative-bg">
        <AnimatedOrb
          className="orb-1"
          initial={{ top: '10%', left: '10%' }}
          animate={{
            top: ['10%', '60%', '20%', '10%'],
            left: ['10%', '70%', '50%', '10%'],
            transition: { duration: 40, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
        <AnimatedOrb
          className="orb-2"
          initial={{ top: '80%', left: '80%' }}
          animate={{
            top: ['80%', '20%', '70%', '80%'],
            left: ['80%', '30%', '90%', '80%'],
            transition: { duration: 35, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
        <AnimatedOrb
          className="orb-3"
          initial={{ top: '50%', left: '50%' }}
          animate={{
            top: ['50%', '10%', '90%', '50%'],
            left: ['50%', '90%', '10%', '50%'],
            transition: { duration: 45, repeat: Infinity, ease: 'easeInOut' }
          }}
        />
      </div>

      <section id="home" className="text-center py-6 md:py-1 relative">
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 rounded-full text-sm font-semibold mb-6 transform -rotate-3"
          >
            
            Welcome, Kingdom Pager
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tighter">
            <span className="block">READ. CONNECT.</span>
            <span className="block highlight-scribble">
              BE INSPIRED.
           </span>
          </h1>

          <p className="max-w-xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
            <em>Enjoy stories and poems of faith, hope and love. Expect to be transported into a realm of infinite possibilities, fill your thoughts with great expectations of brighter days ahead and warm your heart with the deepest of affections as you journey through each piece </em>
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" asChild className="group bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
              <NavLink to="/library">
                Explore The Library
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </NavLink>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <NavLink to="/about">
                Our Story
              </NavLink>
            </Button>
          </div>
        </motion.div>

        <WavySeparator direction="down" className="text-background" />
        <div className="py-10 bg-background relative z-10">
          <h3 className="text-center text-xl font-semibold mb-8 text-muted-foreground">Discover Our Collection</h3>

        <BookCarousel />

        </div>
        <WavySeparator direction="up" className="text-background" />
         <section id="features" className="container mx-auto px-4 relative z-10">
         <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">A Canvas For Creativity</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground"> Everything you need to immerse yourself in the world of Holy Spirit inspired literary work.</p>
         </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 bg-white"
          style={{ perspective: '1000px' }} >
          <FeatureCard 
            icon={BookOpen}
            title="Start your journey of faith"
            description="As you’ve been reading, you may have been inspired to begin a new chapter in your life, believe in Jesus Christ, find out what’s next."
            delay={0.2}
            link="/salvation"
            linkText="Receive Salvation"
          />
          <FeatureCard 
            icon={Feather}
            title="Share your story"
            description="Has this platform personally inspired you in a way that you would like to share with us?"
            delay={0.4}
            link="/contact"
            linkText="Get In Touch"
          />
          <FeatureCard 
            icon={MessageSquare}
            title="Join the dialogue"
            description="Engage with a vibrant community. Share interpretations, explore inspired writings, and discuss the topics that matter most."
            delay={0.6}
            link="/comment-page"
            linkText="Start Commenting"
          />
        </div>
      </section>
      </section>   
    </div>
  );
};

export default HomePage;