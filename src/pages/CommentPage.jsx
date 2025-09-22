import React, { useState, useEffect } from 'react';
import { db, storage } from '@/firebaseConfig.js';
import { ref as dbRef, push, onValue } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { motion } from 'framer-motion';
import { MessageCircle, CornerDownRight } from 'lucide-react';

const CommentPage = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState([]);
  const [replyForm, setReplyForm] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const commentsRef = dbRef(db, 'comments');
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      const commentList = data
        ? Object.entries(data).map(([id, val]) => ({ id, ...val }))
        : [];
      setComments(commentList.reverse());
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';

    if (file) {
      const imageRef = storageRef(storage, `comments/${Date.now()}_${file.name}`);
      await uploadBytes(imageRef, file);
      imageUrl = await getDownloadURL(imageRef);
    }

    const commentRef = dbRef(db, 'comments');
    await push(commentRef, {
      name: formData.name,
      message: formData.message,
      image: imageUrl,
      timestamp: new Date().toISOString(),
    });

    setFormData({ name: '', message: '' });
    setFile(null);
    setShowForm(false);
  };

  const handleReplyChange = (id, e) => {
    const { name, value } = e.target;
    setReplyForm((prev) => ({
      ...prev,
      [id]: { ...prev[id], [name]: value },
    }));
  };

  const handleReplySubmit = async (id, e) => {
    e.preventDefault();
    const reply = {
      name: replyForm[id]?.name || '',
      message: replyForm[id]?.message || '',
      timestamp: new Date().toISOString(),
    };
    const replyRef = dbRef(db, `comments/${id}/replies`);
    await push(replyRef, reply);
    setReplyForm((prev) => ({ ...prev, [id]: { name: '', message: '' } }));
  };

  return (
    <div className="relative overflow-hidden px-4 py-16 z-10">
      {/* Background accents */}
      <div className="absolute w-32 h-32 bg-purple-300/30 rounded-full blur-2xl top-10 left-10 rotate-12 z-0 pointer-events-none" />
      <div className="absolute w-24 h-24 bg-purple-400/20 rounded-full blur-xl bottom-20 right-16 rotate-45 z-0 pointer-events-none" />
      <div className="absolute w-16 h-16 bg-purple-500/25 rounded-full blur-md top-1/2 left-1/3 rotate-[-30deg] z-0 pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 gradient-text">Community</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Share your thoughts, testimonies, or Spirit-led encouragement. Every comment is a seed of light.
        </p>
      </motion.div>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <h2 className="text-2xl font-bold mb-4">Recent Reflections</h2>
        {comments.length === 0 ? (
          <p className="text-muted-foreground">No comments yet. Be the first to share!</p>
        ) : (
          comments.map((c) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 bg-muted/40 rounded-xl shadow-md glassmorphism flex flex-col gap-4"
            >
              <div className="flex items-center gap-2 text-primary font-semibold">
                <MessageCircle size={18} />
                {c.name}
              </div>
              <p className="text-foreground/90">{c.message}</p>
              {c.image && (
                <img
                  src={c.image}
                  alt="Uploaded"
                  className="mt-2 rounded-lg w-40 h-40 object-cover border border-muted"
                />
              )}
              <span className="text-xs text-muted-foreground">
                {new Date(c.timestamp).toLocaleString()}
              </span>

              {/* Replies */}
              {c.replies && (
                <div className="mt-3 ml-3 space-y-3 border-l-2 border-muted pl-3">
                  {Object.values(c.replies).map((r, index) => (
                    <div
                      key={index}
                      className="p-2 bg-muted/30 rounded-md border border-muted/50"
                    >
                      <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                        <CornerDownRight size={14} />
                        {r.name}
                      </div>
                      <p className="text-sm text-foreground/80 leading-snug">{r.message}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(r.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              <form
                onSubmit={(e) => handleReplySubmit(c.id, e)}
                className="mt-4 space-y-2"
              >
                <input
                  name="name"
                  placeholder="Your name"
                  value={replyForm[c.id]?.name || ''}
                  onChange={(e) => handleReplyChange(c.id, e)}
                  className="w-full p-2 rounded bg-background/70 border border-muted text-sm"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your reply..."
                  value={replyForm[c.id]?.message || ''}
                  onChange={(e) => handleReplyChange(c.id, e)}
                  rows={2}
                  className="w-full p-2 rounded bg-background/70 border border-muted text-sm"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white text-sm rounded hover:opacity-90"
                >
                  Reply
                </button>
              </form>
            </motion.div>
          ))
        )}
      </div>

      {/* Floating Add Comment Button */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:opacity-90"
      >
        + Add Comment
      </button>

      {/* Pop-Up Comment Form */}
      {showForm && (
        <div className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md bg-card/90 backdrop-blur-md p-6 rounded-xl shadow-xl glassmorphism aurora-card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Leave a Comment</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-muted-foreground hover:text-primary text-sm"
            >
              Close
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-background/70 border border-muted"
            />
                    <textarea
              name="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={3}
              className="w-full p-2 rounded bg-background/70 border border-muted"
            />
            {/* <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 bg-background/70 rounded border border-muted"
            /> */}
            <button
              type="submit"
              className="w-full py-2 px-4 rounded bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition"
            >
              Submit Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CommentPage;
