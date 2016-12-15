# PhotoDropSVGExportTest

It is a small p5Js experiment used to make patterns for stippling out of images and export them as svgs. 

used [**p5.js-SVG**](https://github.com/zenozeng/p5.js-svg/blob/master/doc/overview.md) extensively

#####To install the dependencies from `package.json` :
`
npm install 
`
#####To run the server with out restarting (hoping the nodemon package have installed in your mac. 
`
nodemon server.js
`
if nodemon doesn't get installed try: 
`npm install nodemon -g --save`
Although it is not that necessary. you can just do `node server.js` .. but then you've to restart it again and again.. 

###Notes:
1. I've a bunch of images in the `/public/images/` folder which are numbered 1-**totalnumbers**. I scroll through them in this sketch and make changes.. 
2. Remeber to include images in the `/public/images/` and then according to number of images in the directory, change in ` var number_of_images` in `sketch.js` .




