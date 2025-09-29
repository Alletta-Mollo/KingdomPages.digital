import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, BookHeart, Sparkles, Feather, PencilLine } from 'lucide-react';
import { WavySeparator } from '@/components/WavySeparator';
import NarrationButton from '@/components/NarrationButton';

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
    <div className="text-4xl gradient-text">{value}</div>
    <div className="text-sm text-foreground/80">{label}</div>
  </motion.div>
);

const AboutPage = () => {
  return (
    <div className="space-y-16 relative">
      <div className="creative-blob w-96 h-96 bg-primary/10 top-1/4 -left-32 animate-pulse" />
      <div className="creative-blob w-72 h-72 bg-secondary/10 bottom-1/4 -right-32" />

      {/* About Section */}
      <section id="about" className="overflow-visible py-12 md:py-16 bg-gradient-to-bl from-purple-100/30 via-transparent to-blue-100/20 rounded-xl shadow-inner scroll-mt-20">
        <motion.h1
          className="pb-1 min-h-[80px] text-5xl md:text-6xl mb-4 gradient-text leading-tight text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          About Kingdom Pages
        </motion.h1>

        <motion.p
          className="pt-4 text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto text-left"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          Kingdom Pages is a product of the Loveworld Sons of Ministry. The Loveworld Sons of Ministry (SOM) is a global network of pastors’ and ministers’ children committed to equipping the next generation for life and ministry. Kingdom Pages was birthed as a response to the need for more Kingdom inspired literature. It is a faith-driven digital library that brings together Christian stories, poems, and books that inspire faith, edify believers, and draw people into a personal relationship with Jesus Christ. Our mission is to make the Christian life tangible and relatable through literature that transforms hearts, renews minds, and strengthens the Kingdom of God.
        </motion.p>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-left mb-12 gradient-text">Our Journey & Mission</h2>
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
                <h3 className="text-2xl text-foreground">Our Mission</h3>
              </div>
              <p className="text-foreground/80 text-left">
                To spread the Gospel of Jesus Christ and edify believers through Spirit-inspired literature that transforms lives, nurtures faith, and builds the Kingdom of God.
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center mb-2">
                <BookHeart size={28} className="mr-3 text-secondary" />
                <h3 className="text-2xl text-foreground">Our Vision</h3>
              </div>
              <p className="text-foreground/80 text-left">
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
              src="https://images.unsplash.com/photo-1674858161001-b5bfc4a311dd"
            />
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 md:py-16 bg-card/80 rounded-xl shadow-xl glassmorphism">
      <h2 className="text-3xl md:text-4xl text-center mb-12 gradient-text">Impact by Numbers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
        <div className="flex flex-col h-full">
          <StatCard
            icon={BookHeart}
            value="29+"
            label="Digital Items"
            color="border-primary"
            delay={0.1}
          />
        </div>
        <div className="flex flex-col h-full">
          <StatCard
            icon={Sparkles}
            value="3+"
            label="Contributing Authors"
            color="border-accent"
            delay={0.5}
          />
        </div>
      
      </div>
    </section>


      {/* Floating Button */}
      <button
        onClick={() => window.location.href = '/comment-page'}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-xl hover:scale-105 transition-all"
        aria-label="Go to Community"
      >
        <PencilLine size={24} />
      </button>
    </div>
  );
};

export default AboutPage;
