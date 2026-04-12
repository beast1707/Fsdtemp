import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

const API_URL = 'http://localhost:5000/api/books';

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  // Read: Fetch books
  const fetchBooks = async (query = '') => {
    try {
      const url = query ? `${API_URL}?search=${encodeURIComponent(query)}` : API_URL;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setBooks(data);
      } else {
        console.error('Error fetching books:', data);
        setBooks([]); // keep it as an array to prevent crash
      }
    } catch (err) {
      console.error('Error fetching books:', err);
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks(searchQuery);
  }, [searchQuery]);

  // Create or Update
  const handleSave = async (bookData) => {
    try {
      if (editingBook) {
        // Update
        const res = await fetch(`${API_URL}/${editingBook._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookData)
        });
        if (res.ok) {
          setEditingBook(null);
          fetchBooks(searchQuery);
        }
      } else {
        // Create
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bookData)
        });
        if (res.ok) {
          fetchBooks(searchQuery);
        }
      }
    } catch (err) {
      console.error('Error saving book:', err);
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchBooks(searchQuery);
      }
    } catch (err) {
      console.error('Error deleting book:', err);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Book Inventory System</h1>
        <p>A beautiful MERN Stack CRUD Application</p>
      </header>

      <div className="main-layout">
        <aside>
          <BookForm 
            onSave={handleSave} 
            editingBook={editingBook} 
            onCancelEdit={() => setEditingBook(null)}
          />
        </aside>
        
        <main>
          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search books by title or author..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <BookList 
            books={books} 
            onEdit={setEditingBook} 
            onDelete={handleDelete} 
          />
        </main>
      </div>
    </div>
  );
}

export default App;
