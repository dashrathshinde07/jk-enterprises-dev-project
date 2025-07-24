const LanguageTabs = ({ currentLang, setLang }) => (
  <div className="flex space-x-2 mb-4">
    {["en", "mr"].map((lang) => (
      <button
        key={lang}
        onClick={() => setLang(lang)}
        className={`px-4 py-1 rounded ${currentLang === lang ? "bg-[#2C498D] text-white" : "bg-gray-200 text-gray-800"}`}
      >
        {lang === "en" ? "English" : "Marathi"}
      </button>
    ))}
  </div>
);
export default LanguageTabs;
