import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Feather, MessageSquare } from 'lucide-react';
import { WavySeparator } from '@/components/WavySeparator';
import BookCarousel from "@/components/BookCarousel";

const AnimatedOrb = ({ className, initial, animate }) => (
  <motion.div className={`orb ${className}`} initial={initial} animate={animate}></motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, link, linkText, delay }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12.5deg', '-12.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12.5deg', '12.5deg']);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative h-full"
    >
      <div className="h-full text-center p-6 md:p-8 glassmorphism rounded-2xl flex flex-col aurora-card">
        <div className="mb-4 inline-block p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full text-primary">
          <Icon size={32} />
        </div>
        <h3 className="text-2xl mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-6 flex-grow text-left">{description}</p>
        <Button asChild variant="outline">
          <NavLink to={link} className="group">
            {linkText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </NavLink>
        </Button>
      </div>
    </motion.div>
  );
};

const HomePage = () => {
  return (
    <div className="space-y-10 md:space-y-10 overflow-hidden relative">
      {/* Animated Orbs */}
      <div className="creative-bg">
        <AnimatedOrb className="orb-1" initial={{ top: '10%', left: '10%' }} animate={{
          top: ['10%', '60%', '20%', '10%'],
          left: ['10%', '70%', '50%', '10%'],
          transition: { duration: 40, repeat: Infinity, ease: 'easeInOut' }
        }} />
        <AnimatedOrb className="orb-2" initial={{ top: '80%', left: '80%' }} animate={{
          top: ['80%', '20%', '70%', '80%'],
          left: ['80%', '30%', '90%', '80%'],
          transition: { duration: 35, repeat: Infinity, ease: 'easeInOut' }
        }} />
        <AnimatedOrb className="orb-3" initial={{ top: '50%', left: '50%' }} animate={{
          top: ['50%', '10%', '90%', '50%'],
          left: ['50%', '90%', '10%', '50%'],
          transition: { duration: 45, repeat: Infinity, ease: 'easeInOut' }
        }} />

        {/* Wavy Circle Art Elements */}
        <motion.div className="absolute top-[10%] left-[15%] w-72 h-72 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-2xl z-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div className="absolute bottom-[15%] right-[10%] w-96 h-96 rounded-full bg-gradient-to-tr from-secondary/30 to-primary/30 blur-3xl z-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div className="absolute top-[50%] left-[50%] w-60 h-60 rounded-full bg-gradient-to-bl from-primary/20 to-secondary/20 blur-2xl z-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      {/* Hero Section */}
      <section id="home" className="text-left py-8 md:py-12 relative">
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative z-10 max-w-6xl mx-auto px-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-4 bg-primary/10 text-primary px-4 rounded-full text-sm mb-2 transform -rotate-3"
          >
            Welcome, Kingdom Pager
          </motion.div>
          <h1 className="text-6xl md:text-8xl mb-6 leading-none tracking-tighter">
            <span className="block">Read. Connect.</span>
            <span className="block highlight-scribble">Be Inspired.</span>
          </h1>

          <div className="flex flex-col md:flex-row items-start gap-8 mt-6">
            <div className="flex flex-col gap-6 md:w-1/2">
              <p className="text-lg md:text-xl text-muted-foreground">
                <em>
                  Enjoy stories and poems of faith, hope and love. Expect to be transported into a realm of infinite possibilities, fill your thoughts with great expectations of brighter days ahead and warm your heart with the deepest of affections as you journey through each piece
                </em>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="sm" asChild className="group bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
                  <NavLink to="/library">
                    Explore The Library
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </NavLink>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <NavLink to="/about">Our Story</NavLink>
                </Button>
              </div>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src="./assets/HomePagePicture.png"
                alt="Hero Art"
                className="w-[400px] h-auto object-cover rounded-xl"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Carousel Section */}
      <WavySeparator direction="down" className="text-background" />
      <div className="bg-background relative z-10">
        <h3 className="text-center text-xl text-muted-foreground">Discover Our Collection</h3>
        <BookCarousel />
      </div>
      <WavySeparator direction="up" className="text-background" />

         {/* Feature Cards Section */}
         <section id="features" className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">A Canvas For Creativity</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-left">
            Everything you need to immerse yourself in the world of Holy Spirit inspired literary work.
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 bg-transparent"
          style={{ perspective: '1000px' }}
        >
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
    </div>
  );
};

export default HomePage;
