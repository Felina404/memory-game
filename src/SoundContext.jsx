import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const SoundContext = createContext();

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <SoundContext.Provider value={{ soundEnabled, setSoundEnabled }}>
      {children}
    </SoundContext.Provider>
  );
};

SoundProvider.propTypes = {
  children: PropTypes.node.isRequired,
};