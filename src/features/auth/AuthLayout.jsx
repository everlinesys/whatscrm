export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen h-full bg-emerald-950 flex items-center justify-center text-white">

      <div className="w-full max-w-sm bg-emerald-900 p-6 rounded-2xl shadow-xl">

        <h1 className="text-2xl font-bold mb-6 text-center">
          {title}
        </h1>

        {children}

      </div>

    </div>
  );
}
