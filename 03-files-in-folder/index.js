const fs = require('fs/promises');
const path = require('path');
(async function () {
  try {
    const files = await fs.readdir(path.join(__dirname, 'secret-folder'));
    for (const file of files) {
      const stats = await fs.stat(path.join(__dirname, 'secret-folder', file));
      if (stats.isFile()) {
        let sizeKb = Math.floor((stats.size / 1024) * 100) / 100;
        console.log(file, path.extname(file), `${sizeKb}kb`);
      } else continue;
    }
  } catch (err) {
    console.error(err);
  }
})();
