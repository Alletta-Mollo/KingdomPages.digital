import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight, BookOpen, MessageCircle, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const SalvationPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="space-y-16 relative">
      <div className="creative-blob w-96 h-96 bg-primary/10 top-1/4 -right-48 animate-pulse" />
      <div className="creative-blob w-72 h-72 bg-accent/10 bottom-1/4 -left-48" />

      <section className="text-center py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 -z-10"></div>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="container mx-auto px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-block p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full text-primary mb-6"
          >
            <Heart size={48} strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="gradient-text">A Step of Faith</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
            Embracing a new beginning is the most courageous journey one can take. We are here to walk alongside you.
          </p>
        </motion.div>
      </section>

      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto glassmorphism p-8 md:p-12 rounded-2xl shadow-xl aurora-card"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">The Path to Salvation</h2>
          <div className="space-y-6 text-lg text-foreground/90 leading-relaxed">
            <p>
              The Bible teaches that salvation is a gift from God, offered freely to all who believe in His Son, Jesus Christ. It's not something we can earn through good works, but something we receive through faith.
            </p>
            <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-muted-foreground">
              "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life." - John 3:16
            </blockquote>
            <p>
              If you feel a stirring in your heart and wish to accept this gift, you can express your faith through a simple prayer. Prayer is just talking to God. He knows your heart, and it's the attitude of your heart that He cares about.
            </p>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold text-xl mb-2 text-primary">A Sinner's Prayer</h3>
              <p className="italic">
                "Dear Lord Jesus, I know that I am a sinner, and I ask for Your forgiveness. I believe You died for my sins and rose from the dead. I turn from my sins and invite You to come into my heart and life. I want to trust and follow You as my Lord and Savior. In Your name, Amen."
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Your Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <Card className="p-6 text-center glassmorphism-card h-full flex flex-col items-center justify-center">
              <CardHeader className="p-0 mb-4">
                <div className="bg-primary/10 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Read Your Bible</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-muted-foreground">
                <CardDescription>
                  God's Word is a light for your path. Start by reading the Gospel of John to learn more about Jesus.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 text-center glassmorphism-card h-full flex flex-col items-center justify-center">
              <CardHeader className="p-0 mb-4">
                <div className="bg-secondary/10 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  <MessageCircle className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Talk to God</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-muted-foreground">
                <CardDescription>
                  Prayer is simply talking to God. Share your heart, your thanks, and your requests with Him daily.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 text-center glassmorphism-card h-full flex flex-col items-center justify-center">
              <CardHeader className="p-0 mb-4">
                <div className="bg-accent/10 p-3 rounded-full inline-flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-2xl">Find a Community</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-muted-foreground">
                <CardDescription>
                  Connect with a local church or a group of believers to grow in your faith and fellowship.
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto text-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">We're Here For You</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Making this decision is a monumental step. We would be honored to connect with you, pray for you, and help you find your next steps in this beautiful journey.
          </p>
          <Button size="lg" asChild className="group bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity text-base px-6 py-6 sm:px-8 sm:py-7">
            <NavLink to="/contact">
              I've made a decision today
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </NavLink>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default SalvationPage;