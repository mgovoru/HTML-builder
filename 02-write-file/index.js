const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
rl.question('Введите данные: ', (input) => {
  if (input == 'exit') {
    console.log('Удачи в изучении Node.js!');
    rl.close();
  } else {
    output.write(input + '\n', (err) => {
      if (err) {
        console.error('Произошла ошибка при записи в файл:', err);
      } else {
        console.log('Текст успешно записан в файл!');
      }
      output.end();
      rl.close();
    });
  }
});
process.on('SIGINT', () => {
  console.log('Удачи в изучении Node.js!');
  process.exit();
});
