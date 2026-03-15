const AuthLeft = () => {
  return (
    <section className="hidden md:flex relative items-center justify-center w-1/2 bg-green-600 overflow-hidden">
      <div className="z-10 w-[85%] h-[85%] max-h-175 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] p-1 shadow-2xl overflow-hidden">
        <div className="relative w-full h-full bg-zinc-950/90 rounded-[36px] flex flex-col p-12">
          <div className="flex items-center gap-4 text-green-500 text-4xl font-black tracking-tighter">
            <div className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-2xl  transition-transform hover:scale-110 cursor-pointer">
              <div className="w-0 h-0 border-y-10 border-y-transparent border-l-15 border-l-black ml-1"></div>
            </div>
            <span>StreamIt</span>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-6"></div>
            <h2 className="text-white text-5xl font-bold leading-[1.1] mb-6">
              Upload, stream, and manage your content on a <br />
              <span className="text-green-500">global</span> platform.
            </h2>
            <p className="text-zinc-400 text-lg max-w-sm leading-relaxed">
              Join us and dive into a world of exclusive content and features.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLeft;
