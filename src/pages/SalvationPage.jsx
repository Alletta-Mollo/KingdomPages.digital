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
             <em>I am ready to receive Jesus Christ as my Lord and Saviour, and start my walk of faith with Him.</em>
          </p>
        </motion.div>
   

     
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto glassmorphism p-8 md:p-12 rounded-2xl shadow-xl aurora-card"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">The Steps of Salvation</h2>
          <div className="space-y-6 text-lg text-foreground/90 leading-relaxed">
            <p>
              The Bible teaches that salvation is a gift from God, offered freely to all who believe in His Son, Jesus Christ. It's not something we can earn through good works, but something we receive through faith shown in our confession.
            </p>
            <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-muted-foreground">
             "9 If you declare with your mouth, “Jesus is Lord,” and believe in your heart that God raised him from the dead, you will be saved. 10 For it is with your heart that you believe and are justified, and it is with your mouth that you profess your faith and are saved." - Romans 10: 9 - 10
            </blockquote>
            <p>
              If you feel a stirring in your heart and wish to accept this precious gift, you can express your faith through saying the following Prayer. Prayer is a means of communicating to God. He knows your heart, and it's the attitude of your heart that He cares about.
            </p>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="font-semibold text-xl mb-2 text-primary">Prayer of Salvation</h3>
              <p className="italic">
                "O Lord God, I believe with all my heart in Jesus Christ, Son of the living God. I believe He died for me and God raised Him from the dead. I believe He’s alive today. I confess with my mouth that Jesus Christ is the Lord of my life from this day. Through Him and in His Name, I have eternal life; I’m born again. Thank you Lord, for saving my soul! I’m now a child of God. Hallelujah!”
                
                "Congratulations! You are now a child of God. We want to send you ministry resources to help you grow as a Christian. We would like to have your contact details so we can send you a book titled 'Now that you are born-again."
              </p>
            </div>
            <strong><center>Congratulations! You are now a child of God. Welcome to this great family!</center></strong>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-2">
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
                <CardTitle className="text-2xl">Read "Now That You Are Born Again"</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-muted-foreground">
               <CardDescription>
                  Learn about the step you just took in depth by reading this informative book <em>Now That You Are Born Again</em> by <strong> Rev Dr Chris Oyakhilome</strong>. You can access it{' '}
                  <a href="https://nowthatyouarebornagain.org" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
                    here
                  </a>.
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
                <CardTitle className="text-2xl">Let us know</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-muted-foreground">
                <CardDescription>
                  Send us an email on <strong>admin@kingdompages.digital</strong> or submit the form on our contact us page.
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
                <CardTitle className="text-2xl">Find yourself connected to a church</CardTitle>
              </CardHeader>
              <CardContent className="p-0 text-muted-foreground">
                <CardDescription>
                  Connect with a Bible believing local church to grow in your faith and fellowship, we recommend finding any local <strong>Christ Embassy church</strong> aka Believers' Loveworld.
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