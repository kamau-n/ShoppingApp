const SuccessNotification = ({ message, subMessage }) => {
    return (
      <div className="fixed bottom-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md z-50">
        <div className="flex items-center">
          <div className="py-1">
            <svg
              className="h-6 w-6 text-green-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-bold">{message}</p>
            <p className="text-sm">{subMessage}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default SuccessNotification;
  