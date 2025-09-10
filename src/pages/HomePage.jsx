import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Feather, MessageSquare, PenTool } from 'lucide-react';
import { libraryData } from '@/data/libraryData';

const AnimatedOrb = ({ className, initial, animate }) => (
  <motion.div
    className={`orb ${className}`}
    initial={initial}
    animate={animate}
  ></motion.div>
);

const FeatureCard = ({ icon: Icon, title, description, link, linkText, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <div className="h-full text-center p-6 md:p-8 glassmorphism hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300 rounded-2xl flex flex-col">
        <div className="mb-4 inline-block p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full text-primary">
          <Icon size={32} />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
        <Button asChild variant="outline">
          <NavLink to={link} className="group">
            {linkText} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </NavLink>
        </Button>
      </div>
    </motion.div>
  );
};

const authors = [...new Set(libraryData.map(item => item.author))];

const Marquee = () => {
  return (
    <div className="relative flex w-full overflow-x-hidden">
      <div className="marquee">
        <div className="marquee__content">
          {authors.map(author => (
            <div key={author} className="flex items-center space-x-2 mx-4">
              <PenTool className="text-primary" />
              <span className="text-lg font-medium text-foreground">{author}</span>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="marquee__content">
           {authors.map(author => (
            <div key={author} className="flex items-center space-x-2 mx-4">
              <PenTool className="text-primary" />
              <span className="text-lg font-medium text-foreground">{author}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const HomePage = () => {
  return (
    <div className="space-y-24 md:space-y-32 overflow-hidden">
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

      <section id="home" className="text-center py-20 md:py-32 relative">
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
            className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-semibold mb-4"
          >
            Welcome to a Universe of Words
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="gradient-text">Unfold Your Imagination.</span><br/>
            <span className="text-foreground">Discover, Read, Create.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
            A sanctuary for poets, storytellers, and dreamers. Dive into a curated library of art forms or share your own voice with the world.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" asChild className="group bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
              <NavLink to="/library">
                Explore the Library
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
      </section>
      
       <section className="py-12 glassmorphism relative z-10">
        <h3 className="text-center text-xl font-semibold mb-8 text-muted-foreground">Featured Authors</h3>
        <Marquee />
      </section>

      <section id="features" className="container mx-auto px-4 relative z-10">
         <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">A Canvas for Creativity</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">Everything you need to immerse yourself in the world of literature and art.</p>
         </div>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BookOpen}
              title="Curated Library"
              description="Explore a diverse collection of poems, stories, and comics from talented artists around the globe."
              delay={0.2}
              link="/library"
              linkText="Start Reading"
            />
            <FeatureCard 
              icon={Feather}
              title="Share Your Story"
              description="Have a story to tell? We'd love to hear it. Connect with us to get your work featured on our platform."
              delay={0.4}
              link="/contact"
              linkText="Get in Touch"
            />
            <FeatureCard 
              icon={MessageSquare}
              title="Join the Dialogue"
              description="Connect with fellow readers and creators. Discuss works, share interpretations, and build community."
              delay={0.6}
              link="/library"
              linkText="Start Commenting"
            />
         </div>
      </section>
      
      <section className="container mx-auto text-center py-20 relative z-10">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glassmorphism p-10 md:p-16 rounded-2xl"
        >
          <h2 className="text-4xl font-bold mb-4 gradient-text">Ready to Begin Your Next Chapter?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            The next story that will change your perspective is just a click away.
          </p>
          <Button size="lg" asChild className="group bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
             <NavLink to="/library">
                Take Me to the Library <BookOpen className="ml-2 h-5 w-5 transition-transform group-hover:rotate-3"/>
            </NavLink>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;