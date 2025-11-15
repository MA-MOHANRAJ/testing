export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200/80 bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} <b>EduGen</b> By Team <b>Zenith</b>. All rights reserved.
          </p>
          <p className="mt-1">
            An interactive learning experience to build confidence.
          </p>
        </div>
      </div>
    </footer>
  );
}