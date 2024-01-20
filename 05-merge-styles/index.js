const fs = require('fs/promises');
const path = require('path');

(async function () {
  try {
    await fs.readFile(path.join(__dirname, 'project-dist', 'bundle.css'));
    fs.unlink(path.join(__dirname, 'project-dist', 'bundle.css'));
  } catch (err) {
    await fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '');
  }
  try {
    let array = [];
    const files = await fs.readdir(path.join(__dirname, 'styles'));

    for (const file of files) {
      const stats = await fs.stat(path.join(__dirname, 'styles', file));
      if (stats.isFile() && path.extname(file) == '.css') {
        let content = await fs.readFile(path.join(__dirname, 'styles', file));
        array.push(content);
      }
    }
    if (array.length > 0) {
      for (let i = 0; i < array.length; i++) {
        fs.appendFile(
          path.join(__dirname, 'project-dist', 'bundle.css'),
          array[i],
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
})();
