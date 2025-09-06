import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactInfoCard = ({ icon, title, content, href, delay }) => (
  <motion.div
    className="flex items-start space-x-4 p-6 bg-card rounded-xl shadow-lg glassmorphism"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-full flex items-center justify-center">
      {React.createElement(icon, { size: 24 })}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {href ? (
        <a href={href} className="text-primary hover:underline break-all">{content}</a>
      ) : (
        <p className="text-foreground/80 break-all">{content}</p>
      )}
    </div>
  </motion.div>
);

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, subject, message } = formData;
    const recipientEmail = "support@kingdompages.com";
    
    const mailtoSubject = encodeURIComponent(`[From ${name}] ${subject}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    
    const mailtoLink = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    window.location.href = mailtoLink;

    toast({
      title: "Email Client Opened",
      description: "Please complete sending the message in your email application.",
      variant: "default", 
    });
    
    setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-16">
      <section id="contact" className="text-center py-12 md:py-16 bg-gradient-to-br from-purple-100/30 via-blue-100/20 to-transparent rounded-xl shadow-inner scroll-mt-20">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Get In Touch
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out using this form
        </motion.p>
      </section>

      <section className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-6 gradient-text">Contact Information</h2>
            <ContactInfoCard icon={Mail} title="Email Us" content="admin@kingdompages.digital" href="mailto:admin@kingdompages.digital" delay={0.1} />
            <ContactInfoCard icon={Phone} title="Call Us" content="xxxx" href="tel:+15551234567" delay={0.2} />
            <ContactInfoCard icon={MapPin} title="Our Office" content="xxxx" delay={0.3} />
          </motion.div>

          <motion.div
            className="p-6 md:p-8 bg-card/90 rounded-xl shadow-2xl glassmorphism"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-foreground/80">Full Name</Label>
                <Input id="name" name="name" type="text" placeholder="John Doe" required value={formData.name} onChange={handleChange} className="bg-background/70" />
              </div>
              <div>
                <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required value={formData.email} onChange={handleChange} className="bg-background/70" />
              </div>
              <div>
                <Label htmlFor="subject" className="text-foreground/80">Subject</Label>
                <Input id="subject" name="subject" type="text" placeholder="I just gave my heart to Christ" required value={formData.subject} onChange={handleChange} className="bg-background/70" />
              </div>
              <div>
                <Label htmlFor="message" className="text-foreground/80">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message here..." required rows={5} value={formData.message} onChange={handleChange} className="bg-background/70" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg group" disabled={isSubmitting}>
                {isSubmitting ? 'Opening Email...' : (
                  <>
                    Send Message via Email <Send size={18} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Find Us On The Map</h2>
          <motion.div 
            className="w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl border-2 border-primary/20"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
             <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-118.3959,34.0887,-118.3939,34.0907&layer=mapnik&marker=34.0897,-118.3949"
                style={{border:0, width: '100%', height: '100%'}}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location on OpenStreetMap"
              ></iframe>
          </motion.div>
      </section>
    </div>
  );
};

export default ContactPage;