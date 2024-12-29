import { BatteryInfo } from './components/BatteryInfo';
import { MemoryInfo } from './components/MemoryInfo';
import { StorageInfo } from './components/StorageInfo';
import { NetworkInfo } from './components/NetworkInfo';
import { SystemInfo } from './components/SystemInfo';
import { useDiagnostics } from './hooks/useDiagnostics';

function App() {
  const { diagnostics, runDiagnostics, isLoading, error } = useDiagnostics();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-800">System Diagnostics</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={runDiagnostics}
                disabled={isLoading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Running Diagnostics...
                  </>
                ) : (
                  'Run Diagnostics'
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {/* Diagnostics Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diagnostics.battery && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <BatteryInfo info={diagnostics.battery} />
            </div>
          )}
          {diagnostics.memory && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <MemoryInfo info={diagnostics.memory} />
            </div>
          )}
          {diagnostics.storage && (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <StorageInfo info={diagnostics.storage} />
            </div>
          )}
          {diagnostics.network ? (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <NetworkInfo info={diagnostics.network} />
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-6 text-gray-600">No network info available</div>
          )}
          {diagnostics.system ? (
            <div className="bg-white shadow-lg rounded-lg p-6">
              <SystemInfo info={diagnostics.system} />
            </div>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-6 text-gray-600">No system info available</div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
