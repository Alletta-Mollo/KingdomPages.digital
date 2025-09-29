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
    <div className="space-y-16 relative overflow-hidden">
      {/* Hero Section */}
      <section className="py-16 md:py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="container mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
            className="inline-block p-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full text-primary mb-6"
          >
            <Heart size={48} strokeWidth={1.5} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
            <span className="gradient-text">A Step Of Faith</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base md:text-lg text-muted-foreground mb-8 text-justify">
            Life without Christ will never be truly fulfilling and meaningful, we were all created by God to be in union with Him. It is our belief that as you have been reading the different stories and poems, something has taken place in your heart. If you didn’t already have that life giving connection, you have begun to recognise that you need it.
          </p>

          <p className="max-w-3xl mx-auto text-base md:text-lg text-muted-foreground mb-8 text-justify">
            The great news is that you can have that longing in your heart fulfilled today, you can become one with God in Christ Jesus. All it takes is your YES. Say yes to His Love and the perfect sacrifice of His son Jesus Christ dying to take away all your Sins. Say yes to a New Life, which is His Divine Life taking the place of your old life.
          </p>
        </motion.div>

        {/* Salvation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-4xl mx-auto glassmorphism p-8 md:p-12 rounded-2xl shadow-xl aurora-card"
        >
          <h2 className="text-3xl md:text-4xl text-center mb-8">The Steps Of Salvation</h2>
          <div className="space-y-6 text-base md:text-lg text-foreground/90 leading-relaxed text-left">
            <p>
              The Bible teaches that salvation is a gift from God, offered freely to all who believe in His Son, Jesus Christ. It's not something we can earn through good works, but something we receive through faith shown in our confession.
            </p>
            <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-muted-foreground">
              "9 If you declare with your mouth, “Jesus is Lord,” and believe in your heart that God raised him from the dead, you will be saved. 10 For it is with your heart that you believe and are justified, and it is with your mouth that you profess your faith and are saved." - Romans 10: 9 - 10
            </blockquote>
            <p>
              To accept this precious gift, you can express your faith through saying the following prayer. When you pray, you are communicating with God, He sees your heart and He hears you and will respond according to your faith.
            </p>
            <div className="p-6 bg-muted/50 rounded-lg">
              <h3 className="text-xl mb-2 text-primary text-center">Prayer of Salvation</h3>
              <p className="italic text-base md:text-lg text-left">
                "O Lord God, I believe with all my heart in Jesus Christ, Son of the living God. I believe He died for me and God raised Him from the dead. I believe He’s alive today. I confess with my mouth that Jesus Christ is the Lord of my life from this day. Through Him and in His Name, I have eternal life; I’m born again. Thank you Lord, for saving my soul! I’m now a child of God. Hallelujah!”
              </p>
            </div>
            <p className="text-center font-semibold">
              Congratulations! You are now a child of God. Welcome to this great family!
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              asChild
              className="group bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity text-base px-6 py-6 sm:px-8 sm:py-7"
            >
              <NavLink to="/contact" className="flex items-center">
                Reach Out to us
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </NavLink>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Next Steps Section */}
      <section className="container mx-auto px-4 py-2">
        <h2 className="text-3xl md:text-4xl text-center mb-12">Your Next Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <BookOpen className="h-8 w-8 text-primary" />,
              title: 'Read "Now That You Are Born Again"',
              description: (
                <p className="text-base md:text-lg text-left">
                  Learn about the step you just took in depth by reading this informative book <em>Now That You Are Born Again</em> by Rev Dr Chris Oyakhilome. You can access it{' '}
                  <a
                    href="https://nowthatyouarebornagain.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:text-primary/80"
                  >
                    here
                  </a>.
                </p>
              ),
              bg: 'bg-primary/10',
            },
            {
              icon: <MessageCircle className="h-8 w-8 text-secondary" />,
              title: 'Let us know',
              description: (
                <p className="text-base md:text-lg text-left">
                  Send us an email on admin@kingdompages.digital or submit the form on our contact us page.
                </p>
              ),
              bg: 'bg-secondary/10',
            },
            {
              icon: <Users className="h-8 w-8 text-accent" />,
              title: 'Find yourself connected to a church',
              description: (
                <p className="text-base md:text-lg text-left">
                  Connect with a Bible believing local church to grow in your faith and fellowship. We recommend finding any local Christ Embassy church aka Believers' Loveworld.
                </p>
              ),
              bg: 'bg-accent/10',
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 glassmorphism-card h-full flex flex-col items-start justify-start text-left">
                <CardHeader className="p-0 mb-4">
                  <div className={`${step.bg} p-3 rounded-full inline-flex items-center justify-center mb-4`}>
                    {step.icon}
                  </div>
                  <CardTitle className="text-2xl text-center">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-muted-foreground">
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SalvationPage;
