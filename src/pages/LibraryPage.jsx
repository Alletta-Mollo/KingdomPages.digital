import React, { useState, useMemo, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from "@/components/ui/slider";
import { Search, Filter, Clock, FileText, Book, Frown } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { libraryData } from '@/data/libraryData';
import { PencilLine } from 'lucide-react';


const genres = ["All", ...new Set(libraryData.map(item => item.genre))];
const authors = ["All", ...new Set(libraryData.map(item => item.author))];

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedAuthor, setSelectedAuthor] = useState('All');
  const [lengthRange, setLengthRange] = useState([0, 200]);
  const [sortBy, setSortBy] = useState('title_asc');
  const scrollRefs = useRef({});

  const filteredAndSortedData = useMemo(() => {
    let items = libraryData;

    if (searchTerm) {
      items = items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedGenre !== 'All') {
      items = items.filter(item => item.genre === selectedGenre);
    }
    if (selectedAuthor !== 'All') {
      items = items.filter(item => item.author === selectedAuthor);
    }
    items = items.filter(item => item.length >= lengthRange[0] && item.length <= lengthRange[1]);

    items.sort((a, b) => {
      if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title_desc') return b.title.localeCompare(a.title);
      if (sortBy === 'author_asc') return a.author.localeCompare(b.author);
      if (sortBy === 'author_desc') return b.author.localeCompare(a.author);
      return 0;
    });

    return items;
  }, [searchTerm, selectedGenre, selectedAuthor, lengthRange, sortBy]);

  const groupedByGenre = useMemo(() => {
    const groups = {};
    filteredAndSortedData.forEach(item => {
      const genre = item.genre || 'Uncategorized';
      if (!groups[genre]) groups[genre] = [];
      groups[genre].push(item);
    });
    return groups;
  }, [filteredAndSortedData]);

  const scrollGenre = (genre, direction) => {
    const container = scrollRefs.current[genre];
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="library" className="space-y-8 scroll-mt-20 pt-16 px-4">
      <div className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-xl shadow-lg glassmorphism">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-4xl font-bold gradient-text">Our Digital Library</h1>
          <Button variant="outline" className="md:hidden flex items-center gap-2">
            <Filter size={18} /> Filters
          </Button>
        </div>

        <div className="relative mb-6">
          <Input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-lg h-12 bg-background/80 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <Label htmlFor="genre-select" className="text-sm font-medium text-foreground/80">Genre</Label>
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger id="genre-select" className="w-full bg-background/80">
                <SelectValue placeholder="Filter by genre" />
              </SelectTrigger>
              <SelectContent>
                {genres.map(genre => (
                  <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="author-select" className="text-sm font-medium text-foreground/80">Author</Label>
            <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
              <SelectTrigger id="author-select" className="w-full bg-background/80">
                <SelectValue placeholder="Filter by author" />
              </SelectTrigger>
              <SelectContent>
                {authors.map(author => (
                  <SelectItem key={author} value={author}>{author}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="lg:col-span-2">
            <Label htmlFor="length-slider" className="text-sm font-medium text-foreground/80">
              Length (pages/issues): {lengthRange[0]} - {lengthRange[1]}
            </Label>
            <Slider
              id="length-slider"
              min={0}
              max={200}
              step={10}
              value={lengthRange}
              onValueChange={setLengthRange}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="sort-select" className="text-sm font-medium text-foreground/80">Sort By</Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-select" className="w-full bg-background/80">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="title_asc">Title (A-Z)</SelectItem>
                <SelectItem value="title_desc">Title (Z-A)</SelectItem>
                <SelectItem value="author_asc">Author (A-Z)</SelectItem>
                <SelectItem value="author_desc">Author (Z-A)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {Object.entries(groupedByGenre).map(([genre, items]) => (
        <div key={genre} className="space-y-4">
          <h2 className="text-2xl font-semibold gradient-text">{genre}</h2>

          <div
            ref={el => (scrollRefs.current[genre] = el)}
            className="flex space-x-4 overflow-x-auto pb-2 scroll-smooth"
          >
            {items.map(item => (
              <Card key={item.id} className="min-w-[250px] max-w-[300px] flex-shrink-0">
                <CardHeader className="p-0">
                  <NavLink to={`/read/${item.id}`} className="block">
                    <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center overflow-hidden">
                      <img src={item.picture} alt={item.title} className="object-cover h-full w-full opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </NavLink>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-xl mb-1 gradient-text">{item.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mb-2">By {item.author}</CardDescription>
                  <div className="flex items-center space-x-4 text-xs text-foreground/70">
                    {item.type === 'PDF' ? (
                      <span className="flex items-center"><FileText size={14} className="mr-1 text-red-500" /> {item.type}</span>
                    ) : (
                      <span className="flex items-center"><Book size={14} className="mr-1 text-primary" /> {item.type}</span>
                    )}
                                 <span className="flex items-center"><Clock size={14} className="mr-1 text-secondary" /> {item.length} pages</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 border-t border-border/50">
                  <CardDescription className="text-xs mb-1 gradient-text">{item.collection}</CardDescription>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Mobile arrows at the bottom */}
          {/* <div className="flex justify-between items-center md:hidden mt-2">
            <Button onClick={() => scrollGenre(genre, 'left')} variant="ghost">←</Button>
            <Button onClick={() => scrollGenre(genre, 'right')} variant="ghost">→</Button>
          </div> */}
        </div>
      ))}

      {filteredAndSortedData.length === 0 && (
        <div className="text-center py-16 px-6 bg-card/50 rounded-xl glassmorphism">
          <Frown size={48} className="mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">Nothing Found</h2>
          <p className="text-lg text-muted-foreground">
            We couldn't find any items matching your search or filter criteria.
          </p>
          <p className="text-muted-foreground mt-1">
            Please try adjusting your filters or search term.
          </p>
        </div>
      )}
     <button
       onClick={() => window.location.href = '/comment-page'}
       className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-full shadow-xl hover:scale-105 transition-all"
       aria-label="Go to Community"
      >
      <PencilLine size={24} />
      </button>
    </section>
  );
};

export default LibraryPage;
