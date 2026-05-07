import { useState } from 'react';
import { Info } from 'lucide-react';
import { KontraktusLogo } from './components/KontraktusLogo';

export default function App() {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="size-full flex items-center justify-center bg-white p-8">
      <div className="max-w-5xl w-full space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-slate-950">Brand Assets</h1>
          <p className="text-sm text-slate-500">
            Kontraktus brand identity and guidelines
          </p>
        </div>

        {/* Full Logo Section */}
        <div className="bg-slate-50 rounded-xl p-16 space-y-6 border border-slate-200">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Primary Logo</h2>
            <p className="text-xs text-slate-500 mt-1">Use for website headers, marketing materials, and presentations</p>
          </div>
          <div
            className="flex items-center justify-center p-12 bg-white rounded-xl"
            id="kontraktus-logo-full"
          >
            <KontraktusLogo variant="full" size="lg" />
          </div>
        </div>

        {/* Profile Picture Version */}
        <div className="bg-slate-50 rounded-xl p-16 space-y-6 border border-slate-200">
          <div className="text-center mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Profile Picture / Icon</h2>
            <p className="text-xs text-slate-500 mt-1">Use for social media profiles, app icons, and favicons</p>
          </div>
          <div
            className="flex items-center justify-center p-12 bg-white rounded-xl"
            id="kontraktus-logo-icon"
          >
            <KontraktusLogo variant="icon-only" size="md" />
          </div>
        </div>

        {/* Instructions */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            <Info className="w-4 h-4" />
            {showInstructions ? 'Hide' : 'Show'} Export Instructions
          </button>
        </div>

        {showInstructions && (
          <div className="bg-white rounded-lg p-6 space-y-4 text-left border border-slate-200">
            <h3 className="font-semibold text-slate-900 text-sm">How to Export Logos</h3>
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Production vectors: <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">brand/primary/*.svg</code> (regenerate PNGs with{' '}
                <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">brand/export-pngs.sh</code>
                , refine the mark with{' '}
                <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">brand/build-primary-mark.py</code>
                ). Older partner directions sit under <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">brand/archive/partner-explorations/</code>.
              </p>
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">Method 1: Screenshot from DevTools (Recommended)</p>
                <ol className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <span className="text-slate-400 font-mono">1.</span>
                    <span>Right-click on the logo you want → Inspect (or press F12)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-400 font-mono">2.</span>
                    <span>Find element with <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">id="kontraktus-logo-full"</code> or <code className="px-1.5 py-0.5 bg-slate-100 rounded text-xs">id="kontraktus-logo-icon"</code></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-400 font-mono">3.</span>
                    <span>Right-click the element → "Capture node screenshot"</span>
                  </li>
                </ol>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">Method 2: Regular Screenshot</p>
                <p className="text-sm text-slate-600">Use your OS screenshot tool (Windows: Snipping Tool, Mac: Cmd+Shift+4) to capture the logo area</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 text-center">Brand Guidelines</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 text-sm">Colors</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-950 shadow-sm"></div>
                  <div className="text-sm">
                    <p className="font-mono text-xs text-slate-900">#18181B</p>
                    <p className="text-xs text-slate-500">Primary Black</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-white border-2 border-slate-950 shadow-sm"></div>
                  <div className="text-sm">
                    <p className="font-mono text-xs text-slate-900">#FFFFFF</p>
                    <p className="text-xs text-slate-500">Icon Background</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200"></div>
                  <div className="text-sm">
                    <p className="font-mono text-xs text-slate-900">#F1F5F9</p>
                    <p className="text-xs text-slate-500">Neutral BG</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 text-sm">Logo Variants</h3>
              <div className="space-y-3 text-sm text-slate-600">
                <div>
                  <p className="font-medium text-slate-900">Primary Logo</p>
                  <p className="text-xs">Icon + Wordmark</p>
                  <p className="text-xs text-slate-500">Website, marketing, print</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Profile Icon</p>
                  <p className="text-xs">Circular, icon only</p>
                  <p className="text-xs text-slate-500">Social media, app icons</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4 text-sm">Usage Rules</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-slate-950">✓</span>
                  <span>Minimum width: 200px (full logo)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-950">✓</span>
                  <span>Clear space: 1.5x icon height</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-slate-950">✓</span>
                  <span>Light or white backgrounds</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">✗</span>
                  <span>No distortion, rotation, or effects</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Do not alter colors or proportions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
