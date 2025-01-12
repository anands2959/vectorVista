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
        <div className="h-screen flex flex-col bg-background dark:bg-gray-900">
          {/* Header - Fixed */}
          <div className="flex-none">
            <Header downloadIcon={() => setDownloadIcon(prev => !prev)} />
          </div>
          
          {/* Main Content - Fill remaining height */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar - Fixed width */}
            <div className="w-64 flex-none bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
              <div className="h-full">
                <SideNav selectedIndex={(value) => setIndexselected(value)} />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full">
                <div className="h-full grid grid-cols-1 lg:grid-cols-12">
                  {/* Controller Section - Scrollable */}
                  <div className="lg:col-span-5 h-full overflow-hidden border-r border-gray-200 dark:border-gray-700">
                    <div className="h-full overflow-y-auto bg-white dark:bg-gray-800">
                      {getActiveComponent()}
                    </div>
                  </div>

                  {/* Preview Section - Fixed */}
                  <div className="lg:col-span-7 h-full bg-white dark:bg-gray-800 p-6">
                    <div className="h-full flex flex-col">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4 flex-none">Preview</h3>
                      <div className="flex-1 overflow-hidden">
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
