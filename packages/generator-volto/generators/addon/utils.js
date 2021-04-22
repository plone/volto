// const gitly = require('gitly');
// const ejs = require('ejs');
// const fs = require('fs');
// const path = require('path');
//
// /*
//  * Apply tplSettings on .tpl file
//  */
// const bootstrapFile = function (ofile, tplSettings) {
//   fs.readFile(ofile, 'utf8', function (err, data) {
//     if (err) {
//       // eslint-disable-next-line no-console
//       return console.error(err);
//     }
//     const result = ejs.render(data, { ...tplSettings });
//     fs.writeFile(ofile, result, 'utf8', function (err) {
//       if (err) {
//         // eslint-disable-next-line no-console
//         return console.error(err);
//       }
//     });
//     if (ofile.includes('.tpl')) {
//       const output = ofile.replace('.tpl', '');
//       fs.rename(ofile, output, (err) => {
//         if (err) {
//           // eslint-disable-next-line no-console
//           return console.error(err);
//         }
//       });
//     }
//   });
// };
//
// function bootstrapLocation(source, destination, tplSettings) {
//   fs.readdir(destination, { withFileTypes: true }, (err, dirents) => {
//     if (err) {
//       // eslint-disable-next-line no-console
//       return console.error(err);
//     }
//
//     const files = dirents
//       .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.tpl'))
//       .map((dirent) => dirent.name);
//
//     // files.forEach(function (file) {
//     //   const file_path = path.join(destination, file);
//     //   bootstrapFile(file_path, tplSettings);
//     // });
//   });
// }
//
// /*
//  * Get github template and apply tplSettings on .tpl files
//  */
// async function githubTpl(source, destination, tplSettings) {
//   await gitly.default(source, destination);
//   bootstrapLocation(source, destination, tplSettings);
// }
//
// module.exports = {
//   bootstrapFile,
//   bootstrapLocation,
//   githubTpl,
// };
// // this.fs.copyTpl(
// //   this.templatePath('package.json.tpl'),
// //   this.destinationPath(base, 'package.json'),
// //   this.globals,
// // );
// // this.fs.copyTpl(
// //   this.templatePath('Makefile.tpl'),
// //   this.destinationPath(base, 'Makefile'),
// //   this.globals,
// // );
// //
// // this.fs.copy(this.templatePath(), this.destinationPath(base), {
// //   globOptions: {
// //     ignore: ['**/*.tpl', '**/*~'],
// //     dot: true,
// //   },
// // });
// // this.fs.delete(this.destinationPath(base, 'package.json.tpl'));
// // this.fs.delete(this.destinationPath(base, 'Makefile.tpl'));
//
// // async writing() {
// //   const base =
// //     currentDir === this.globals.name
// //       ? '.'
// //       : './src/addons/' + this.globals.name;
// //
// //   if (this.globals.template) {
// //     await gitly.default(
// //       this.globals.template,
// //       this.destinationPath('.template'),
// //     );
// //     // await utils.githubTpl(
// //     //   this.globals.template,
// //     //   this.destinationPath(base),
// //     //   this.globals,
// //     // );
// //   } else {
// //     // this.copyTemplate(
// //     //   `${this.templatePath()}/**/*`,
// //     //   this.destinationPath(),
// //     //   this.globals,
// //     // );
// //     this.renderTemplate(
// //       `${this.templatePath()}/**/*`,
// //       this.destinationPath(),
// //       this.globals,
// //     );
// //
// //     // fs.readdir(
// //     //   this.templatePath(),
// //     //   { withFileTypes: true },
// //     //   (err, dirents) => {
// //     //     const templates = dirents
// //     //       .filter((dirent) => dirent.isFile() && dirent.name.endsWith('.tpl'))
// //     //       .map((dirent) => dirent.name);
// //     //     console.log(templates);
// //     //     this.renderTemplates(templates, this.globals);
// //     //   },
// //     // );
// //     // console.log(this.fs.readdir);
// //     // console.log('top', this.templatePath('**/*.tpl'));
// //     // console.log(this.destinationPath(base));
// //     // console.log(this.renderTemplates);
// //     // utils.bootstrapLocation(
// //     //   this.templatePath(),
// //     //   this.destinationPath(base),
// //     //   this.globals,
// //     // );
// //   }
// // }
