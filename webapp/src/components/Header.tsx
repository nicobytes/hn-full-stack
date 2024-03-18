import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-zinc-300 dark:bg-zinc-900 border-b-8 border-orange-600 mb-4">
      <div className="mx-auto max-w-screen-lg py-4">
        <div className="flex justify-center">
          <div className='container'>
            <div className="flex items-center px-4 justify-between gap-4">
              <div className='flex items-center'>
                <h1 className='text-white font-bold text-3xl'>Hacker News Clone</h1>
              </div>
              <div>
                <div className="block dark:hidden">
                  <a href="/" className="logo flex items-center" aria-current="page">
                    <figure>
                      <Image
                        src="/logoDark.png"
                        className="w-20 rounded bg-zinc-950 bg-opacity-0"
                        width={500}
                        height={200}
                        decoding="async"
                        loading="lazy"
                      />
                    </figure>
                  </a>
                </div>
                <div className="hidden dark:block">
                  <a href="/" className="logo flex items-center" aria-current="page">
                    <figure>
                      <Image
                        src="/logoDark.png"
                        alt="logo"
                        className="w-20 rounded bg-zinc-950 bg-opacity-0"
                        width={500}
                        height={200}
                        decoding="async"
                        loading="lazy"
                      />
                    </figure>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
