export default async function Footer() {

    const thisYear = new Date().getFullYear()

  return (
    <footer className="bg-zinc-50 text-center dark:bg-gray-900/70 lg:text-left">
      <div className="p-4 text-center text-surface dark:text-white">
        © {thisYear} Copyright
        <a href="#" className="ml-2 underline">
          IKRAMFORCESACADEMY
        </a>
      </div>
    </footer>
  );
}
