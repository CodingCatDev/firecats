const Home = (): JSX.Element => {
  return (
    <>
      <div className="bg-primary-50">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8 lg:flex lg:flex-wrap lg:items-center lg:justify-between">
          <h1 className="w-full pb-10 text-3xl font-extrabold tracking-tight text-primary-900 sm:text-4xl">
            Welcome to the starter Next.js, TailwindCSS, and Firebase template!
          </h1>
          <div className="flex flex-wrap w-full">
            <h2 className="pr-2 text-xl font-extrabold tracking-tight text-primary-900">
              <span className="block text-primary-600">
                The idea of this demo is to see how you can combine these three
                great products together in the best way.
              </span>
            </h2>
            <div className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-white border border-transparent rounded-md bg-primary-600 hover:bg-secondary-700 hover:text-basics-700"
                >
                  Get started
                </a>
              </div>
              <div className="inline-flex ml-3 rounded-md shadow">
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium bg-white border border-transparent rounded-md text-primary-600 hover:bg-secondary-50 hover:text-basics-700"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
