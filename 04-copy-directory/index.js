const fs = require('fs/promises');
const path = require('path');
(async function () {
  try {
    const files = await fs.readdir(path.join(__dirname, 'files'));
    await fs.mkdir(path.join(__dirname, 'files-copy'), {
      recursive: true,
    });
    const copyfiles = await fs.readdir(path.join(__dirname, 'files-copy'));
    if (copyfiles) {
      for (const file of copyfiles) {
        await fs.unlink(path.join(__dirname, 'files-copy', file));
      }
    }
    for (const file of files) {
      await fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file),
      );
    }
  } catch (err) {
    console.error(err);
  }
})();
