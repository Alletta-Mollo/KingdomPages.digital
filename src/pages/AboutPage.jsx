import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, BookHeart, Sparkles, Feather } from 'lucide-react';
import { WavySeparator } from '@/components/WavySeparator';

const StatCard = ({ icon, value, label, color, delay }) => (
  <motion.div
    className={`p-6 rounded-xl shadow-lg text-center glassmorphism border-2 ${color} aurora-card`}
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className={`mx-auto mb-3 w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${color === 'border-primary' ? 'from-primary to-purple-400' : color === 'border-secondary' ? 'from-secondary to-blue-400' : 'from-accent to-green-400'} text-primary-foreground`}>
      {React.createElement(icon, { size: 32 })}
    </div>
    <div className="text-4xl font-bold gradient-text">{value}</div>
    <div className="text-sm text-foreground/80">{label}</div>
  </motion.div>
);

const TimelineItem = ({ date, title, description, icon, align, delay }) => (
  <motion.div
    className={`relative flex items-center w-full mb-8 ${align === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'}`}
    initial={{ opacity: 0, x: align === 'left' ? 50 : -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="hidden md:block w-5/12"></div>
    <div className="z-10 flex items-center justify-center w-12 h-12 rounded-full shadow-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">
      {React.createElement(icon, { size: 24 })}
    </div>
    <div className={`w-full md:w-5/12 px-6 py-4 bg-card rounded-lg shadow-xl ${align === 'left' ? 'md:text-right' : 'md:text-left'} aurora-card`}>
      <p className="mb-2 text-sm font-semibold text-primary">{date}</p>
      <h4 className="mb-2 font-bold text-lg text-foreground">{title}</h4>
      <p className="text-sm leading-snug tracking-wide text-foreground/80">
        {description}
      </p>
    </div>
  </motion.div>
);


const AboutPage = () => {
  return (
    <div className="space-y-16 relative">
       <div className="creative-blob w-96 h-96 bg-primary/10 top-1/4 -left-32 animate-pulse" />
       <div className="creative-blob w-72 h-72 bg-secondary/10 bottom-1/4 -right-32" />

      <section id="about" className="text-center py-12 md:py-16 bg-gradient-to-bl from-purple-100/30 via-transparent to-blue-100/20 rounded-xl shadow-inner scroll-mt-20">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          About Kingdom Pages
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          Kingdom Pages is a faith-driven digital library that brings together Christian stories, poems, and books that inspire faith, edify believers, and draws people into a personal relationship with Jesus Christ. Our mission is to make the Christian life tangible and relatable through literature that transforms hearts, renews minds, and strengthens the Kingdom of God
        </motion.p>
      </section>

      <section className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">Our Journey & Mission</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6 p-6 rounded-lg bg-card shadow-xl glassmorphism aurora-card"
          >
            <div>
              <div className="flex items-center mb-2">
                <Target size={28} className="mr-3 text-primary" />
                <h3 className="text-2xl font-semibold text-foreground">Our Mission</h3>
              </div>
              <p className="text-foreground/80">
                To spread the Gospel of Jesus Christ and edify believers through Spirit-inspired literature that transforms lives, nurtures faith, and builds the Kingdom of God. </p>
            </div>
            <div>
              <div className="flex items-center mb-2">
                <BookHeart size={28} className="mr-3 text-secondary" />
                <h3 className="text-2xl font-semibold text-foreground">Our Vision</h3>
              </div>
              <p className="text-foreground/80">
                To be the leading Christian digital library where millions worldwide encounter Jesus, grow spiritually, and are inspired through books, poems, stories, and creative expressions.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-2xl"
          >
            <img
              alt="Diverse group of people reading and interacting with digital devices in a bright, hopeful setting"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1674858161001-b5bfc4a311dd" />
          </motion.div>
        </div>
      </section>
      
      <section className="relative py-12 -mx-4 sm:-mx-6 lg:-mx-8">
        <WavySeparator direction="down" className="text-card" />
        <div className="bg-card py-24 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text">Our Milestones</h2>
            <div className="relative wrap overflow-hidden p-2 md:p-10 h-full container mx-auto">
              <div className="absolute border-opacity-20 border-primary h-full border-2 left-1/2 -translate-x-1/2 z-0"></div>
              <TimelineItem
                date="2025 - Q2"
                title="The Spark of an Idea"
                description= "© Kingdom Pages — Birthed by the Holy Spirit"
                icon={Sparkles}
                align="right"
                delay={0.1}
              />
              <TimelineItem
                date="2025 - Q2"
                title="Platform Development Begins"
                description="Stories are submitted. A website is created to host and present them."
                icon={Feather}
                align="left"
                delay={0.2}
              />
              <TimelineItem
                date="2024 - Q3"
                title="Official Website Launch "
                description= "The library is open. Every reader can access all inspired material"
                icon={Users}
                align="right"
                delay={0.3}
              />
            </div>
        </div>
        <WavySeparator direction="up" className="text-card" />
      </section>

      <section className="py-12 md:py-16 bg-card/80 rounded-xl shadow-xl glassmorphism">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">Impact by Numbers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
          <StatCard icon={BookHeart} value="23+" label="Digital Items" color="border-primary" delay={0.1} />
          <StatCard icon={Users} value="+" label="Active Readers" color="border-secondary" delay={0.3} />
          <StatCard icon={Sparkles} value="2+" label="Contributing Authors" color="border-accent" delay={0.5} />
        </div>
      </section>
      
      <section className="text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6 gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Join Our Story
        </motion.h2>
        <motion.p 
          className="text-lg text-foreground/80 max-w-xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Become a part of the Kingdom Pages family. Explore, learn, and grow with us.
        </motion.p>
      </section>
    </div>
  );
};

export default AboutPage;