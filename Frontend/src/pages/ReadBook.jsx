import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const ReadBook = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();

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

  return (
    <div>
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Show Book</h1>
        {Object.keys(book).length ? (
          <Container>
            <Element label={'Id'} value={book._id} />
            <Element label={'Title'} value={book.title} />
            <Element label={'Author'} value={book.author} />
            <Element label={'Publish Year'} value={book.publishYear} />
            <Element
              label={'Create Time'}
              value={new Date(book.createdAt).toString()}
            />
            <Element
              label={'Last Update Time'}
              value={new Date(book.updatedAt).toString()}
            />
          </Container>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

const Container = ({ children }) => {
  return (
    <div className="flex flex-col border-2 border-sky-300 rounded-xl w-fit p-4 mx-auto">
      {children}
    </div>
  )
}

const Element = ({ label, value }) => {
  return (
    <div className="my-4">
      <span className="text-xl mr-4 text-gray-500">{label}</span>
      <span>{value}</span>
    </div>
  );
};

export default ReadBook;
