import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { MdOutlineAddBox } from 'react-icons/md';
import BookTable from '../components/Book/BookTable';
import BookCards from '../components/Book/BookCards';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [mode, setMode] = useState('Table');

  useEffect(() => {
    let ignore = false;
    fetch('http://localhost:5000/books/', { method: 'GET' })
      .then((response) => response.json())
      .then((response) => {
        if (!ignore) {
          setBooks(response.books);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="py-4 px-8">
      <div className="flex justify-center items-center gap-x-4">
        <Button onClick={() => setMode('Table')} active={mode === 'Table'}>
          Table
        </Button>
        <Button onClick={() => setMode('Cards')} active={mode === 'Cards'}>
          Cards
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 ms-4">Books List</h1>
        <Link to="/books/create" className="me-4">
          <MdOutlineAddBox className="text-5xl text-sky-700" />
        </Link>
      </div>
      {books.length ? (
        mode === 'Table' ? (
          <BookTable books={books} />
        ) : mode === 'Cards' ? (
          <BookCards books={books} />
        ) : null
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const Button = ({ children, onClick, active }) => {
  return (
    <button
      className={'bg-sky-200 hover:bg-sky-500 px-4 py-1 rounded-lg' + (active ? ' border-2 border-sky-700' : '')}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Home;
