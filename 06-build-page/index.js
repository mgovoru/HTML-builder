const fs = require('fs/promises');
const path = require('path');
let arrayHTML = ['{{header}}', '{{articles}}', '{{footer}}', '{{about}}'];
let check = false;
let checkDir = false;
(async function () {
  let contentAbout;
  try {
    contentAbout = await fs.readFile(
      path.join(__dirname, 'components', 'about.html'),
    );
    check = true;
  } catch (err) {
    check = false;
  }
  try {
    await fs.readdir(path.join(__dirname, 'project-dist'));
    checkDir = true;
  } catch (err) {
    checkDir = false;
  }
  if (checkDir == true) {
    await fs.rm(path.join(__dirname, 'project-dist'), { recursive: true });
  }
  try {
    await fs.mkdir(path.join(__dirname, 'project-dist'));
    const dataTemp = await fs.readFile(path.join(__dirname, 'template.html'));
    const contentHeader = await fs.readFile(
      path.join(__dirname, 'components', 'header.html'),
    );
    const contentArticles = await fs.readFile(
      path.join(__dirname, 'components', 'articles.html'),
    );
    const contentFooter = await fs.readFile(
      path.join(__dirname, 'components', 'footer.html'),
    );

    let result = dataTemp
      .toString()
      .replace(arrayHTML[0], contentHeader.toString());
    result = result
      .toString()
      .replace(arrayHTML[1], contentArticles.toString());
    result = result.toString().replace(arrayHTML[2], contentFooter.toString());
    if (check == true) {
      result = result.toString().replace(arrayHTML[3], contentAbout.toString());
    }

    fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'), result);

    // собираем файл стилей
    try {
      await fs.readFile(path.join(__dirname, 'project-dist', 'style.css'));
      fs.unlink(path.join(__dirname, 'project-dist', 'style.css'));
    } catch (err) {
      await fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '');
    }

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
          path.join(__dirname, 'project-dist', 'style.css'),
          array[i],
        );
      }
    }
    const dirs = await fs.readdir(path.join(__dirname, 'assets'));
    await fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), {
      recursive: true,
    });
    for (const dir of dirs) {
      await fs.mkdir(path.join(__dirname, 'project-dist', 'assets', dir), {
        recursive: true,
      });
      let filesAssets = await fs.readdir(path.join(__dirname, 'assets', dir));
      for (const fileAssets of filesAssets) {
        await fs.copyFile(
          path.join(__dirname, 'assets', dir, fileAssets),
          path.join(__dirname, 'project-dist', 'assets', dir, fileAssets),
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
})();
