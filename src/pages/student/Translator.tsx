import { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';
import Button from '../../components/common/Button';
import FilterDropdown from '../../components/common/FilterDropdown';
import SearchBar from '../../components/common/SearchBar';
import { mockTranslate, translationDictionary } from '../../utils/translator';

export default function Translator() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [direction, setDirection] = useState<'en-to-np' | 'np-to-en'>('en-to-np');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [dictSearch, setDictSearch] = useState('');

  const handleTranslate = () => {
    const result = mockTranslate(sourceText, direction);
    setTranslatedText(result);
  };

  const handleSwap = () => {
    setDirection(prev => (prev === 'en-to-np' ? 'np-to-en' : 'en-to-np'));
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
  };

  const categories = [...new Set(translationDictionary.map(e => e.category))];

  const filteredDictionary = translationDictionary.filter(entry => {
    const matchesCategory = categoryFilter ? entry.category === categoryFilter : true;
    const matchesSearch = dictSearch
      ? entry.english.toLowerCase().includes(dictSearch.toLowerCase()) ||
        entry.nepali.includes(dictSearch)
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Nepali ↔ English Translator" subtitle="Translate academic terms and common phrases" />

      {/* Translator Interface */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-sm font-medium text-gray-700 px-3 py-1.5 bg-gray-100 rounded-lg">
            {direction === 'en-to-np' ? 'English' : 'नेपाली'}
          </span>
          <button
            onClick={handleSwap}
            className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors"
            aria-label="Swap languages"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-gray-700 px-3 py-1.5 bg-gray-100 rounded-lg">
            {direction === 'en-to-np' ? 'नेपाली' : 'English'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {direction === 'en-to-np' ? 'English Text' : 'नेपाली Text'}
            </label>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={direction === 'en-to-np' ? 'Enter English text...' : 'नेपाली टेक्स्ट लेख्नुहोस्...'}
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {direction === 'en-to-np' ? 'नेपाली Translation' : 'English Translation'}
            </label>
            <div className="w-full h-32 px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 overflow-y-auto">
              {translatedText || <span className="text-gray-400">Translation will appear here...</span>}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleTranslate} disabled={!sourceText.trim()}>Translate</Button>
          <Button variant="outline" onClick={handleClear}>Clear</Button>
        </div>
      </div>

      {/* Dictionary Reference */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Dictionary Reference</h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <SearchBar value={dictSearch} onChange={setDictSearch} placeholder="Search dictionary..." className="flex-1" />
          <FilterDropdown
            label="Filter by Category"
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={categories.map(c => ({ value: c, label: c }))}
          />
        </div>

        <div className="table-responsive">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">English</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">नेपाली</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDictionary.map((entry, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-700">{entry.english}</td>
                  <td className="px-4 py-2 text-gray-700">{entry.nepali}</td>
                  <td className="px-4 py-2 text-gray-500">{entry.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
