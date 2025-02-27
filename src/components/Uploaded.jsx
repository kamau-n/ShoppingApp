
//import CheckIcon from '@mui/icons-material/Check';
const Uploaded = ({ image, url }) => {
  const copy = async () => {
    await navigator.clipboard.writeText(url);
    alert("Link copied");
  };

 return (
    <div className="flex flex-col min-h-[500px] bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl mx-auto">
      {/* Success Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-4 transform transition-transform hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-white"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Upload Successful!
        </h2>
        <p className="text-gray-600">
          Your image has been uploaded and is ready to use
        </p>
      </div>

      {/* Image Preview */}
      <div className="flex-grow mb-8">
        <div className="relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner">
          <img
            src={image}
            alt="Upload preview"
            className="w-full h-[250px] object-contain"
          />
        </div>
      </div>

      {/* URL Section */}
      <div className="relative bg-gray-50 rounded-xl border border-gray-200 p-1">
        <div className="flex items-center pr-[104px] min-h-[48px]">
          <div className="px-3 w-full overflow-hidden">
            <p 
              className="text-sm text-gray-600 truncate"
              title={url}
            >
              {url}
            </p>
          </div>
        </div>
        <button
          onClick={copy}
          className="absolute right-1 top-1 bottom-1 bg-gradient-to-r from-blue-600 to-blue-700 
            text-white rounded-lg px-6 text-sm font-medium
            hover:from-blue-700 hover:to-blue-800 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            transform transition-all duration-200 hover:shadow-md active:scale-95"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default Uploaded;
