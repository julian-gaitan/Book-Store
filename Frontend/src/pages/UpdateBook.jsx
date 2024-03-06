import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookContainer from '../components/Book/BookContainer';
import BookElement from '../components/Book/BookElement';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useSnackbar } from 'notistack';

const UpdateBook = () => {
  const [book, setBook] = useState({});
  const [isSending, setIsSending] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let ignore = false;
    fetch(`http://localhost:5000/books/${id}`, { method: 'GET' })
      .then((response) => response.json())
      .then((response) => {
        if (!ignore) {
          setBook(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  function handleChange(e) {
    setBook({
      ...book,
      [e.target.id]: e.target.value,
    });
  }

  function handleEditBook() {
    setIsSending(true);
    fetch(`http://localhost:5000/books/${id}`, {
      method: 'PUT',
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
        enqueueSnackbar('Book updated successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(`Something went wrong:\n${error.message}`, { variant: 'error' });
      })
      .finally(() => setIsSending(false));
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Update Book</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleEditBook();
        }}
      >
        {Object.keys(book).length ? (
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
                Update
              </button>
            ) : (
              <Spinner />
            )}
          </BookContainer>
        ) : (
          <Spinner />
        )}
      </form>
    </div>
  );
};

export default UpdateBook;
