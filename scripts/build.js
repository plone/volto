import shell from 'shelljs';

shell.exec(`yarn prod`, (code) => {
  console.log("Exited with code ", code)});
