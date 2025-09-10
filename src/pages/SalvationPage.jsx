import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import { Cross, Heart, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

const StepCard = ({ icon, title, description, delay }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="text-center p-6 glassmorphism rounded-2xl h-full flex flex-col"
        >
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                {React.createElement(icon, { size: 32 })}
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
            <p className="text-muted-foreground flex-grow">{description}</p>
        </motion.div>
    );
};

const SalvationPage = () => {
  const handlePrayerClick = () => {
    // In a real app, this could open a modal, track an event, or navigate.
    // For now, we'll just log to console.
    console.log("Prayer button clicked.");
  };

  return (
    <div className="space-y-16 md:space-y-24">
      <section className="text-center py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent rounded-xl">
        <div className="creative-bg">
            <div className="orb orb-1" style={{ top: '10%', left: '70%', animation: 'none', transform: 'translate(-50%, -50%)', opacity: 0.1 }}></div>
            <div className="orb orb-2" style={{ top: '80%', left: '20%', animation: 'none', transform: 'translate(-50%, -50%)', opacity: 0.1 }}></div>
        </div>
        <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
        >
            <motion.div 
                className="inline-block p-4 bg-gradient-to-br from-primary to-secondary rounded-full mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
            >
                <Cross size={40} className="text-primary-foreground" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 gradient-text">The Path to Salvation</h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                Discover the most important journey you will ever take. A journey of faith, hope, and eternal life.
            </p>
        </motion.div>
      </section>

      <section className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">The ABCs of Salvation</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground">A simple way to understand the steps to accepting Jesus Christ as your Lord and Savior.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <StepCard 
                icon={Heart}
                title="A - Admit"
                description="Admit that you are a sinner. Romans 3:23 says, 'for all have sinned and fall short of the glory of God.'"
                delay={0.2}
            />
            <StepCard 
                icon={BookOpen}
                title="B - Believe"
                description="Believe in your heart that Jesus Christ died for your sins, was buried, and that God raised Jesus from the dead. Romans 10:9-10 explains this step."
                delay={0.4}
            />
            <StepCard 
                icon={CheckCircle}
                title="C - Confess"
                description="Confess with your mouth that Jesus is Lord. This public declaration of faith is a powerful step in your new journey. (Romans 10:9)"
                delay={0.6}
            />
        </div>
      </section>

      <section className="container mx-auto text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glassmorphism p-10 md:p-16 rounded-2xl"
        >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A Prayer of Salvation</h2>
            <p className="text-lg mb-8 max-w-3xl mx-auto text-muted-foreground">
                If you believe these truths, you can express your faith through a prayer like this. Saying this prayer is a way to declare to God that you are relying on Jesus Christ for your salvation.
            </p>
            <blockquote className="text-lg italic text-foreground/90 border-l-4 border-primary pl-6 py-4 my-8 bg-background/50 rounded-r-lg max-w-2xl mx-auto">
                "Dear Lord Jesus, I know that I am a sinner, and I ask for Your forgiveness. I believe You died for my sins and rose from the dead. I turn from my sins and invite You to come into my heart and life. I want to trust and follow You as my Lord and Savior. In Your name, Amen."
            </blockquote>
             <Button size="lg" onClick={handlePrayerClick} className="group bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity">
                I Have Made a Decision Today
                <Heart className="ml-2 h-5 w-5 transition-transform group-hover:scale-110" />
            </Button>
        </motion.div>
      </section>
      
      <section className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">What's Next?</h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Your journey is just beginning! Explore our resources to grow in your new faith.
        </p>
        <Button size="lg" asChild variant="outline">
          <NavLink to="/library" className="group">
            Explore a Story <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </NavLink>
        </Button>
      </section>

    </div>
  );
};

export default SalvationPage;