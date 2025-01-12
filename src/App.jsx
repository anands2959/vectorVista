import { useState, useEffect } from "react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import BackgroundController from "./components/BackgroundController";
import IconController from "./components/IconController";
import LogoPreview from "./components/LogoPreview";
import UpdateStorageContext from "./context/UpdateStorageContext";
import { ThemeProvider } from "./components/theme-provider";
import About from "./components/About";

function App() {
  const [IndexSelected, setIndexselected] = useState(0);
  const [downloadIcon, setDownloadIcon] = useState(false);
  const [updateStorage, setUpdateStorage] = useState(() => {
    const stored = localStorage.getItem("value");
    return stored ? JSON.parse(stored) : {
      icon: "Smile",
      iconSize: 280,
      iconRotate: 0,
      iconColor: "#000000",
      rounded: 364,
      padding: 24,
      bgType: "solid",
      bgColor: "#ffffff",
      gradientColors: {
        start: "#4F46E5",
        end: "#9333EA"
      },
      gradientAngle: 90,
      gradientType: "linear",
      gradientPosition: {
        x: 50,
        y: 50
      }
    };
  });

  useEffect(() => {
    localStorage.setItem("value", JSON.stringify(updateStorage));
  }, [updateStorage]);

  const getActiveComponent = () => {
    switch (IndexSelected) {
      case 0:
        return <IconController />;
      case 1:
        return <BackgroundController />;
      case 2:
        return <About/>;
      default:
        return <IconController />;
    }
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="logo-maker-theme">
      <UpdateStorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
        <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
          {/* Header - Fixed */}
          <div className="flex-none border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
            <Header downloadIcon={() => setDownloadIcon(prev => !prev)} />
          </div>
          
          {/* Main Content - Fill remaining height */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Sidebar - Fixed width on desktop, full width on mobile */}
            <div className="lg:w-72 flex-none bg-white dark:bg-gray-900 border-b lg:border-r border-gray-200 dark:border-gray-800 shadow-sm">
              <div className="h-full">
                <SideNav selectedIndex={(value) => setIndexselected(value)} />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
              <div className="h-full">
                <div className="h-full flex flex-col lg:grid lg:grid-cols-12 lg:gap-0">
                  {/* Controller Section - Scrollable */}
                  <div className="lg:col-span-5 h-[65vh] lg:h-full overflow-hidden border-b lg:border-r border-gray-200 dark:border-gray-800">
                    <div className="h-full overflow-y-auto bg-white dark:bg-gray-900 shadow-sm">
                      {getActiveComponent()}
                    </div>
                  </div>

                  {/* Preview Section */}
                  <div className="lg:col-span-7 h-[35vh] lg:h-full bg-white dark:bg-gray-900 shadow-sm">
                    <div className="h-full flex flex-col p-2 sm:p-3 lg:p-6">
                      <div className="flex items-center justify-between mb-1 lg:mb-4">
                        <h3 className="text-sm lg:text-lg font-semibold text-gray-900 dark:text-gray-100">Preview</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Drag to resize</span>
                      </div>
                      <div className="flex-1 overflow-hidden bg-[#f8fafc] dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                        <LogoPreview downloadIcon={downloadIcon} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UpdateStorageContext.Provider>
    </ThemeProvider>
  );
}

export default App;
