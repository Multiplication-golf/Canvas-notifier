var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
var anoucments = [
  {
    text: "The",
    color: "blue",
    rounding: 8,
    prority: 0,
    expiretime: Date.now() + 3000,
    shovedowndate: Date.now() + 3500,
    startdowndate: Date.now(),
    trans: 0.4
  },
  {
    text: "dog",
    color: "green",
    rounding: 8,
    prority: 0,
    expiretime: Date.now() + 5000,
    shovedowndate: Date.now() + 5500,
    startdowndate: Date.now(),
    trans: 0.5
  },
  {
    text: "ate",
    color: "red",
    rounding: 8,
    prority: 0,
    expiretime: Date.now() + 9000,
    shovedowndate: Date.now() + 9500,
    startdowndate: Date.now(),
    trans: 0.3
  },
  {
    text: "the",
    color: "orange",
    rounding: 8,
    prority: 0,
    expiretime: Date.now() + 11000,
    shovedowndate: Date.now() + 11500,
    startdowndate: Date.now(),
    trans: 0.3
  },
  {
    text: "blue house",
    color: "green",
    rounding: 8,
    prority: 0,
    expiretime: Date.now() + 13000,
    shovedowndate: Date.now() + 13500,
    startdowndate: Date.now(),
    trans: 0.5
  }
];
class notify {
    constructor(ctx,anoucments,width=500,height=27,dropDownTime=500,font="bold 20px arial",textAling="center", margin=3, startHeight=100,shovespeed=10) {
      this.anoucments = anoucments
      this.ctx = ctx
      this.anoucmentW = width
      this.anoucmentW2 = width/2
      this.anoucmentH = height
      this.dropDownTime = dropDownTime
      this.font = font
      this.textAling = textAling
      this.boundrectH = height+margin;
      this.startHeight = startHeight
      this.shovespeed = shovespeed
      this.shovespeed5 = shovespeed*5
      this.boundrectH10 = this.boundrectH-10
    }
    run() {
      var shovedown = 50;
      var shoved_down = false;
      var shoved_down_anoucment = {};
      var exW = 1; // scale factors
      var exH = 1; // scale factors
      var i = 0;
      anoucments.forEach((anoucment) => {
        if (Date.now() <= anoucment.shovedowndate) {
          i++;
          var shovedownper = 0;
          this.ctx.globalAlpha = anoucment.trans;
          this.ctx.fillStyle = anoucment.color;
          this.ctx.font = "bold 20px arial";
          this.ctx.textAlign = "center";
          if (
            Date.now() >= anoucment.expiretime &&
            Date.now() <= anoucment.shovedowndate
          ) {
            shovedown = this.shovespeed5 / ((anoucment.shovedowndate - Date.now()) / this.dropDownTime);
            shovedown = shovedown <= 0 ? 0 : shovedown;
            shoved_down_anoucment = anoucment;
          }
          shovedownper = shovedown;
          if (Date.now() <= anoucment.expiretime) {
            shovedownper = shovedownper >= this.shovespeed5 ? this.shovespeed5 : shovedownper;
            shovedownper = shovedownper <= 0 ? 0 : shovedownper;
          }
          if (Date.now() <= shoved_down_anoucment.shovedowndate) {
            var r =
              (shoved_down_anoucment.shovedowndate - Date.now()) / this.shovespeed < this.boundrectH
                ? (shoved_down_anoucment.shovedowndate - Date.now()) / this.shovespeed
                : this.boundrectH;
            shovedownper -= r;
            shovedownper += this.boundrectH;
          }
          shovedownper = shovedownper <= 0 ? 0 : shovedownper;
          this.ctx.globalAlpha -=
            (canvas.height / 2 -
              (this.startHeight - shovedownper - this.boundrectH10 + i * this.boundrectH * exH)) /
            canvas.height;
          this.ctx.beginPath();
          this.ctx.roundRect(
            canvas.width / 2 - this.anoucmentW2 * exW,
            this.startHeight - shovedownper - this.boundrectH10 + i * this.boundrectH * exH,
            this.anoucmentW * exW,
            this.anoucmentH * exH,
            anoucment.rounding
          );
          this.ctx.fill();
          this.ctx.closePath();
          this.ctx.fillText(
            anoucment.text,
            canvas.width / 2,
            (this.startHeight - shovedownper + i * this.boundrectH) * exH
          );
        }
        this.ctx.globalAlpha = 1;
      });
    }
  }
var newnotify = new notify(ctx,anoucments);
function draw() {
  ctx.clearRect(0, 0, 1010, 710);
  ctx.fillStyle = "blue";
  newnotify.run();
  
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);
