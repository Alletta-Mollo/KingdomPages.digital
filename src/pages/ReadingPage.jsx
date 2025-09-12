import React, { useState, useEffect } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getLibraryItemById } from '@/data/libraryData'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft, ChevronRight, Home, BookOpenText, FileText, ExternalLink, Send, MessageCircle, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet-async';

const ReadingPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [item, setItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);
  const [direction, setDirection] = useState(0);

  const [comments, setComments] = useState([]);
  const [commenterName, setCommenterName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const libraryItem = getLibraryItemById(itemId);
    if (!libraryItem) {
      navigate('/');
      return;
    }

    setItem(libraryItem);

    if (libraryItem.type !== 'PDF' && libraryItem.content) {
      const wordsPerSegment = 150; 
      const words = libraryItem.content.split(/\s+/);
      const segments = [];
      for (let i = 0; i < words.length; i += wordsPerSegment) {
        segments.push(words.slice(i, i + wordsPerSegment).join(' '));
      }
      setPages(segments);
    } else {
      setPages([]);
    }
    
    const storedComments = JSON.parse(localStorage.getItem(`comments_${itemId}`)) || [];
    setComments(storedComments);
    
    setCurrentPage(0); 
  }, [itemId, navigate]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commenterName.trim() || !newComment.trim()) {
      toast({
        title: "Incomplete Field",
        description: "Please enter your name and a comment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const comment = {
      id: uuidv4(),
      name: commenterName,
      text: newComment,
      timestamp: new Date().toISOString(),
    };

    setTimeout(() => {
      const updatedComments = [...comments, comment];
      setComments(updatedComments);
      localStorage.setItem(`comments_${itemId}`, JSON.stringify(updatedComments));
      
      setNewComment('');
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: "Your comment has been posted.",
      });
    }, 500);
  };

  const nextPage = () => {
    if (item && item.type !== 'PDF' && currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (item && item.type !== 'PDF' && currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <Helmet>
            <title>Loading... | Kingdom Pages</title>
        </Helmet>
        <BookOpenText size={64} className="text-primary mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold gradient-text mb-2">Loading Content...</h1>
        <p className="text-muted-foreground">Please wait while we fetch the material.</p>
        <Button asChild variant="link" className="mt-4">
            <NavLink to="/">Back to Home</NavLink>
        </Button>
      </div>
    );
  }

  const pageVariants = {
    initial: dir => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0, scale: 0.9 }),
    animate: { x: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 20, duration: 0.5 } },
    exit: dir => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0, scale: 0.9, transition: { type: "spring", stiffness: 120, damping: 20, duration: 0.3 } })
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-4 md:p-8"
    >
      <Helmet>
        <title>{item.title} | Kingdom Pages</title>
        <meta name="description" content={`Read "${item.title}" by ${item.author}. Part of the Kingdom Pages digital library.`} />
        <meta property="og:title" content={`${item.title} | Kingdom Pages`} />
        <meta property="og:description" content={`Read "${item.title}" by ${item.author}. Part of the Kingdom Pages digital library.`} />
      </Helmet>
      <Card className="shadow-2xl overflow-hidden glassmorphism border-primary/20">
        <CardHeader className="bg-gradient-to-br from-primary/10 via-secondary/10 to-green-400/10 p-6">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center space-x-2">
              {item.type === 'PDF' ? <FileText className="h-8 w-8 text-red-500" /> : <BookOpenText className="h-8 w-8 text-primary" />}
              <CardTitle className="text-3xl md:text-4xl gradient-text mb-1">{item.title}</CardTitle>
            </div>
            <CardDescription className="text-md text-muted-foreground ml-10">By {item.author} - {item.type}</CardDescription>
          </motion.div>
        </CardHeader>
        
        <CardContent className="p-0 md:p-0 min-h-[500px] md:min-h-[70vh] flex flex-col justify-between relative overflow-hidden">
          {item.type === 'PDF' && item.pdfUrl ? (
            <iframe
              src={item.pdfUrl}
              title={item.title}
              className="w-full h-[calc(70vh-0px)] md:h-[calc(70vh-0px)] border-0"
              allowFullScreen
            >
              <p>Your browser does not support PDFs. Please download the PDF to view it: <a href={item.pdfUrl}>Download PDF</a>.</p>
            </iframe>
          ) : pages.length > 0 ? (
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentPage}
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line prose max-w-none flex-grow"
                  style={{ perspective: "1000px" }} 
                >
                  {pages[currentPage]}
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/50">
                <Button onClick={prevPage} disabled={currentPage === 0} variant="outline" className="group">
                  <ChevronLeft size={20} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" /> Previous
                </Button>
                <span className="text-sm text-muted-foreground">Page {currentPage + 1} of {pages.length}</span>
                <Button onClick={nextPage} disabled={currentPage === pages.length - 1} variant="outline" className="group">
                  Next <ChevronRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ) : (
             <div className="p-6 md:p-8 flex-grow flex items-center justify-center">
                <p className="text-muted-foreground text-xl">Content not available for this item.</p>
             </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="mt-8 shadow-xl glassmorphism">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text"><MessageCircle/> Community Comments</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-4">
            {comments.length > 0 ? (
              comments.map(comment => (
                <motion.div 
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-3 bg-card p-4 rounded-lg border"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                    <User size={18} />
                  </div>
                  <div className="flex-grow">
                    <p className="font-semibold text-foreground">{comment.name}</p>
                    <p className="text-foreground/80">{comment.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(comment.timestamp).toLocaleString()}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-4">Be the first to leave a comment!</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleCommentSubmit} className="w-full space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
               <div className="sm:col-span-1">
                 <Label htmlFor="commenterName">Your Name</Label>
                 <Input id="commenterName" value={commenterName} onChange={e => setCommenterName(e.target.value)} placeholder="e.g., John D." className="bg-background/80" />
               </div>
               <div className="sm:col-span-2">
                 <Label htmlFor="newComment">Your Comment</Label>
                 <Textarea id="newComment" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Share your thoughts..." className="bg-background/80" />
               </div>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary group">
              {isSubmitting ? 'Posting...' : <>Post Comment <Send size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" /></>}
            </Button>
          </form>
        </CardFooter>
      </Card>

      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <Button asChild variant="ghost" className="group w-full sm:w-auto">
          <NavLink to="/library">
            <BookOpenText size={18} className="mr-2 transition-transform duration-300 group-hover:rotate-[-5deg]" /> Back to Library
          </NavLink>
        </Button>
        {item.type === 'PDF' && item.pdfUrl && (
           <Button asChild variant="outline" className="group w-full sm:w-auto border-accent text-accent hover:bg-accent/10 hover:text-accent">
            <a href={item.pdfUrl} target="_blank" rel="noopener noreferrer">
              Open PDF in New Tab <ExternalLink size={18} className="ml-2 transition-transform duration-300 group-hover:scale-110" />
            </a>
          </Button>
        )}
        <Button asChild variant="ghost" className="group w-full sm:w-auto">
          <NavLink to="/">
             <Home size={18} className="mr-2 transition-transform duration-300 group-hover:scale-110" /> Go Home
          </NavLink>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ReadingPage;