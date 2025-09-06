import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const FeatureCard = ({ icon, title, description, delay, link, linkText }) => {
  const Icon = icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full text-center p-6 glassmorphism hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300">
        <div className="mb-4 inline-block p-4 bg-gradient-to-br from-primary to-secondary rounded-full text-primary-foreground">
          <Icon size={32} />
        </div>
        <CardTitle className="text-2xl font-bold mb-2 gradient-text">{title}</CardTitle>
        <CardDescription className="text-foreground/80 mb-6">{description}</CardDescription>
        <Button asChild>
          <NavLink to={link} className="group">
            {linkText} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </NavLink>
        </Button>
      </Card>
    </motion.div>
  );
};

const HomePage = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section id="home" className="text-center py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="gradient-text">Stories that Inspire,</span><br/>
            <span className="text-foreground">Faith that Endures.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80 mb-10">
            Welcome to Kingdom Pages, your sanctuary for uplifting Christian digital content. Explore a world of books, comics, and stories designed to nourish your spirit and ignite your imagination.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" asChild className="group">
              <NavLink to="/library">
                Explore the Library
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </NavLink>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <NavLink to="/about">
                Learn More
              </NavLink>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4">
         <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Discover What We Offer</h2>
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={BookOpen}
              title="Vast Digital Library"
              description="Access a growing collection of books, comics, and stories. From timeless classics to modern tales of faith."
              delay={0.2}
              link="/library"
              linkText="Browse Now"
            />
            <FeatureCard 
              icon={Users}
              title="Community &amp; Discussion"
              description="Join a community of readers. Share your thoughts, leave comments, and grow together in faith."
              delay={0.4}
              link="/about"
              linkText="Our Mission"
            />
            <FeatureCard 
              icon={Mail}
              title="Connect With Us"
              description="Have questions or want to contribute? Our team is here to help. Get in touch with us easily."
              delay={0.6}
              link="/contact"
              linkText="Contact Us"
            />
         </div>
      </section>
      
      {/* Call to Action */}
      <section className="container mx-auto text-center py-16">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground p-10 rounded-xl shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Dive into a story today and let your faith be rekindled.
          </p>
          <Button size="lg" variant="secondary" asChild className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group">
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