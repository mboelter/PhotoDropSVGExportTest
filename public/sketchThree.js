var ctx = new C2S(500,500); //width, height of your desired svg file
//do your normal canvas stuff:
ctx.fillStyle="red";
ctx.fillRect(100,100,100,100);
//ok lets serialize to SVG:
var myRectangle = ctx.getSerializedSvg(true);
console.log(myRectangle);