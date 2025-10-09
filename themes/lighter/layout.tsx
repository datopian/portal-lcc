import React, { FC, ReactNode, useCallback } from "react";
import styles from "./styles.module.scss";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

const LigtherTheme = ({
  Header,
  Sidebar,
  Footer,
  children,
}: {
  Header?: FC;
  Sidebar?: FC;
  Footer?: FC;
  children: ReactNode;
}) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <>
     
      <a
        href="#main-content"
        className="absolute left-0 top-0 bg-accent text-white py-2 px-4 z-50 transform -translate-y-full focus:translate-y-0 transition"
      >
        Skip to main content
      </a>
      <div className={` ${styles.LightTheme} font-inter relative`}>
        {Header && <Header />}
        <div className="content-wrapper">
          {Sidebar && <Sidebar />}
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </div>
        {Footer && <Footer />}
      </div>
    </>
  );
};

export default LigtherTheme;
