const BookContainer = ({ children }) => {
  return (
    <div className="flex flex-col border-2 border-sky-300 rounded-xl w-[600px] p-4 mx-auto">
      {children}
    </div>
  );
};

export default BookContainer;