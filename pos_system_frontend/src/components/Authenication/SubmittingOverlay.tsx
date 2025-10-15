const SubmittingOverlay = () => {
    return (
         <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50 rounded-4xl">
          <p className="text-white font-bold text-lg animate-pulse">Submitting...</p>
        </div>
    );
};

export default SubmittingOverlay;