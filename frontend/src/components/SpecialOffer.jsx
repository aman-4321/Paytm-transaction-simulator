export const SpecialOffer = () => {
  return (
    <div className="mt-8 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 p-6 rounded-lg shadow-lg">
      <div className="font-extrabold text-2xl mb-2">🎉 Special Offer!</div>
      <p className="text-lg">
        Get <span className="font-bold">5% cashback</span> on your next
        transaction.
      </p>
      <p className="mt-2 text-blue-700">
        Valid until the end of the month. Don't miss out!
      </p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Learn More
      </button>
    </div>
  );
};
