import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import GradientButton from './GradientButton';

const SettingsCard: React.FC = () => {
  const [settings, setSettings] = useState({
    darkMode: true,
    pushNotifications: true,
    locationAccess: false,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <div className="flex flex-col p-8 rounded-3xl 
                    bg-white/10 backdrop-blur-md border border-white/20
                    shadow-xl shadow-black/20">
        
        <h2 className="text-2xl font-bold text-white tracking-wide mb-6 text-center
                     text-shadow-glow">Settings</h2>
        
        <div className="space-y-4 mb-6">
          <ToggleSwitch
            label="Dark Mode"
            isOn={settings.darkMode}
            onToggle={() => handleToggle('darkMode')}
          />
          <ToggleSwitch
            label="Push Notifications"
            isOn={settings.pushNotifications}
            onToggle={() => handleToggle('pushNotifications')}
          />
          <ToggleSwitch
            label="Location Access"
            isOn={settings.locationAccess}
            onToggle={() => handleToggle('locationAccess')}
          />
        </div>
        
        <GradientButton 
          label="Log Out"
          onClick={() => console.log('Log out clicked')}
        />
      </div>
      
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                    bg-black/20 blur-md rounded-full"></div>
    </div>
  );
};

export default SettingsCard;