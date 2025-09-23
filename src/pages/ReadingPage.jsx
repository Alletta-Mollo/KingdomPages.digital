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
import PDFFlipbook from '@/components/PDFFlipbook';
import NarrationButton from '@/components/NarrationButton';



const formatContent = (text) => {
  if (!text) return null;

  const lines = text.split('\n');

  return lines.map((line, i) => {
    let formattedLine = line;

    // Handle ***bold***
    const boldRegex = /\*\*\*(.*?)\*\*\*/g;
    formattedLine = formattedLine.split(boldRegex).map((part, index) =>
      index % 2 === 1 ? <strong key={`b-${i}-${index}`}>{part}</strong> : part
    );

    // Handle ""gradient""
    const gradientRegex = /""(.*?)""/g;
    formattedLine = formattedLine.flatMap((part, index) => {
      if (typeof part === "string") {
        return part.split(gradientRegex).map((subPart, subIndex) =>
          subIndex % 2 === 1 ? (
            <span
              key={`g-${i}-${index}-${subIndex}`}
              className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              {subPart}
            </span>
          ) : (
            subPart
          )
        );
      }
      return part;
    });

    return <p key={`p-${i}`} className="mb-4">{formattedLine}</p>;
  });
};


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
    const lines = libraryItem.content.split('\n'); 
    const wordsPerSegment = 450; 
    const segments = [];

    let temp = [];
    let wordCount = 0;

  lines.forEach(line => {
    const lineWords = line.split(/\s+/);
    if (wordCount + lineWords.length > wordsPerSegment) {
      segments.push(temp.join('\n'));
      temp = [];
      wordCount = 0;
    }
    temp.push(line);
    wordCount += lineWords.length;
    });
    if (temp.length > 0) segments.push(temp.join('\n'));

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
      className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line max-w-none flex-grow pt-16" // Added pt-24 for top padding to prevent menu overlap
    >
      <Helmet>
        <title>{item.title} | Kingdom Pages</title>
        <meta name="description" content={`Read "${item.title}" by ${item.author}. Part of the Kingdom Pages digital library.`} />
        <meta property="og:title" content={`${item.title} | Kingdom Pages`} />
        <meta property="og:description" content={`Read "${item.title}" by ${item.author}. Part of the Kingdom Pages digital library.`} />
      </Helmet>

      <Card className="shadow-2xl overflow-hidden glassmorphism border-primary/20 relative z-10"> {/* Added relative z-10 */}
        <CardHeader className="bg-gradient-to-br from-primary/10 via-secondary/10 to-green-400/10 p-6 relative">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center space-x-2">
            {item.type === 'PDF' ? (
              <FileText className="h-8 w-8 text-red-500" />
            ) : (
              <BookOpenText className="h-8 w-8 text-primary" />
            )}
            <CardTitle className="text-3xl md:text-4xl gradient-text mb-1">{item.title}</CardTitle>
          </div>
          <CardDescription className="text-md text-muted-foreground ml-10">
            By {item.author} - {item.type}
          </CardDescription>
        </motion.div>

        {/* Narration Button Positioned Bottom Right */}
        <div className="absolute bottom-2 right-2">
          <NarrationButton text={pages[currentPage]} />
        </div>
      </CardHeader>

        
    <CardContent className="p-0 md:p-0 min-h-[500px] md:min-h-[70vh] flex flex-col justify-between relative overflow-hidden">
  {item.type === 'PDF' && item.pdfUrl ? (
  <PDFFlipbook pdfUrl={item.pdfUrl} />
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
          className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line max-w-none flex-grow"
          style={{ perspective: "1000px" }} 
        >
          {formatContent(pages[currentPage])}
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
      

      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10" // Added relative z-10
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