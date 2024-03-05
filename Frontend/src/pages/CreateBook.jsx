import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookContainer, BookElement } from '../components/Book';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const CreateBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    publishYear: '',
  });
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setBook({
      ...book,
      [e.target.id]: e.target.value,
    });
  }

  function handleSaveBook() {
    setIsSending(true);
    fetch(`http://localhost:5000/books/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.error);
        }
        navigate('/');
      })
      .catch((error) => {
        alert(`Something went wrong:\n${error.message}`);
        console.log(error);
      })
      .finally(() => setIsSending(false));
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveBook();
        }}
      >
        <BookContainer>
          <BookElement
            id={'title'}
            label={'Title'}
            value={book.title}
            onChange={handleChange}
          />
          <BookElement
            id={'author'}
            label={'Author'}
            value={book.author}
            onChange={handleChange}
          />
          <BookElement
            id={'publishYear'}
            label={'Publish Year'}
            value={book.publishYear}
            type="number"
            onChange={handleChange}
          />
          {!isSending ? (
            <button type="submit" className="p-2 bg-sky-300 m-8">
              Create
            </button>
          ) : (
            <Spinner />
          )}
        </BookContainer>
      </form>
    </div>
  );
};

export default CreateBook;
