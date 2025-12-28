// 🌀 Anti-Gravity Backend - Feel the Flow
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();

app.use(cors());
app.use(express.json());

// 🌟 Hinglish Command Universe
const COMMAND_MATRIX = {
  // WhatsApp Galaxy
  'whatsapp kholo': { win: 'start whatsapp://', mac: 'open -a WhatsApp' },
  'whatsapp window kholo': { win: 'start whatsapp://', mac: 'open -a WhatsApp' },
  'whatsapp chalao': { win: 'start whatsapp://', mac: 'open -a WhatsApp' },
  
  // Browser Nebula
  'edge kholo': { win: 'start msedge', mac: 'open -a "Microsoft Edge"' },
  'edge open karo': { win: 'start msedge', mac: 'open -a "Microsoft Edge"' },
  'chrome kholo': { win: 'start chrome', mac: 'open -a "Google Chrome"' },
  'chrome chalao': { win: 'start chrome', mac: 'open -a "Google Chrome"' },
  'firefox kholo': { win: 'start firefox', mac: 'open -a Firefox' },
  
  // Social Cosmos
  'youtube kholo': { win: 'start https://youtube.com', mac: 'open https://youtube.com' },
  'facebook kholo': { win: 'start https://facebook.com', mac: 'open https://facebook.com' },
  'instagram kholo': { win: 'start https://instagram.com', mac: 'open https://instagram.com' },
  'twitter kholo': { win: 'start https://twitter.com', mac: 'open https://twitter.com' },
  
  // System Orbit
  'notepad kholo': { win: 'notepad', mac: 'open -a TextEdit' },
  'calculator kholo': { win: 'calc', mac: 'open -a Calculator' },
  'vscode kholo': { win: 'code', mac: 'open -a "Visual Studio Code"' },
  'terminal kholo': { win: 'start cmd', mac: 'open -a Terminal' },
  
  // File System
  'desktop kholo': { win: 'explorer Desktop', mac: 'open ~/Desktop' },
  'documents kholo': { win: 'explorer Documents', mac: 'open ~/Documents' },
  'downloads kholo': { win: 'explorer Downloads', mac: 'open ~/Downloads' },
  
  // Creative Zone
  'spotify kholo': { win: 'start spotify:', mac: 'open -a Spotify' },
  'photoshop kholo': { win: 'start photoshop', mac: 'open -a Photoshop' },
  'figma kholo': { win: 'start https://figma.com', mac: 'open https://figma.com' },
  
  // Utility Cluster
  'settings kholo': { win: 'start ms-settings:', mac: 'open -a "System Preferences"' },
  'camera kholo': { win: 'start microsoft.windows.camera:', mac: 'open -a PhotoBooth' },
  'calendar kholo': { win: 'start outlookcal:', mac: 'open -a Calendar' },
  
  // Power Commands
  'sab band karo': { win: 'shutdown /s /t 0', mac: 'sudo shutdown -h now' },
  'restart karo': { win: 'shutdown /r /t 0', mac: 'sudo shutdown -r now' },
  'sleep mode': { win: 'rundll32.exe powrprof.dll,SetSuspendState 0,1,0', mac: 'pmset sleepnow' }
};

// ✨ Magic Execution Engine
app.post('/api/execute', (req, res) => {
  const { command, vibe = 'chill' } = req.body;
  console.log(`🎤 Received: ${command} | Vibe: ${vibe}`);
  
  // 🌈 Fuzzy Matching Magic
  const normalizedCommand = command.toLowerCase().trim();
  let matchedCommand = null;
  
  for (const [key, value] of Object.entries(COMMAND_MATRIX)) {
    if (normalizedCommand.includes(key) || key.includes(normalizedCommand)) {
      matchedCommand = value;
      break;
    }
  }
  
  if (!matchedCommand) {
    // 🎯 Try partial matching
    const words = normalizedCommand.split(' ');
    for (const word of words) {
      if (word.length > 3) {
        for (const [key, value] of Object.entries(COMMAND_MATRIX)) {
          if (key.includes(word)) {
            matchedCommand = value;
            break;
          }
        }
      }
      if (matchedCommand) break;
    }
  }
  
  if (matchedCommand) {
    const platform = process.platform === 'win32' ? 'win' : 'mac';
    const systemCommand = matchedCommand[platform];
    
    if (systemCommand) {
      exec(systemCommand, (error, stdout, stderr) => {
        if (error) {
          console.log(`⚠️ Error: ${error.message}`);
          res.json({ 
            success: false, 
            message: 'Hmm... Kuch to gadbad hai! 🧐',
            error: error.message,
            vibe: 'confused'
          });
        } else {
          console.log(`✅ Opened: ${command}`);
          res.json({ 
            success: true, 
            message: `✨ Wah! ${command} - Khul gaya! 🎉`,
            vibe: 'celebratory'
          });
        }
      });
    } else {
      res.json({ 
        success: false, 
        message: `Is platform pe yeh command nahi chalta! 🤷‍♀️`,
        vibe: 'apologetic'
      });
    }
  } else {
    res.json({ 
      success: false, 
      message: `Samjha nahi! Kya bola aap? 🤔\nTry: "whatsapp kholo" ya "edge open karo"`,
      vibe: 'curious'
    });
  }
});

// 🌌 Advanced Commands with AI
app.post('/api/smart', async (req, res) => {
  const { command } = req.body;
  
  // Smart command parsing
  if (command.includes('aur') || command.includes('phir') || command.includes('fir')) {
    const subCommands = command.split(/aur|phir|fir/).map(c => c.trim());
    
    const results = [];
    for (const subCmd of subCommands) {
      if (subCmd) {
        // Simulate execution - in real life, run sequentially
        results.push({
          command: subCmd,
          status: 'queued'
        });
      }
    }
    
    res.json({
      success: true,
      message: `Multiple commands detected! Will execute: ${subCommands.join(', ')}`,
      commands: results,
      vibe: 'productive'
    });
  } else {
    res.json({
      success: false,
      message: 'Simple command use karo ya "aur" se multiple commands try karo!',
      vibe: 'helpful'
    });
  }
});

// 🎵 Vibe Check Endpoint
app.get('/api/vibe', (req, res) => {
  const vibes = ['chill', 'productive', 'creative', 'energetic', 'relaxed', 'focused'];
  const currentVibe = vibes[Math.floor(Math.random() * vibes.length)];
  
  res.json({
    vibe: currentVibe,
    message: `Current coding vibe: ${currentVibe} ✨`,
    tip: 'Take a deep breath and enjoy the process!',
    timestamp: new Date().toISOString()
  });
});

// 🚀 Server Launch
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌀 Anti-Gravity Server vibrating on port ${PORT}`);
  console.log(`✨ Ready to receive Hinglish commands!`);
  console.log(`🎵 Recommended music: Lofi hip hop radio`);
});
